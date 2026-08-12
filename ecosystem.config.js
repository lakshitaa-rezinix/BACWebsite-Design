// PM2 Configuration File
//
// Two processes:
//   bac-api      — the Express/MongoDB API. Reads server/.env.
//   bac-website  — the static Vite build.
//
// The API must be managed here too; previously only the frontend was, so on a
// reboot the site came back up with every /api call failing.
//
// Nginx sits in front and routes /api -> bac-api, everything else -> bac-website.
// See nginx.conf.example and DEPLOYMENT.md.

const APP_DIR = "/home/ec2-user/BACWebsite-Design";

module.exports = {
  apps: [
    {
      name: "bac-api",
      script: "index.js",
      cwd: `${APP_DIR}/server`,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      // index.js loads server/.env itself via dotenv; NODE_ENV is set there too.
      env: {
        NODE_ENV: "production",
      },
      error_file: "/home/ec2-user/logs/bac-api-error.log",
      out_file: "/home/ec2-user/logs/bac-api-out.log",
      time: true,
      // Give in-flight uploads a chance to finish on restart; index.js handles
      // SIGTERM and drains before exiting.
      kill_timeout: 10000,
    },
    {
      name: "bac-website",
      script: "npx",
      args: "serve -s dist -l 3000",
      cwd: APP_DIR,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
      error_file: "/home/ec2-user/logs/bac-website-error.log",
      out_file: "/home/ec2-user/logs/bac-website-out.log",
      time: true,
    },
  ],
};
