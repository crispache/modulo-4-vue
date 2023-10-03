<template>
  <v-card width="285" height="225" elevation="1" class="pa-2 rounded-lg white">
    <v-card-item>
      <v-img
        :src="photoUrl"
        alt="Foto del usuario"
        height="70"
        width="70"
        class="mb-2 rounded"
      >
        <template #error>
          <v-img
            :src="avatarPhotoUrl"
            alt="Usuario sin foto"
            height="70"
            width="70"
            class="mb-2"
          ></v-img>
        </template>
      </v-img>

      <v-card-title>
        {{ userName }}
      </v-card-title>

      <v-card-subtitle>
        Organización: {{ currentSearchField }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-actions>
      <NuxtLink :to="`/user/${userName}`">
        <v-btn color="blue-darken-3" variant="tonal" width="255" height="40">
          Ver más
        </v-btn>
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import avatarPhotoUrl from "~/assets/images/avatar.png";
import { useSearchStore } from "~/composables/store/useSearchStore";

const props = defineProps<{
  userName: string;
  photoUrl: string;
}>();

const search = useSearchStore();
const { currentSearchField } = storeToRefs(search);
</script>

<style scoped lang="scss"></style>
