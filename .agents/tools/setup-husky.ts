import { $ } from "bun";

async function setupHusky() {
  console.log("🐶 Menyiapkan Husky & Lint-staged...");
  try {
    // Instalasi Husky
    await $`bun add -d husky lint-staged`;
    
    // Inisialisasi
    await $`bunx husky init`;
    
    // Tambahkan pre-commit hook
    await $`echo "bunx lint-staged" > .husky/pre-commit`;
    
    console.log("✅ Husky berhasil dipasang. Mencegah commit kode kotor secara otomatis!");
  } catch (error) {
    console.error("❌ Gagal memasang Husky:", error);
  }
}

setupHusky();
