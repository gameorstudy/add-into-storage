<template>
  <div class="view">
    <nav class="nav">
      <router-link :to="{ name: 'board' }">Words</router-link> |
      <router-link class="router-link-active" :to="{ name: 'radicals' }"
        >Radicals</router-link
      >
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.view {
  @apply flex w-auto justify-center items-center h-15 m-0;
}

.nav {
  @apply ml-48;
}

.nav .router-link-active {
  @apply text-black no-underline opacity-50 box-border mx-5 my-0;
}

.nav .router-link-exact-active {
  @apply text-green_a border-solid border-b-2 border-green_a;
}
</style>
