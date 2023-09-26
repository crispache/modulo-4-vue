<template>
  <div class="search-box">
    <v-row>
      <v-col cols="5">
        <v-text-field
          v-model="organizationName"
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
          @click="searchMembersOrganization()"
        >
          Buscar
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/composables/store/useSearchStore';

const props = defineProps<{
  isLoading: boolean;
}>();

const organizationName = ref<string>()
const { currentSearchField, updateSearchField } = useSearchStore();

onMounted( () => {
  if(currentSearchField) {
    organizationName.value = currentSearchField
  }
})


const searchMembersOrganization = () => {
  if(organizationName.value) {
    updateSearchField(organizationName.value)
  } else {
    // todo:  mostrar aviso de que introduzca algo
  }
}



</script>

<style scoped lang="scss">
  .search-box {
    margin: 20px 0;
  }
</style>
