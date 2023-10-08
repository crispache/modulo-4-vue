<template>
  <div class="box">
    <template v-if="users.length === 0">
      <user-list-empty />
    </template>

    <template v-else>
      <div class="list">
        <UserListItem
          v-for="user in users"
          :key="user.id"
          :user-name="user.login"
          :photo-url="user.avatar_url"
        />
      </div>

      <div class="pagination">
        <v-pagination
          v-model:model-value="page"
          :length="totalPages"
          :total-visible="7"
          @update:model-value="$emit('update-pagination', page)"
        ></v-pagination>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ListUserInfo } from "~/types/User";

// Pros & emits
const props = defineProps<{
  users: ListUserInfo[];
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "update-pagination", page: number): void;
}>();

const page = ref<number>(props.currentPage);
</script>

<style scoped lang="scss">
.box {
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }
  .pagination {
    margin: 0 auto;
    padding: 20px 0px;
  }
}
</style>
