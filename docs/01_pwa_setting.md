# React アプリの PWA 化対応

動画講義は create-react-app で PWA のテンプレートを使っていたが、vite にはそのオプションがない  
ので、manifest.json などの設定ファイルを追加で設定しなければならない...と思っていたけど、PWA 対応のための npm パッケージがあるようなので、それを使ってみる

# 対応手順

1. 依存パッケージのインストール

```bash
$ npm i -D vite-plugin-pwa
```

2. vite.config.ts の設定に PWA 対応を追記

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
+ import { VitePWA } from 'vite-plugin-pwa';

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
-  plugins: [react()]
+  plugins: [react(), VitePWA(pwaOptions)]
})
```

3. tsconfig.json に VitePWA の型定義を追加

```json
{
  // ... 中略 ...
  "include": ["src", "node_modules/vite-plugin-pwa/client.d.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

4. main.ts に Service Worker を追加

```ts
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// PWA 用のService Workerを追加する関数を読み込み
import { registerSW } from "virtual:pwa-register";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Workerを追加
registerSW();
```

5. index.html が vite の favicon を読み込んでいるので、ついでに修正

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- ↓vite.svg を favicon.ico に変更 -->
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

6. ビルドして、firebase hosting にデプロイ

```bash
$ npm run build
> PROJECT_NAME@0.0.0 build
> tsc && vite build

✓ 59 modules transformed.
dist/index.html                                   0.48 KiB
dist/manifest.webmanifest                         0.43 KiB
dist/assets/workbox-window.prod.es5.d2780aeb.js   5.17 KiB / gzip: 2.15 KiB
dist/assets/index.3dd79a12.css                    0.93 KiB / gzip: 0.51 KiB
dist/assets/index.93972010.js                     540.06 KiB / gzip: 138.21 KiB

(!) Some chunks are larger than 500 KiB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/guide/en/#outputmanualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.

PWA v0.13.1
mode      generateSW
precache  9 entries (546.64 KiB)
files generated
  dist/sw.js
  dist/workbox-958fa2bd.js

$ firebase deploy

=== Deploying to 'FIREBASE_APP_NAME'...

i  deploying hosting
i  hosting[FIREBASE_APP_NAME]: beginning deploy...
i  hosting[FIREBASE_APP_NAME]: found 12 files in dist
✔  hosting[FIREBASE_APP_NAME]: file upload complete
i  hosting[FIREBASE_APP_NAME]: finalizing version...
✔  hosting[FIREBASE_APP_NAME]: version finalized
i  hosting[FIREBASE_APP_NAME]: releasing new version...
✔  hosting[FIREBASE_APP_NAME]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/XXXXXXX/overview
Hosting URL: https://XXXXXXX.web.app
```

# 参考情報

- Vite で最速 React & TypeScript:  
  https://zenn.dev/sprout2000/articles/98145cf2a807b1#6.-pwa-%E5%8C%96%E3%81%99%E3%82%8B---vite-plugin-pwa

- PWA Vite Plugin:  
  https://vite-pwa-org.netlify.app/
