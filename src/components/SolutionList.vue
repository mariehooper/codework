<template>
  <ul class="solutions">
    <li v-for="solution in solutions" :key="solution.id">
      <solution :solution="solution" />
    </li>
  </ul>

</template>

<script>
import firebase from 'firebase';
import { addIdToItems } from '../utils';
import Solution from './Solution';

export default {
  name: 'SolutionList',
  components: {
    Solution,
  },
  props: {
    challengeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      solutionsRef: null,
      solutions: [],
    };
  },
  mounted() {
    this.solutionsRef = firebase.database().ref(`solutions/${this.challengeId}`);
    this.solutionsRef.on('value', (snapshot) => {
      this.solutions = addIdToItems(snapshot.val() || {});
    });
  },
  beforeDestroy() {
    this.solutionsRef.off();
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
