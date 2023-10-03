<template>
  <section class="container">
    <UserListSearch :is-loading="isLoading" @update-list="updateList()" />

    <div class="title">
      <h2 v-if="currentSearchField"> Miembros de {{ currentSearchField }} </h2>
    </div>

    <div class="spinner" v-if="isLoading">
      <Spinner />
    </div>

    <template v-else>
      <template v-if="currentUsersList.length === 0">
        <user-list-empty />
      </template>

      <template v-else>
        <div class="list">
          <UserListItem
            v-for="user in currentUsersList"
            :key="user.id"
            :user-name="user.login"
            :photo-url="user.avatar_url"
          />
        </div>

        <div class="pagination">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
            @update:model-value="updatePagination()"
          ></v-pagination>
        </div>
      </template>
    </template>
  </section>

  <ErrorAlert
    :is-open="isShowError"
    :error-message="errorMessage"
    @close-alert="isShowError = false"
  >
  </ErrorAlert>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSearchStore } from "~/composables/store/useSearchStore";

const { getUsers, users, isLoading, errorMessage, currentPage } = useGithub();
const search = useSearchStore();
const { updatePage, updateSearchField, updateUsersList, updateTotalPages } = useSearchStore();
const { currentSearchField, currentUsersList, totalPages, currentPage: currentPageStore } = storeToRefs(search);

const isShowError = ref<boolean>(false);


// methods
const updatePagination = async () => {
  updatePage(currentPage.value);
  await getUsers(currentSearchField.value, currentPage.value);
};

const updateList = async () => {
  updatePage(1);
  await getUsers(currentSearchField.value, 1);
};

const resetListWithDefaultValues = (): void => {
  updateUsersList([]);
  updatePage(1);
  updateTotalPages(0);
};


// watch
watch(errorMessage, () => {
  if (errorMessage.value) {
    isShowError.value = true;
    resetListWithDefaultValues();
  }
});
</script>

<style scoped lang="scss">
.container {
  height: 50vh;
  padding: 20px;

  .title {
    margin-bottom: 15px;
    height: 50px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

  .pagination {
    margin: 0 auto;
    padding: 20px 0px;
  }

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }
}
</style>
