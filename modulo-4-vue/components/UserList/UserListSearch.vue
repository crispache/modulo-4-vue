<template>
  <div class="search-box">
    <form @submit.prevent>
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
            type="button"
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
  (e: "update-list", search: string): void;
}>();

const organizationName = ref<string>();
const isShowError = ref<boolean>(false);
const errorMessage = ref<string>("Introduzca un nombre de una organización");
const {
  currentSearchField,
  updateSearchField,
  updateUsersList,
  updatePage,
  updateTotalPages,
} = useSearchStore();

onMounted(() => {
  if (currentSearchField) {
    organizationName.value = currentSearchField;
  }
});

// Methods
const searchMembersOrganization = () => {
  if (organizationName.value) {
   // updateSearchField(organizationName.value); //* TODO: SE PUEDE composable
    emit("update-list", organizationName.value);
  } else {
    isShowError.value = true;
  /*   resetListWithDefaultValues(); */ // todo: revisar
  }
};


/* const resetListWithDefaultValues = (): void => {
  updateSearchField("");
  updateUsersList([]);
  updatePage(1);
  updateTotalPages(0);
}; */
</script>

<style scoped lang="scss">
.search-box {
  margin: 20px 0;
}
</style>
