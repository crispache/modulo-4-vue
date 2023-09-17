<template>
  <v-card width="290" height="235" elevation="1" class="pa-2 rounded-lg white">
    <v-card-item>
      <v-img 
        :src="photoUrl" 
        alt="Foto del usuario"
        height="80" 
        width="80" 
        class="mb-2 rounded">
        
        <template #error>
          <v-img
            :src="avatarPhotoUrl" 
            alt="Usuario sin foto"
            height="80" 
            width="80"
            class="mb-2"
          ></v-img>
        </template>
      </v-img>

      <v-card-title>
        {{ userName }}
      </v-card-title>

      <v-card-subtitle> Organización: {{ organizationName }} </v-card-subtitle>
    </v-card-item>
    <v-card-actions>
      <v-btn color="blue-darken-3" variant="tonal" width="100%">
        Ver más
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import avatarPhotoUrl from '~/assets/images/avatar.png'

const props = defineProps<{
  organizationName: string,
  userName: string;
  photoUrl: string;
}>();
</script>

<style scoped lang="scss"></style>
