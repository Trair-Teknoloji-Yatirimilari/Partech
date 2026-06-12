# Sunucu & Deploy Rehberi

Parstech sitesinin canlı ortam bilgileri. **Şifre kullanılmaz** — bağlantı SSH anahtarı ile yapılır.

## Sunucu

| Alan | Değer |
|------|-------|
| IP | `116.202.105.120` |
| Kullanıcı | `root` |
| SSH anahtarı | `~/.ssh/id_ed25519` |
| Proje dizini | `/home/parstech` |
| PM2 uygulama adı | `parstech` |
| Uygulama portu | `3080` |
| Canlı domain (geçici) | `mektumu.com`, `www.mektumu.com` |
| GitHub repo | https://github.com/Trair-Teknoloji-Yatirimilari/Partech.git |

## Sunucuya Bağlanma

```bash
ssh -i ~/.ssh/id_ed25519 root@116.202.105.120
```

SSH config'e eklemek isterseniz (`~/.ssh/config`):

```
Host parstech
  HostName 116.202.105.120
  User root
  IdentityFile ~/.ssh/id_ed25519
```

Sonra: `ssh parstech`

## PM2 Komutları

```bash
pm2 list                          # tüm uygulamalar
pm2 logs parstech                 # loglar
pm2 restart parstech              # yeniden başlat
pm2 describe parstech             # detay
```

**Not:** `connectdigitalagent` (port 3073) ve diğer projelere dokunmayın.

## Nginx

- Config: `/etc/nginx/sites-available/mektumu.com`
- Symlink: `/etc/nginx/sites-enabled/mektumu.com`
- Test & reload:
  ```bash
  nginx -t && systemctl reload nginx
  ```

Domain değişince yalnızca `server_name` satırını güncelleyin; port 3080 aynı kalır.

## Güncelleme (deploy)

Yerel makineden:

```bash
# 1. Dosyaları sunucuya gönder
rsync -avz --delete \
  -e "ssh -i ~/.ssh/id_ed25519" \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  ./ root@116.202.105.120:/home/parstech/

# 2. Sunucuda build + restart
ssh -i ~/.ssh/id_ed25519 root@116.202.105.120 \
  "cd /home/parstech && npm ci && npm run build && pm2 restart parstech"
```

## SSL (isteğe bağlı)

DNS aktif olduktan sonra sunucuda:

```bash
certbot --nginx -d mektumu.com -d www.mektumu.com
```

Cloudflare SSL/TLS modu: **Full** veya sertifika sonrası **Full (strict)**.

## Cloudflare DNS

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `@` | `116.202.105.120` | Proxied |
| A | `www` | `116.202.105.120` | Proxied |

## Yerel Geliştirme

```bash
npm install
npm run dev
# http://localhost:3000
```

Canlı siteyi durdurmak için PM2'yi kapatmayın; yalnızca yerel `npm run dev` isteğe bağlıdır.
