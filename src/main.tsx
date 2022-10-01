import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// PWA 用のService Workerを追加する関数を読み込み
import { registerSW } from 'virtual:pwa-register';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Service Workerを追加
registerSW();
