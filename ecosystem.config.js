module.exports = {
  apps: [
    {
      name: "ips-middle-east",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      cwd: "/var/www/ips-middle-east",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
    },
  ],
};
