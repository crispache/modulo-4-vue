<template>
  <main class="main_box">
    <div v-if="isLoading" class="spinner">
      <Spinner />
    </div>

   <template v-else>
      <UserList :organization-name="organization_name" :users="users" />
   </template>
  </main>

  <ErrorAlert 
    :is-open="isShowError" 
    :error-message="errorMessage"
    @close-alert="isShowError = false">
  </ErrorAlert>
</template>

<script setup lang="ts">
import { githubService } from "~/apis/github";
import { UserGitHub } from "~/types/User";

const isShowError = ref<boolean>(false)
const { getUsers, users, isLoading, errorMessage } = useGithub();
const organization_name = 'Lemoncode'

await getUsers(organization_name);
if(errorMessage.value) {
  isShowError.value = true
}

</script>

<style lang="scss" scoped>
.main_box {
  max-width: 1280px;
  margin: 0 auto;
  min-height: 90vh;
  background-color: #eceff1;
  padding: 20px;

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
}
</style>
