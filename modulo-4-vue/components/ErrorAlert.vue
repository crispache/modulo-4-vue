<template>
  <v-snackbar
    :modelValue="isOpen"
    position="fixed"
    location="bottom left"
    color="red-lighten-1"
  >
   <span style="color: white;">   {{ errorMessage }} </span>

    <template #actions>
      <v-icon
        icon="mdi-close"
        @click="emit('close-alert')"
      ></v-icon>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
const props = defineProps<{ isOpen: boolean; errorMessage: string }>();
const emit = defineEmits<{
  (close: "close-alert"): void;
}>();
</script>

<style scoped lang="scss"></style>
