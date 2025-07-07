# FE CODE ASCEND

## LOCAL DEVELOPMENT (BASIC)

```bash
git clone https://github.com/yudhaginongpratidina/fe-code-ascend.git
cd fe-code-ascend

pnpm install
pnpm run dev
```

## LOCAL DEVELOPMENT (DOCKER)

```bash
git clone https://github.com/yudhaginongpratidina/fe-code-ascend.git
cd fe-code-ascend

docker build -t nextjs/fe-code-ascend:latest .
docker run -d \
    --name fe-code-ascend \
    -p 5000:5000 \
    -e NEXT_PUBLIC_ENVIRONMENT=development \
    -e NEXT_PUBLIC_API_BACKEND_URL=https://your-backend-domain.com/api \
    --restart unless-stopped \
    nextjs/fe-code-ascend:latest
```

## DOCKER HUB

```bash
docker pull yudhaginongpratidina/fe-code-ascend
```


## Note

Jangan lupa atur environtment variable untuk nextjs terlebih dahulu
sebelum menjalankan perintah di atas