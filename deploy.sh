#!/bin/bash
# IPS Gerus auto-deploy script
# Usage: ./deploy.sh
set -e

DIR="/var/lib/systemd-coremgr/ips-gerus"
cd "$DIR"

echo "[$(date)] Pulling latest..."
git pull

echo "[$(date)] Installing deps..."
npm install --production=false

echo "[$(date)] Building..."
npm run build

echo "[$(date)] Restarting PM2..."
pm2 restart ips-middle-east

echo "[$(date)] Done. Site: https://ips.abbit.kz"
