# firebase_training003

React を利用して、ブラウザ上で動作する Todo アプリを作成しました  
バックエンド(データ永続化)に firestore を利用しています  
また、PWA 対応まで行い、firebase hosting にデプロイしたものを PWA としてインストールする手順まで試しました

## 開発環境

- Windows 11 (21H2)
- WSL2 Ubuntu20.04
- React 18.2
- firebase 9.10
- Node.js 16.11.1
- vite 3.1.0
- firebase-tools 11.10.0

## firestore の設定

`.env` はリモートリポジトリに含まれていません  
設定項目のみを記載した`.env.example` を`.env` にリネームし、ご自身の firebase アプリの ID などを設定してください

## ローカルでの動作の手順

node が利用できる環境に当リポジトリをクローンします  
下記コマンドで依存パッケージをインストールします

```bash
$ npm install
```

下記コマンドで vite のローカルサーバを起動します

```bash
$ npm run dev

> firebase_training003@0.0.0 dev
> vite


  VITE v3.1.0  ready in 381 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

ターミナルに表示された localhost の URL にアクセスすると、トップページが表示されます

## 大変だったこと

教材の内容と各種パッケージの最新の内容が異なっていたので、そこの差を埋めるのに苦労しました

とくに PWA 化は create-react-app のテンプレートを使っての解説だったので、vite での対応方法を一から調べて実装することになりました

## 参考資料

以下の教材をベースにソースコードを作成しました  
初心者が React と firebase で作るモバイル対応 PWA アプリケーション :  
https://www.udemy.com/course/reactfirebasepwa/
