<template>
  <div id="app">
    <v-app>
      <Header />
      <v-main>
        <div class="content">
          <slot />
        </div>
      </v-main>
    </v-app>
  </div>
</template>
<style lang="scss" scoped>
.content {
  max-width: 1280px;
  margin: 0 auto;
  min-height: 80vh;
}
</style>
