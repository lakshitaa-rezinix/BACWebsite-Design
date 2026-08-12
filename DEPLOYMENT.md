# EC2 Deployment Guide

## Architecture

Three pieces must all be running:

```
  Internet -> nginx (:80/:443)
                |-- /api/*    -> bac-api      (Express, :5055)  reads server/.env
                |-- /uploads/ -> bac-api      (resume files)
                `-- /*        -> bac-website  (static build, :3000)
```

**nginx is not optional.** The frontend calls the API at the relative path `/api`.
`serve -s dist` answers every unknown path with `index.html`, so without the
reverse proxy each `/api` call returns the SPA's HTML and the admin panel,
careers form, PT registration, and certificate lookup all silently fail.

## First-time setup

1. **Environment file** (not in git — create it on the box):
   ```bash
   cd ~/BACWebsite-Design/server
   cp .env.example .env
   nano .env          # fill in MONGODB_URI, JWT_SECRET, CORS_ORIGIN
   chmod 600 .env
   ```

2. **Install dependencies and build:**
   ```bash
   cd ~/BACWebsite-Design
   npm install && npm run build
   cd server && npm install && cd ..
   ```

3. **Create the admin user** (once — the app uses a single admin account):
   ```bash
   cd server
   ADMIN_PASSWORD='<a-strong-password>' node seed.js
   ```

4. **Migrate the original blog posts into MongoDB** (once, optional):
   ```bash
   cd server && node seed-blog.js
   ```

5. **nginx:**
   ```bash
   sudo cp nginx.conf.example /etc/nginx/conf.d/bac.conf
   sudo nano /etc/nginx/conf.d/bac.conf     # set server_name to your domain
   sudo nginx -t && sudo systemctl reload nginx
   ```

6. **PM2 (runs both the API and the site):**
   ```bash
   sudo npm install -g pm2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup            # then run the command it prints, so it survives reboot
   ```

7. **HTTPS:**
   ```bash
   sudo dnf install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d bombayassay.com -d www.bombayassay.com
   ```

8. **Security group:** allow inbound 80 and 443 only. Ports 3000 and 5055 must
   NOT be publicly reachable — nginx reaches them over localhost.

## Redeploying

```bash
cd ~/BACWebsite-Design
git pull origin main
npm install && npm run build
cd server && npm install && cd ..
pm2 restart ecosystem.config.js
```

## Health check

```bash
curl localhost:5055/api/health
# {"status":"ok","db":"connected","uptime":123}
```

If `db` is `disconnected`, check `pm2 logs bac-api`.

## Local development note

The API listens on **5055**, not 5000, because macOS Control Center (AirPlay
Receiver) occupies port 5000 and answers with an empty `403` — which looks
exactly like a broken API. Run `npm run dev` (frontend) and
`cd server && node index.js` (API) side by side; Vite proxies `/api` to 5055.

---

## Legacy notes

## Current Setup
You're deploying by SSH-ing into EC2 and running `git pull` + `npm run build`.

## 🚀 Step-by-Step Deployment Process

### Initial Setup (One-Time Only)

1. **SSH into your EC2 instance:**
   ```bash
   ssh -i your-key.pem ec2-user@your-ec2-ip
   ```

2. **Navigate to project directory:**
   ```bash
   cd ~/BACWebsite-Design
   ```

3. **Upload the deployment scripts** (from your local machine):
   ```bash
   scp -i your-key.pem ec2-deploy.sh deploy-with-pm2.sh ecosystem.config.js ec2-user@your-ec2-ip:~/BACWebsite-Design/
   ```

4. **Make scripts executable** (on EC2):
   ```bash
   chmod +x ec2-deploy.sh deploy-with-pm2.sh
   ```

5. **Install PM2 globally** (on EC2):
   ```bash
   sudo npm install -g pm2
   ```

### 🔄 Redeploying After Making Changes

#### Option A: Using PM2 (Recommended)

On your EC2 instance:
```bash
cd ~/BACWebsite-Design
./deploy-with-pm2.sh
```

**Benefits:**
- Auto-restarts on crashes
- Process monitoring
- Startup on system reboot
- Centralized logging

**Useful PM2 Commands:**
```bash
pm2 status              # Check if app is running
pm2 logs                # View real-time logs
pm2 logs --lines 100    # View last 100 lines
pm2 restart bac-website # Restart the app
pm2 stop bac-website    # Stop the app
pm2 delete bac-website  # Remove from PM2
```

#### Option B: Simple Deployment

On your EC2 instance:
```bash
cd ~/BACWebsite-Design
./ec2-deploy.sh
```

#### Option C: Manual Steps (What you're doing now)

```bash
cd ~/BACWebsite-Design

# Fix the permission issue first
chmod -R 755 node_modules/.bin/

# Then deploy
git stash                    # Save any local changes
git pull origin main         # Pull latest code
npm install                  # Install/update dependencies
npm run build                # Build the project

# Serve the files (choose one):
npx serve -s dist -l 3000    # Simple server on port 3000
# OR
pm2 start ecosystem.config.js  # With PM2
```

---

## 🐛 Troubleshooting

### Permission Denied Error
```bash
# Fix node_modules permissions
chmod -R 755 node_modules/.bin/

# Or reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Git Merge Conflicts
```bash
git stash                    # Stash local changes
git pull origin main         # Pull latest
# OR
git reset --hard origin/main # Discard local changes (use with caution!)
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or if using serve
pkill -f "serve"
```

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

---

## 🌐 Accessing Your Website

After deployment, your website should be accessible at:
- **Local (on EC2):** `http://localhost:3000`
- **Public:** `http://your-ec2-public-ip:3000`

**Important:** Make sure your EC2 Security Group allows inbound traffic on port 3000:
1. Go to EC2 Console → Security Groups
2. Find your instance's security group
3. Add inbound rule: Type: Custom TCP, Port: 3000, Source: 0.0.0.0/0

---

## 🎯 Recommended Workflow

### Local Development (Your Machine)
```bash
# Make changes to your code
npm run dev           # Test locally

# Commit and push
git add .
git commit -m "Your changes"
git push origin main
```

### Production Deployment (EC2)
```bash
# SSH into EC2
ssh -i your-key.pem ec2-user@your-ec2-ip

# Run deployment script
cd ~/BACWebsite-Design
./deploy-with-pm2.sh

# Check status
pm2 status
pm2 logs
```

---

## 🔒 Production Checklist

- [ ] PM2 is installed and configured
- [ ] PM2 startup script is enabled (survives reboots)
- [ ] Security group allows port 3000 (or 80/443 with nginx)
- [ ] Domain is pointed to EC2 IP (if using custom domain)
- [ ] SSL certificate configured (for HTTPS)

---

## 📊 Monitoring

```bash
# Check app status
pm2 status

# View logs
pm2 logs

# Monitor resources
pm2 monit

# View specific app logs
pm2 logs bac-website
```

---

## Next Steps (Optional Improvements)

1. **Use Nginx as reverse proxy** (serve on port 80/443)
2. **Set up SSL certificate** (Let's Encrypt)
3. **Use custom domain** instead of IP
4. **Set up automated deployments** (GitHub Actions)
