import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

/* ---------------------------
   Express Plugin (DEFINE FIRST)
---------------------------- */
const expressPlugin = (): Plugin => ({
  name: "express-plugin",
  apply: "serve",
  configureServer(viteServer) {
    const app = createServer();
    viteServer.middlewares.use(app);
  },
});

/* ---------------------------
   Vite Config
---------------------------- */
export default defineConfig(() => ({
  root: path.resolve(__dirname, "client"),

  server: {
    fs: {
      allow: [
        path.resolve(__dirname, "client"),
        path.resolve(__dirname, "shared"),
      ],
      deny: [
        ".env",
        ".env.*",
        "*.{crt,pem}",
        "**/.git/**",
        "server/**",
      ],
    },
  },

  build: {
    outDir: path.resolve(__dirname, "dist/spa"),
    emptyOutDir: true,
  },

  plugins: [react(), expressPlugin()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
}));
