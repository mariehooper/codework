<template>
  <div v-if="!challengesAreLoading && challenge" class="content">
    <div class="column">
      <challenge :challenge="challenge" />
    </div>
    <div class="column">
      <solution-list :challenge-id="challenge.id"/>
    </div>
  </div>
  <error-page v-else-if="!challengesAreLoading && !challenge" />
</template>

<script>
import Challenge from './Challenge';
import ErrorPage from './ErrorPage';
import SolutionList from './SolutionList';

export default {
  name: 'ChallengePage',
  components: {
    Challenge,
    ErrorPage,
    SolutionList,
  },
  computed: {
    challenge() {
      return this.$store.state.challenges.items.find(c => this.$route.params.slug === c.slug);
    },
    challengesAreLoading() {
      return this.$store.state.challenges.areLoading;
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
