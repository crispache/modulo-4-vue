<template>
  <section>
    <h2>Miembros de {{ organizationName }} </h2>
    <div class="container">
      <UserListItem
        v-for="user in users" 
        :key="user.id"
        organization-name="Lemoncode"
        :user-name="user.login"
        :photo-url="user.avatar_url"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { UserGitHub } from "~/types/User";

const props = defineProps<{
  organizationName: string,
  users: UserGitHub[];
}>();
</script>

<style scoped lang="scss">

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 20px 0px;
  }

</style>
