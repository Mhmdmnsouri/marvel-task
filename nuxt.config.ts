import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      marvelPublicKey: process.env.NUXT_PUBLIC_MARVEL_PUBLIC_KEY,
      marvelBaseUrl: process.env.NUXT_PUBLIC_MARVEL_BASE_URL,
    },
    marvelPrivateKey: process.env.NUXT_MARVEL_PRIVATE_KEY,
  },

  app: {
    head: {
      title: "Marvel",
      meta: [
        { name: "description", content: "Marvel Web Aplication." },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
