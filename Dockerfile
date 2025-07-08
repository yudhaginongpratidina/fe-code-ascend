FROM node:22-alpine

WORKDIR /app

# 1) Copy file yang dibutuhkan untuk install dependencies (agar cache efektif)
COPY package.json pnpm-lock.yaml* ./

# 2) Install pnpm dan dependencies
RUN npm install -g pnpm
RUN pnpm install

# 3) Copy seluruh source code setelah dependensi sudah diinstall
COPY . .

# Tambahkan build arguments untuk NEXT_PUBLIC_*
ARG NEXT_PUBLIC_ENVIRONMENT
ARG NEXT_PUBLIC_API_BACKEND_URL

# (Opsional) buat ENV agar bisa digunakan di build-time script
ENV NEXT_PUBLIC_ENVIRONMENT=$NEXT_PUBLIC_ENVIRONMENT
ENV NEXT_PUBLIC_API_BACKEND_URL=$NEXT_PUBLIC_API_BACKEND_URL

# 4) Build aplikasi
RUN pnpm run build

# 5) Expose port aplikasi
EXPOSE 5000

# 6) Jalankan aplikasi
CMD ["pnpm", "run", "start"]