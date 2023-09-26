<template>
  <div class="container">
    <div class="back-button">
      <NuxtLink to="/">
        <v-btn prepend-icon="mdi-arrow-left" variant="outlined" color="black">
          Volver al listado
        </v-btn>
      </NuxtLink>
    </div>

    <template v-if="isLoading">
      <div class="spinner">
        <Spinner />
      </div>
    </template>

    <template v-else>

      <template v-if="errorMessage">
        <user-list-item-empty/>
      </template>

      <template v-else>
        <div class="user-info">
          <div class="image">
            <v-img
              :src="userDetails?.avatar_url"
              alt="Foto del usuario"
              height="160"
              width="160"
            >
              <template #error>
                <v-img
                  :src="avatarPhotoUrl"
                  alt="Usuario sin foto"
                  height="160"
                  width="160"
                ></v-img>
              </template>
            </v-img>
          </div>

          <div class="main-info">
            <div class="d-flex">
              <h2>{{ userDetails?.name }} - {{ userDetails?.login }}</h2>
              <v-btn
                size="small"
                icon="mdi-open-in-new"
                variant="text"
                @click="openBrowserTabToShowGithubRepository()"
              ></v-btn>
            </div>

            <v-chip size="small" color="primary" text-color="white">
              {{ userDetails?.company }}
            </v-chip>

            <div class="mt-2" style="font-size: 14px">
              <p>Email: {{ userDetails?.email }}</p>
              <p>Localización: {{ userDetails?.location }}</p>
            </div>

            <div class="counter">
              <div class="mr-4">
                <v-chip color="#455a64" text-color="white">
                  <v-icon start icon="mdi-bookshelf"></v-icon>
                  Repositorios ({{ userDetails?.public_repos }})
                </v-chip>
              </div>

              <div class="mr-4">
                <v-chip color="#455a64" text-color="white">
                  <v-icon start icon="mdi-account-multiple"></v-icon>
                  Seguidores ({{ userDetails?.followers }})
                </v-chip>
              </div>

              <div class="mr-4">
                <v-chip color="#455a64" text-color="white">
                  <v-icon start icon="mdi-account-multiple"></v-icon>
                  Siguiendo ({{ userDetails?.following }})
                </v-chip>
              </div>
            </div>
          </div>
        </div>
        <div class="bio">
          <div v-html="userDetails?.bio"></div>
        </div>
      </template>
    </template>
  </div>
  <ErrorAlert
    :is-open="isShowError"
    :error-message="errorMessage"
    @close-alert="isShowError = false"
  >
  </ErrorAlert>
</template>

<script setup lang="ts">
import avatarPhotoUrl from "~/assets/images/avatar.png";
import { UserDetails } from "~/types/User";
const route = useRoute();
const isShowError = ref<boolean>(false);
/* const DEFAULT_USER_DATA: UserDetails = {
  login: '',
  avatar_url: '',
  html_url: '',
  repos_url: '',
  name: '',
  company: '',
  location: '',
  email: '',
  bio: '',
  public_repos: 0,
  followers: 0,
  following: 0,
} */

const { userDetails, getUserDetail, isLoading, errorMessage } = useGithub();

const openBrowserTabToShowGithubRepository = (): void => {
  window.open(userDetails.value?.html_url);
};

onMounted(async () => {
  const id = route.params.id as string;
  await getUserDetail(id);
});

watch(errorMessage, () => {
  if (errorMessage.value) {
    isShowError.value = true;
  }
});
</script>

<style scoped lang="scss">
.container {
  padding: 30px;

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }

  .user-info {
    margin: 40px 0px;
    display: flex;

    .image {
      margin-right: 30px;
    }

    .main-info {
      width: 80%;
    }

    .counter {
      display: flex;
      margin-top: 15px;
    }
  }
}
</style>
