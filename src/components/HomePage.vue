<template>
  <main>
    <challenge-import-form />
    <challenge-list />
  </main>
</template>

<script>
import ChallengeImportForm from './ChallengeImportForm';
import ChallengeList from './ChallengeList';

export default {
  name: 'HomePage',
  components: {
    ChallengeImportForm,
    ChallengeList,
  },
};
</script>

<style lang="scss" scoped>
main {
  margin: 0 auto;
  max-width: 45rem;
  padding-top: 1.5rem;
  @media (max-width: 680px) {
    padding: 1rem;
  }
}
</style>
