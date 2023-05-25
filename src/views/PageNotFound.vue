<script setup lang="ts">
document.title = 'Page not found';
</script>

<template>
  <section id="not-found">
    <h1>Page not found!</h1>
    <p>The page you are looking for does not exist!</p>
    <p>Back to <RouterLink to="/">home page</RouterLink></p>
  </section>
</template>

<style lang="scss" scoped>
#not-found {
  margin-top: 30px;
  text-align: center;
  font-size: 20pt;

  h1,
  p {
    margin-bottom: 20px;
  }
}
</style>
