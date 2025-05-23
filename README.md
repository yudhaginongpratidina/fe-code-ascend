# FE CODE ASCEND

```bash
git clone https://github.com/yudhaginongpratidina/fe-code-ascend.git
cd fe-code-ascend

pnpm install
pnpm run dev
```

or with docker

```bash
git clone https://github.com/yudhaginongpratidina/fe-code-ascend.git
cd fe-code-ascend
docker build -t nextjs/fe-code-ascend:1.0.0 .
docker run -d --name fe-code-ascend -p 5000:5000 nextjs/fe-code-ascend:1.0.0
````

## Note

Jangan lupa atur environtment variable untuk nextjs terlebih dahulu
sebelum menjalankan perintah di atas