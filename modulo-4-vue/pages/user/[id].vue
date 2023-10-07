<template>
  <div class="container">
    <div class="back-button">
      <NuxtLink to="/">
        <v-btn prepend-icon="mdi-arrow-left" variant="outlined" color="black">
          Volver al listado
        </v-btn>
      </NuxtLink>
    </div>

    <!-- Spinner -->
    <template v-if="isLoadingUserDetails">
      <div class="spinner">
        <Spinner />
      </div>
    </template>

    <!-- User Details -->
    <template v-else>
      <template v-if="userDetails">
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
              <h2>{{ getUserName }}</h2>
              <v-btn
                size="small"
                icon="mdi-open-in-new"
                variant="text"
                @click="openBrowserTabToShowGithubRepository()"
              ></v-btn>
            </div>

            <v-chip size="small" color="primary" text-color="white">
              {{ getOrganizationName }}
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

      <template v-else>
        <user-list-item-empty />
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
import { storeToRefs } from "pinia";
import avatarPhotoUrl from "~/assets/images/avatar.png";
import { useSearchStore } from "~/composables/store/useSearchStore";

// Composable & route & store
const route = useRoute();
const isShowError = ref<boolean>(false);
const { userDetails, getUserDetail, isLoadingUserDetails, errorMessage } = useGithub();
const search = useSearchStore();
const { currentSearchField } = storeToRefs(search);

onMounted(async () => {
  const id = route.params.id as string;
  await getUserDetail(id);
});

// Methods
const openBrowserTabToShowGithubRepository = (): void => {
  window.open(userDetails.value?.html_url);
};

// Computed & watch
const getUserName = computed(() => {
  if (userDetails.value?.name && userDetails.value?.login) {
    return `${userDetails.value.name} - ${userDetails.value.login}`;
  }

  if (userDetails.value?.login) {
    return `${userDetails.value.login}`;
  }

  return "-";
});

const getOrganizationName = computed(() => currentSearchField.value);

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
