import { defineConfig } from 'vite';
// import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  server: {
    // https: true,
    proxy: {
      '/socket.io': 'http://localhost:3000', // Proxy Socket.io server
    },
    port: '5010',
    host: true
  },
  // plugins: [ mkcert() ]
});
