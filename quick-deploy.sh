#!/bin/bash

# Quick Deployment Script (No backup, faster)
# Usage: ./quick-deploy.sh

set -e

# Configuration - UPDATE THESE
EC2_HOST="your-ec2-ip-or-domain"
EC2_USER="ec2-user"
EC2_PATH="/var/www/html"
SSH_KEY_PATH="~/.ssh/your-key.pem"

echo "🚀 Quick deploy starting..."

# Build
echo "📦 Building..."
npm run build

# Deploy
echo "🚀 Uploading..."
rsync -avz --delete -e "ssh -i $SSH_KEY_PATH" dist/ "$EC2_USER@$EC2_HOST:$EC2_PATH/"

# Restart
echo "🔄 Restarting web server..."
ssh -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_HOST" "sudo systemctl restart nginx"

echo "✅ Done!"
