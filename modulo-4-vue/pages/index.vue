<template>
  <section class="container">
    <UserListSearch :is-loading="isLoading" @update-list="updateList" />

    <template v-if="isLoading || !currentIsDefaultStateLoaded">
      <div class="spinner">
        <Spinner />
      </div>
    </template>

    <template v-else>
      <UserList
        :users="users"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update-pagination="updatePagination"
      />
    </template>
  </section>
  <ErrorAlert
    :is-open="isShowError"
    :error-message="errorMessage"
    @close-alert="isShowError = false">
  </ErrorAlert>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSearchStore } from "~/composables/store/useSearchStore";

// Composables & Stores
const { getUsers, users, isLoading, errorMessage } = useGithub();
const searchStore = useSearchStore();
const { currentSearchField, currentPage, totalPages, currentIsDefaultStateLoaded } = storeToRefs(searchStore); 
const { updateDefaultState } = useSearchStore()
const isShowError = ref<boolean>(false);

if(!currentIsDefaultStateLoaded.value) {
  updateDefaultState(true);
  await getUsers(currentSearchField.value, currentPage.value); 
}

// methods
const updatePagination = async (page: number) => {
  await getUsers(currentSearchField.value, page);
};

const updateList = async (search: string) => {
  await getUsers(search, 1);
}

// watch
watch(errorMessage, () => {
  if (errorMessage.value) {
    isShowError.value = true;
  }
});

// Meta
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
.container {
  min-height: 650px;
  padding: 20px;

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }
}
</style>
