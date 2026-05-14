#!/bin/bash

# BAC Website Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment process..."

# Configuration - UPDATE THESE VALUES
EC2_HOST="your-ec2-ip-or-domain"
EC2_USER="ec2-user"
EC2_PATH="/var/www/html"
SSH_KEY_PATH="~/.ssh/your-key.pem"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if configuration is set
if [ "$EC2_HOST" = "your-ec2-ip-or-domain" ]; then
    echo -e "${RED}❌ Error: Please update the EC2_HOST in deploy.sh${NC}"
    exit 1
fi

# Build the project
echo -e "${YELLOW}📦 Building project...${NC}"
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed! dist directory not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"

# Create backup on EC2
echo -e "${YELLOW}💾 Creating backup on EC2...${NC}"
ssh -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_HOST" "
    if [ -d $EC2_PATH ]; then
        sudo cp -r $EC2_PATH $EC2_PATH.backup.\$(date +%Y%m%d_%H%M%S)
        echo 'Backup created'
    fi
"

# Deploy files to EC2
echo -e "${YELLOW}🚀 Deploying to EC2...${NC}"
rsync -avz --delete \
    -e "ssh -i $SSH_KEY_PATH" \
    dist/ "$EC2_USER@$EC2_HOST:/tmp/website-deploy/"

# Move files and restart web server on EC2
echo -e "${YELLOW}🔄 Moving files and restarting web server...${NC}"
ssh -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_HOST" "
    sudo rm -rf $EC2_PATH/*
    sudo mv /tmp/website-deploy/* $EC2_PATH/
    sudo chown -R nginx:nginx $EC2_PATH  # Change if using apache

    # Restart web server (uncomment the one you're using)
    sudo systemctl restart nginx
    # sudo systemctl restart apache2
    # sudo systemctl restart httpd

    echo 'Files deployed and web server restarted'
"

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Website is now live at: http://$EC2_HOST${NC}"
