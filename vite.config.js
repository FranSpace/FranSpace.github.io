import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 如果你的仓库名是 "你的用户名.github.io"，保持 base: '/'
// 如果你的仓库名是普通仓库名，例如 "my-site"，改成 base: '/my-site/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
