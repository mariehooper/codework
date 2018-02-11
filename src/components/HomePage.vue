<template>
  <main>
    <ul class="challenge-list">
      <li v-for="challenge in challenges" :key="challenge.id">
        <challenge :challenge="challenge" internal-link />
      </li>
    </ul>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import Challenge from './Challenge';

export default {
  name: 'HomePage',
  components: {
    Challenge,
  },
  computed: {
    ...mapGetters(['challenges']),
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

.challenge-list {
  list-style-type: none;
  margin: 0;
  padding-left: 0;
}
</style>
