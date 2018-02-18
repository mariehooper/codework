<template>
  <ul class="solutions">
    <li v-for="solution in solutions" :key="solution.id">
      <solution :solution="solution" :challenge="challenge" />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import Solution from './Solution';

export default {
  name: 'SolutionList',
  components: {
    Solution,
  },
  props: {
    challenge: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['solutions']),
  },
};
</script>

<style lang="scss" scoped>
.solutions {
  list-style-type: none;
  margin: 0;
  padding-left: 0;
}

</style>
