#!/bin/bash

# EC2 Deployment Script with PM2
# Run this ON your EC2 instance
# Usage: ./deploy-with-pm2.sh

set -e

echo "🚀 Starting deployment with PM2..."

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_DIR="/home/ec2-user/BACWebsite-Design"
cd "$PROJECT_DIR"

# Pull latest code
echo -e "${YELLOW}⬇️  Pulling latest code...${NC}"
git stash
git pull origin main

# Fix permissions
chmod -R 755 node_modules/.bin/ 2>/dev/null || true

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Build
echo -e "${YELLOW}🏗️  Building...${NC}"
npm run build

# Setup PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    npm install -g pm2
fi

# Create logs directory
mkdir -p /home/ec2-user/logs

# Restart PM2 app
echo -e "${YELLOW}🔄 Restarting application...${NC}"
pm2 delete bac-website 2>/dev/null || true
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot (only needed once)
pm2 startup | tail -n 1 | bash || true

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Application running on port 3000${NC}"
echo ""
echo "Useful commands:"
echo "  pm2 status          - Check status"
echo "  pm2 logs            - View logs"
echo "  pm2 restart all     - Restart app"
echo "  pm2 stop all        - Stop app"
