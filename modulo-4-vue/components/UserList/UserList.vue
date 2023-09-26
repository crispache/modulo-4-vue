<template>
  <section class="container">
    <UserListSearch :is-loading="isLoading" />

    <div class="title">
      <h2>Miembros de {{ currentSearchField }}</h2>
    </div>

    <div class="spinner" v-if="isLoading">
      <Spinner />
    </div>

    <template v-else>
      <template v-if="users.length === 0">
        <user-list-empty />
      </template>

      <template v-else>
        <div class="list">
          <UserListItem
            v-for="user in users"
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

const isShowError = ref<boolean>(false);
const { getUsers, users, isLoading, errorMessage, currentPage, totalPages } = useGithub();
const search = useSearchStore();
const { updatePage } = useSearchStore();
const { currentSearchField, searchField, currentUsersList } = storeToRefs(search);

onMounted(async () => {
  console.log('actual buscador ', currentSearchField.value)
/*   console.log('montar listado', currentUsersList.value ) */
 /*  if(!currentUsersList.value) { */
  // await getUsers(currentSearchField.value, currentPage.value);
  /* } */

  if(currentUsersList.value) {
    // valores
    //pagina
    // total página

    
  }
  

});



const updatePagination = async () => {
  updatePage(currentPage.value);
  await getUsers(currentSearchField.value, currentPage.value);
};



watch(searchField, async () => {
  await getUsers(currentSearchField.value, currentPage.value);
});

watch(errorMessage, () => {
  if (errorMessage.value) {
    isShowError.value = true;
  }
});
</script>

<style scoped lang="scss">
.container {
  height: 50vh;
  padding: 20px;

  .title {
    margin-bottom: 15px;
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
