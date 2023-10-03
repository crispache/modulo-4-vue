<template>
  <div class="container">
    <div>
      <v-img :src="Empty" alt="Sin datos" height="210" width="280"></v-img>

      <template v-if="currentSearchField">
        <p>No se han encontrado resultados</p>
        <p>Pruebe con otro nombre</p>
      </template>

      <template v-else>
        <p>Introduzca un nombre de organización</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSearchStore } from "~/composables/store/useSearchStore";
import Empty from "~/assets/images/empty.png";

const search = useSearchStore();
const { currentSearchField } = storeToRefs(search);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
