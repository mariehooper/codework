<template>
  <ul class="challenges">
    <li v-for="challenge in challenges" :key="challenge.id">
      <challenge :challenge="challenge" internal-link />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import Challenge from './Challenge';

export default {
  name: 'ChallengeList',
  components: {
    Challenge,
  },
  computed: {
    ...mapGetters(['challenges']),
  },
};
</script>

<style lang="scss" scoped>
.challenges {
  list-style-type: none;
  margin: 0;
  padding-left: 0;
}
</style>
