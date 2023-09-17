<template>
  <v-container class="main_box">
    <div v-if="isLoading" class="spinner">
      <Spinner />
    </div>

    <v-row v-else>
      <v-col
        v-for="user in users"
        :key="user.id"
        cols="12"
        md="4"
        lg="3"
        xl="3"
        xxl="3"
      >
        <Card
          :organization-name="default_organization"
          :user-name="user.login"
          :photo-url="user.avatar_url"
        />
      </v-col>
    </v-row>
  </v-container>

  <ErrorAlert 
    :is-open="isShowError" 
    :error-message="errorMessage"
    @close-alert="isShowError = false">
  </ErrorAlert>
</template>

<script setup lang="ts">
import { githubService } from "~/apis/github";
import { UserGitHub } from "~/types/User";

const default_organization = "Lemoncode";
const isShowError = ref<boolean>(false)
const { getUsers, users, isLoading, errorMessage } = useGithub();


await getUsers(default_organization);
if(errorMessage.value) {
  isShowError.value = true
}

/* console.log("Users", users); */
</script>

<style lang="scss" scoped>
.main_box {
  max-width: 1280px;
  margin: 0 auto;
  min-height: 90vh;
  background-color: #eceff1;

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
}
</style>
