<template>
  <!--  <UserList /> -->

  <section class="container">
    <template v-if="isLoading">
      <div class="spinner">
        <Spinner />
      </div>
    </template>

    <template v-else>
      <UsersList
        :users="users"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update-pagination="updatePagination"
      />
    </template>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSearchStore } from "~/composables/store/useSearchStore";

// Composables & Stores
const { getUsers, users, isLoading } = useGithub();
const searchStore = useSearchStore();
const { currentSearchField, currentPage, totalPages } = storeToRefs(searchStore); 

// Call API
await getUsers(currentSearchField.value, currentPage.value);

// methods
const updatePagination = async (page: number) => {
  await getUsers(currentSearchField.value, page);
};

// Meta
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
.container {
  min-height: 650px;
  padding: 20px;
  /* background-color: rgb(203, 183, 183); */

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }
}
</style>
