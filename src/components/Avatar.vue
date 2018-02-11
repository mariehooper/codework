<template>
  <div :class="`avatar ${size}`">
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
    size: {
      type: String,
      default: 'small',
    },
  },
};
</script>

<style lang="scss" scoped>
$large: 2.5rem;
$small: 1.5rem;

.avatar {
  border-radius: 50%;
  flex: 0 0 $small;
  margin-right: 0.5rem;
  overflow: hidden;
  width: $small;

  img {
    display: block;
    height: $small;
    object-fit: cover;
    width: 100%;
  }

  &.large {
    flex: 0 0 $large;
    width: $large;

    img {
      height: $large;
    }
  }
}
</style>
