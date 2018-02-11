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

.button {
  background: #1ee4b7;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #fff;
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  letter-spacing: 0.025em;
  line-height: 40px;
  padding: 0 14px;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
}
</style>
