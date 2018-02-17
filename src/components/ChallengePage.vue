<template>
  <div v-if="!challengesAreLoading && challenge" class="content">
    <div class="column">
      <challenge :challenge="challenge" />
    </div>
    <div class="column" v-if="!solutions.areLoading">
      <solution-list v-if="userHasSubmitted" :challenge="challenge" />
      <solution-form v-else :challenge="challenge" />
    </div>
  </div>
  <error-page v-else-if="!challengesAreLoading && !challenge" />
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Challenge from './Challenge';
import ErrorPage from './ErrorPage';
import SolutionForm from './SolutionForm';
import SolutionList from './SolutionList';

export default {
  name: 'ChallengePage',
  components: {
    Challenge,
    ErrorPage,
    SolutionForm,
    SolutionList,
  },
  computed: {
    ...mapState(['challenges', 'solutions', 'user']),
    challenge() {
      return this.challenges.items.find(c => this.$route.params.slug === c.slug);
    },
    challengesAreLoading() {
      return this.challenges.areLoading;
    },
    userHasSubmitted() {
      return (
        this.user &&
        this.solutions.items.find(solution => solution.submittedBy === this.user.id)
      );
    },
  },
  watch: {
    challenge() {
      this.loadSolutions(this.challenge.id);
    },
  },
  mounted() {
    if (this.challenge) {
      this.loadSolutions(this.challenge.id);
    }
  },
  beforeDestroy() {
    if (this.solutions.ref) {
      this.clearSolutions();
    }
  },
  methods: {
    ...mapActions(['loadSolutions']),
    ...mapMutations(['clearSolutions']),
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
  max-width: 50%;
  @media (max-width: 680px) {
    max-width: 100%;
  }

  &:not(:last-child) {
    padding-right: 1rem;
    @media (max-width: 680px) {
      padding-right: 0;
    }
  }
}
</style>
