<template>
  <RouterLink to="/" class="flex items-center gap-3">
    <img src="/logo.png" alt="Boilora Logo" class="h-10 w-10" />
    <h1 class="font-bold text-2xl gradient-text">Boilora</h1>
  </RouterLink>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(to right, #e16df5, #4ef8e7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}
</style>
