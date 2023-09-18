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
          :length="15"
          :total-visible="7"
          @update:model-value="updatePage()"
        ></v-pagination>
      </div>
    </template>
  </section>
  <!-- 
  <ErrorAlert 
    :is-open="isShowError" 
    :error-message="errorMessage"
    @close-alert="isShowError = false">
  </ErrorAlert> -->
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { githubService } from "~/apis/github";
import { useSearchStore } from "~/composables/store/useSearchStore";
import { UserGitHub } from "~/types/User";


const isShowError = ref<boolean>(false);
const { getUsers, users, isLoading, errorMessage, currentPage } = useGithub();
const search = useSearchStore();
const { currentSearchField, searchField } = storeToRefs(search)


onMounted( async () => {
  await getUsers(currentSearchField.value, currentPage.value);
})

// 
if (errorMessage.value) {
  isShowError.value = true;
}

const updatePage = async () => {
  await getUsers(currentSearchField.value, currentPage.value);
}


watch( searchField, async () => {
  await getUsers(currentSearchField.value, currentPage.value);
})
</script>

<style scoped lang="scss">
.container {
 /*  background-color: #eceff1; */
  height: 100vh;
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
    height: 100%;
  }
}
</style>
