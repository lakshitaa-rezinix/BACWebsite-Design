#!/bin/bash

# EC2 Server-Side Deployment Script
# Run this script ON your EC2 instance after git pull
# Usage: ./ec2-deploy.sh

set -e

echo "🚀 Starting deployment on EC2..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Project directory
PROJECT_DIR="/home/ec2-user/BACWebsite-Design"
cd "$PROJECT_DIR"

# Stash any local changes
echo -e "${YELLOW}📦 Stashing local changes...${NC}"
git stash

# Pull latest changes
echo -e "${YELLOW}⬇️  Pulling latest code from GitHub...${NC}"
git pull origin main

# Fix permissions if needed
echo -e "${YELLOW}🔧 Fixing permissions...${NC}"
chmod -R 755 node_modules/.bin/ 2>/dev/null || true

# Install/update dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Build the project
echo -e "${YELLOW}🏗️  Building project...${NC}"
npm run build

# Serve the built files
echo -e "${YELLOW}🌐 Starting web server...${NC}"

# Check if we need to install serve
if ! command -v serve &> /dev/null; then
    echo -e "${YELLOW}Installing serve...${NC}"
    npm install -g serve
fi

# Kill existing serve process if running
pkill -f "serve.*dist" || true

# Start serve in background
nohup serve -s dist -l 3000 > /tmp/server.log 2>&1 &

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Server is running on port 3000${NC}"
echo -e "${YELLOW}📋 Check logs: tail -f /tmp/server.log${NC}"
