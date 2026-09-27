# TOOLS ARIEL Web2APK — GitHub + Vercel

Arsitektur:
- Vercel: UI + API endpoint
- GitHub Actions: Android SDK + Gradle + build APK
- GitHub Release: menyimpan APK hasil build

## 1. Buat repository GitHub

Upload seluruh isi project ini ke repository, misalnya:
`arielsepang93-commits/TOOLS-ARIEL-WEB2APK`

## 2. Buat GitHub token

Buat Personal Access Token (classic/fine-grained) yang minimal punya akses:
- Actions: write
- Contents: write

Untuk repository private, token juga perlu akses repository tersebut.

## 3. Tambahkan secret di Vercel

Project Vercel → Settings → Environment Variables:

GITHUB_TOKEN = token GitHub kamu
GITHUB_OWNER = username/organisasi GitHub
GITHUB_REPO = nama repository

Jangan masukkan token ke frontend.

## 4. Deploy ke Vercel

Import repository ke Vercel. Framework: Other/Static.

Setelah deploy, buka URL Vercel.

## 5. Cara kerja

Browser
  ↓
Vercel /api/generate
  ↓
GitHub workflow_dispatch
  ↓
GitHub Actions
  ↓
Android SDK + Gradle
  ↓
APK
  ↓
GitHub Release
  ↓
Download APK

## Catatan keamanan

Generator publik perlu rate limit, validasi URL, dan autentikasi agar tidak disalahgunakan.
Jangan menaruh GITHUB_TOKEN di JavaScript/browser.

Build yang dibuat contoh ini adalah debug APK. Untuk Play Store gunakan signing release + AAB.
