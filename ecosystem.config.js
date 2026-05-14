// PM2 Configuration File
// This allows PM2 to manage your web server

module.exports = {
  apps: [{
    name: 'bac-website',
    script: 'npx',
    args: 'serve -s dist -l 3000',
    cwd: '/home/ec2-user/BACWebsite-Design',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/home/ec2-user/logs/bac-website-error.log',
    out_file: '/home/ec2-user/logs/bac-website-out.log',
    log_file: '/home/ec2-user/logs/bac-website-combined.log',
    time: true
  }]
};
