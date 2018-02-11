<template>
  <div class="card">
    <div class="card-header">
      <user-data
        :submitted-by="solution.submittedBy"
        :created-at="solution.createdAt"
        display-time
      />
    </div>
    <article class="card-body" v-html="getHtml(solution.content)"/>
  </div>
</template>

<script>
import marked from 'marked';
import UserData from './UserData';

export default {
  name: 'Solution',
  components: {
    UserData,
  },
  props: {
    solution: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getHtml(markdown) {
      return marked(markdown);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 0.5rem;
  padding: 1rem;
}
</style>
