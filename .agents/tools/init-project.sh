#!/bin/bash
# Script untuk menginisialisasi proyek baru dari Master Template .agents

if [ -z "$1" ]; then
  echo "Usage: $0 <project-name>"
  exit 1
fi

PROJECT_NAME=$1
mkdir -p "$PROJECT_NAME"
echo "🚀 Meng-copy arsitektur .agents ke $PROJECT_NAME..."
cp -R .agents "$PROJECT_NAME/"

cd "$PROJECT_NAME" || exit
git init
echo "🚀 Membuat struktur standar (frontend/ & backend/)..."
mkdir -p frontend backend

echo "🚀 Menjalankan Bun Init..."
bun init -y

echo "✅ Proyek $PROJECT_NAME berhasil di-bootstrap dengan kekuatan penuh Master Template!"
