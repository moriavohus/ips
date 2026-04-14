# IPS Middle East — Server Deployment Guide

## Quick Start (TL;DR)

```bash
git clone git@github.com:tvirgg/ips-gerus.git
cd ips-gerus
cp .env.example .env        # edit credentials
npm install
npm run build
pm2 start npm --name "ips-middle-east" -- start -- -p 3033
pm2 save
```

---

## Requirements

| Component | Version | Notes |
|-----------|---------|-------|
| Node.js | 18+ (tested on 22.x) | LTS recommended |
| npm | 9+ | comes with Node |
| PM2 | 5+ | process manager |
| Nginx | 1.18+ | reverse proxy |
| SSL cert | any | Cloudflare, Let's Encrypt, or custom |
| OS | Ubuntu 22.04+ | any Linux works |
| RAM | 512MB+ free | build needs ~300MB peak |
| Disk | 500MB+ | node_modules + .next build output |

---

## Step-by-Step Deployment

### 1. Clone Repository

```bash
cd /var/lib/your-user  # or wherever you want
git clone git@github.com:tvirgg/ips-gerus.git
cd ips-gerus
```

### 2. Configure Environment

```bash
cp .env.example .env
nano .env
```

Required variables:

```env
# Admin panel credentials (CHANGE THESE!)
ADMIN_USERNAME=ips_admin
ADMIN_PASSWORD=YourStrongPassword123!
SESSION_SECRET=random-64-char-string-generate-with-openssl-rand

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Optional: Site URL (for SEO/meta)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Generate a secure session secret:
```bash
openssl rand -hex 32
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Build

```bash
npm run build
```

Build takes ~20-30 seconds. Output goes to `.next/` directory. You should see:
```
✓ Compiled successfully
✓ Generating static pages (57/57)
```

### 5. Start with PM2

```bash
# Start on port 3033 (or any port you want)
pm2 start npm --name "ips-middle-east" -- start -- -p 3033

# Save PM2 process list (survives reboot)
pm2 save

# Enable PM2 startup on boot
pm2 startup
```

Verify:
```bash
pm2 list
curl -s http://localhost:3033 | head -5  # should return HTML
```

### 6. Configure Nginx

Create `/etc/nginx/sites-available/ips-abbit`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.crt;
    ssl_certificate_key /path/to/cert.key;

    location / {
        proxy_pass http://127.0.0.1:3033;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Host $host;
        proxy_read_timeout 120s;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    }
}
```

Enable and reload:
```bash
ln -s /etc/nginx/sites-available/ips-abbit /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 7. Verify

```bash
curl -sI https://your-domain.com        # should be 307 redirect to /en
curl -sI https://your-domain.com/admin   # should be 200
```

---

## Auto-Deploy (GitHub Webhook)

The project includes a webhook server for auto-deploy on git push.

### Webhook Setup

The webhook runs as a separate PM2 process on port 9876. When GitHub sends a push event to `https://your-domain.com/webhook`, it pulls code, builds, and reloads PM2.

Nginx config for webhook (add to server block):
```nginx
location /webhook {
    proxy_pass http://127.0.0.1:9876/webhook;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

### Manual Deploy Script

```bash
./deploy.sh
```

This runs: `git pull` → `npm install` → `npm run build` → `pm2 restart ips-middle-east`.

The build is atomic: if it fails, the old `.next` continues serving. PM2 reload is zero-downtime.

---

## Current Production Setup (ips.abbit.kz)

Reference for the live deployment:

| Setting | Value |
|---------|-------|
| Server | Ubuntu 24.04, 62GB RAM |
| Path | `/var/lib/systemd-coremgr/ips-gerus` |
| Port | 3033 |
| PM2 process | `ips-middle-east` |
| Domain | `ips.abbit.kz` |
| SSL | Custom cert at `/etc/ssl/abbit/` |
| CDN | Cloudflare proxy |
| Webhook | port 9876 |
| Node | v22.22.2 |
| Next.js | 14.2.35 |

---

## Directory Structure

```
ips-gerus/
├── .env                    # Environment variables (NOT in git)
├── .next/                  # Build output (NOT in git)
├── deploy.sh               # Manual deploy script
├── docs/
│   ├── ADMIN_PANEL.md      # Admin panel documentation
│   └── DEPLOYMENT.md       # This file
├── messages/
│   ├── en.json             # English content (editable via admin)
│   ├── ru.json             # Russian content
│   └── ar.json             # Arabic content
├── public/
│   ├── docs/               # Downloadable PDFs
│   └── images/             # Product and site images
├── src/
│   ├── app/
│   │   ├── [locale]/       # Public pages (products, services, etc.)
│   │   ├── admin/          # Admin panel pages
│   │   └── api/admin/      # Admin API routes
│   ├── components/         # React components
│   └── i18n/               # Internationalization config
├── next.config.mjs         # Next.js config
├── package.json
└── tailwind.config.ts      # Tailwind CSS config
```

---

## Common Operations

### Restart the site
```bash
pm2 reload ips-middle-east    # zero-downtime
pm2 restart ips-middle-east   # full restart
```

### View logs
```bash
pm2 logs ips-middle-east
pm2 logs ips-middle-east --lines 100
```

### Rebuild after code changes
```bash
npm run build && pm2 reload ips-middle-east
```

### Rebuild after content changes (via admin)
Use the **Rebuild & Deploy** button in admin dashboard, or:
```bash
npm run build && pm2 reload ips-middle-east
```

### Update dependencies
```bash
npm update
npm run build && pm2 reload ips-middle-east
```

### Check status
```bash
pm2 list                          # process status
pm2 monit                         # live monitoring
curl -sI https://your-domain.com  # HTTP check
```

---

## Troubleshooting

### Build fails
```bash
npm run build 2>&1 | tail -30   # check errors
```
Common causes:
- TypeScript errors in code
- Missing dependencies (`npm install`)
- Disk space full (`df -h`)

### Site returns 502
```bash
pm2 list                         # check if process is online
pm2 logs ips-middle-east         # check for crash
pm2 restart ips-middle-east      # restart
```

### Port already in use
```bash
lsof -i :3033                    # find what's using the port
pm2 delete ips-middle-east       # remove old process
pm2 start npm --name "ips-middle-east" -- start -- -p 3033
```

### SSL certificate issues
```bash
nginx -t                         # test nginx config
openssl x509 -in /path/to/cert.crt -noout -dates  # check expiry
```

### Memory issues
```bash
pm2 monit                        # check memory usage
# PM2 auto-restarts at 512MB (configurable in ecosystem.config)
```

### Changes not appearing
The site uses Static Site Generation (SSG). Content changes require a rebuild:
```bash
npm run build && pm2 reload ips-middle-east
```
Or use the admin dashboard **Rebuild & Deploy** button.

---

## Security Checklist

Before going live, verify:

- [ ] Changed default admin credentials in `.env`
- [ ] Generated unique `SESSION_SECRET` (`openssl rand -hex 32`)
- [ ] SSL certificate installed and valid
- [ ] Nginx security headers configured
- [ ] Firewall allows only 80/443 (and SSH)
- [ ] PM2 startup enabled for reboot survival
- [ ] `.env` file not committed to git (check `.gitignore`)
- [ ] Admin panel accessible only via HTTPS
- [ ] Rate limiting active (5 failed logins = 15 min lockout)

---

## Backup

Content is stored in `messages/*.json`. Back up these files to preserve admin edits:

```bash
# Manual backup
cp -r messages/ /backup/ips-messages-$(date +%Y%m%d)/

# Cron backup (daily at 3am)
0 3 * * * cp -r /path/to/ips-gerus/messages/ /backup/ips-messages-$(date +\%Y\%m\%d)/
```

Code is in git — `git log` shows all history.
