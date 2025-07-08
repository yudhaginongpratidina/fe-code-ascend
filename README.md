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

docker build \
  --build-arg NEXT_PUBLIC_ENVIRONMENT=development \
  --build-arg NEXT_PUBLIC_API_BACKEND_URL=http://localhost:5000 \
  -t nextjs/fe-code-ascend:latest .

docker run -p 5000:5000 nextjs/fe-code-ascend:latest
```

## DOCKER HUB

```bash
docker pull yudhaginongpratidina/fe-code-ascend
```


## Note

Jangan lupa atur environtment variable untuk nextjs terlebih dahulu
sebelum menjalankan perintah di atas