<template>
  <div>
    <NuxtWelcome />
    <v-btn color="primary">Start</v-btn>
  </div>
</template>

<script setup lang="ts">
import { githubService } from '~/apis/github';

const users =  await githubService.getUsers('Lemoncode')
console.log('Users', users)
</script>
