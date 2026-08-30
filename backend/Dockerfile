# Gunakan image resmi Bun berbasis Alpine yang ringan
FROM oven/bun:1-alpine

# Set working directory
WORKDIR /app

# Salin file package
COPY package.json bun.lock ./

# Install dependensi
RUN bun install --production

# Salin seluruh kode (kecuali yang ada di .dockerignore)
COPY . .

# Expose port (Koyeb biasanya butuh port spesifik atau menggunakan ENV PORT)
EXPOSE 3000

# Jalankan aplikasi
CMD ["bun", "run", "src/index.ts"]
