<template>
  <v-snackbar
    :modelValue="isOpen"
    position="fixed"
    location="bottom left"
    color="red-lighten-1"
    theme="dark"
  >
   <span> {{ errorMessage }} </span>

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

  watch(() => props.isOpen, (newValue: boolean) => {
    if(newValue) {
      setTimeout(() => {
        emit('close-alert');
      },3000);
    }
  });
</script>

<style scoped lang="scss"></style>
