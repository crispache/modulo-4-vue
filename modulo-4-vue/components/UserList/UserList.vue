<template>
  <section class="container">
    <div class="title">
      <h2>Miembros de {{ organizationName }}</h2>
    </div>

    <div class="spinner" v-if="isLoading">
      <Spinner />
    </div>

    <div class="list" v-else>
      <UserListItem
        v-for="user in users"
        :key="user.id"
        organization-name="Lemoncode"
        :user-name="user.login"
        :photo-url="user.avatar_url"
      />
    </div>
  </section>
  <!-- 
  <ErrorAlert 
    :is-open="isShowError" 
    :error-message="errorMessage"
    @close-alert="isShowError = false">
  </ErrorAlert> -->
</template>

<script setup lang="ts">
import { githubService } from "~/apis/github";
import { UserGitHub } from "~/types/User";

const organizationName = "Lemoncode";
const isShowError = ref<boolean>(false);
const { getUsers, users, isLoading, errorMessage } = useGithub();

await getUsers(organizationName);

if (errorMessage.value) {
  isShowError.value = true;
}
</script>

<style scoped lang="scss">
.container {
  background-color: #eceff1;
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

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
