import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// オブジェクト形式で、PWA用のマニフェストの設定を記述
const pwaOptions = {
  manifest: {
    lang: 'ja',
    name: 'React Todo Sample PWA App',
    short_name: 'PWA Todo',
    theme_color: '#000',
    background_color: '#fff',
    display: 'standalone',
    // iconイメージファイルは、 '/public'に配置する
    // 設定を変えていなければ、build 時にpublic ディレクトリの中身をdist 直下に置いてくれる
    icons: [
      {
        src: 'favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: 'logo192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'logo256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'logo512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ]
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)]
})
