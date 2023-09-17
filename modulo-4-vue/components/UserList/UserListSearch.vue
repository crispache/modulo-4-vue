<template>
  <div class="search-box">
    <v-row>
      <v-col cols="5">
        <v-text-field
          label="Nombre de la organización"
          placeholder="Ej: Lemoncode"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-btn
          :loading="isLoading"
          height="56"
          width="180"
          variant="flat"
          color="indigo-darken-3"
        >
          Buscar
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean;
}>();
</script>

<style scoped lang="scss">
  .search-box {
    margin: 20px 0;
  }
</style>
