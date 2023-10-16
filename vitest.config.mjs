import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
  plugins: [ {
    name: "vitest-plugin-beforeall",
    config: () => ({
      test: { setupFiles: ["./vitest/beforeall.ts"] },
    }),
  },],
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['vuetify']
    },
   include: ['**/*.test.ts'],
  },
  ssr: {
    noExternal: ['vuetify']
  }
})