<template>
  <div class="bg-white rounded-md w-full">
    <div class="p-5">
      <Header />
      <UserTable />
      <Timer />
    </div>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import UserTable from "./UserTable.vue";
import Timer from "./Timer.vue";
</script>
