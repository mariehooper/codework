<template>
  <div class="error-message">
    <h2>Page not found!</h2>
    <p>Sorry, but the page you were looking for could not be found.</p>
    <router-link class="button" to="/">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
};
</script>

<style lang="scss" scoped>
.error-message {
  margin: auto;
  max-width: 720px;
  padding: 3rem;
  text-align: center;

  p {
    margin-bottom: 2rem;
  }
}
</style>
