<template>
  <main>
    <ul class="challenge-list">
      <li v-for="challenge in challenges" :key="challenge.id">
        <challenge :challenge="challenge" :level="getLevel(challenge.points)"/>
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
  methods: {
    getLevel(points) {
      switch (points) {
        case 8:
          return { text: 'Beginner', color: '#58D68D' };
        case 7:
        case 6:
          return { text: 'Intermediate', color: '#ffeb3b' };
        default:
          return { text: 'Advanced', color: '#f44336' };
      }
    },
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
