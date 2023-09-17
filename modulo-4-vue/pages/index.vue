<template>
  <v-container>
    <v-row>
      <div v-for="user in users" :key="user.id">
        <v-col cols="10">
          <Card 
            :organization-name="default_organization" 
            :user-name="user.login" 
            :photo-url="user.avatar_url" />
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { githubService } from "~/apis/github";
import { UserGitHub } from "~/types/User";

const default_organization = 'Lemoncode'

const { getUsers, users } = useGithub();
await getUsers(default_organization);

console.log("Users", users);
</script>
