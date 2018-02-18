<template>
  <p class="error-message" role="alert">{{ message }}</p>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.error-message {
  background: #f65568;
  border-radius: 3px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  color: #fff;
  display: block;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  padding: 0.5rem;
}
</style>
