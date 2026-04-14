const http = require('http');
const { execSync, exec } = require('child_process');
const crypto = require('crypto');

const PORT = 9876;
const SECRET = 'ips-gerus-deploy-2026';
const DEPLOY_SCRIPT = '/var/lib/systemd-coremgr/ips-gerus/deploy.sh';

let deploying = false;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      // Verify signature
      const sig = req.headers['x-hub-signature-256'];
      if (sig) {
        const hmac = crypto.createHmac('sha256', SECRET).update(body).digest('hex');
        if (sig !== `sha256=${hmac}`) {
          res.writeHead(403);
          res.end('bad sig');
          return;
        }
      }

      try {
        const payload = JSON.parse(body);
        const ref = payload.ref || '';
        
        // Only deploy on push to main
        if (ref !== 'refs/heads/main') {
          res.writeHead(200);
          res.end('not main, skip');
          return;
        }

        if (deploying) {
          res.writeHead(200);
          res.end('already deploying');
          return;
        }

        deploying = true;
        console.log(`[${new Date().toISOString()}] Deploy triggered by push to main`);
        
        exec(`bash ${DEPLOY_SCRIPT}`, { timeout: 300000 }, (err, stdout, stderr) => {
          deploying = false;
          if (err) {
            console.error(`Deploy failed: ${err.message}`);
            console.error(stderr);
          } else {
            console.log(`Deploy success:\n${stdout}`);
          }
        });

        res.writeHead(200);
        res.end('deploy started');
      } catch (e) {
        res.writeHead(400);
        res.end('bad json');
      }
    });
  } else if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200);
    res.end('ok');
  } else {
    res.writeHead(404);
    res.end('not found');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Webhook server listening on 127.0.0.1:${PORT}`);
});
