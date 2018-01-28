<template>
  <div class="avatar">
    <img :src="src" :alt="alt" >
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
  flex: 0 0 1.5rem;
  margin-right: 0.5rem;
  overflow: hidden;
  width: 1.5rem;

  img {
    display: block;
    height: 1.5rem;
    object-fit: cover;
    width: 100%;
  }
}
</style>
