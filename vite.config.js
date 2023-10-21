import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/nombre-de-repositorio/', // Reemplaza 'nombre-de-repositorio' con el nombre de tu repositorio
  plugins: [react()],
});
