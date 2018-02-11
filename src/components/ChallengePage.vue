<template>
  <div class="content">
    <div class="column">
      <challenge :challenge="challenge" />
    </div>
    <div class="column" />
  </div>
</template>

<script>
import Challenge from './Challenge';

export default {
  name: 'ChallengePage',
  components: {
    Challenge,
  },
  computed: {
    challenge() {
      return this.$store.state.challenges.find(c => this.$route.params.slug === c.slug);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  margin: 0 auto;
  max-width: 75rem;
  padding-top: 1.5rem;
  @media (max-width: 680px) {
    display: block;
  }
}

.column {
  flex: 1;
  width: 50%;
  @media (max-width: 680px) {
    width: 100%;
  }

  &:not(:last-child) {
    padding-right: 1rem;
    @media (max-width: 680px) {
      padding-right: 0;
    }
  }
}
</style>
