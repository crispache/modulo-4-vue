<template>
  <div class="search-box">
    <form @submit="searchMembersOrganization">
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
            type="submit"
            :loading="isLoading"
            height="56"
            width="180"
            variant="flat"
            color="indigo-darken-3"
            @click="searchMembersOrganization"
          >
            Buscar
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </div>
  <ErrorAlert
    :is-open="isShowError"
    :error-message="errorMessage"
    @close-alert="isShowError = false"
  >
  </ErrorAlert>
</template>

<script setup lang="ts">
import { useSearchStore } from "~/composables/store/useSearchStore";

// Props & Emits
const props = defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: "update-list"): void;
}>();



const organizationName = ref<string>();
const isShowError = ref<boolean>(false);
const errorMessage = ref<string>('Introduzca un nombre de una organización')
const { currentSearchField, updateSearchField } = useSearchStore();


onMounted(() => {
  if (currentSearchField) {
    organizationName.value = currentSearchField;
  }
});


// Methods
const searchMembersOrganization = (event: Event) => {
  event.preventDefault();
  
  if (organizationName.value) {
    updateSearchField(organizationName.value);
    emit("update-list");
  } else {
    isShowError.value = true;
    // TODO: RESET TODO, el listado [], page 1, totalPages ...
  }

};
</script>

<style scoped lang="scss">
.search-box {
  margin: 20px 0;
}
</style>
