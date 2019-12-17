<template>
  <div class="card">
    <div class="card-header">
      <user-data
        :submitted-by="solution.submittedBy"
        :created-at="solution.createdAt"
        display-time
      />
      <button
        v-if="isUserSolution"
        @click="deleteSolution"
        class="button-link delete"
        type="button"
      >
        <trash-icon />
      </button>
    </div>
    <article class="card-body" v-html="contentHtml" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import marked from 'marked'
import UserData from './UserData'
import TrashIcon from './TrashIcon'

export default {
  name: 'Solution',
  components: {
    UserData,
    TrashIcon
  },
  props: {
    solution: {
      type: Object,
      required: true
    },
    challenge: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user', 'solutions']),
    contentHtml() {
      return marked(this.solution.content)
    },
    isUserSolution() {
      return this.solution.submittedBy === this.user.id
    }
  },
  methods: {
    async deleteSolution() {
      if (window.confirm('Do you really want to delete your solution?')) {
        await this.solutions.ref.child(this.solution.id).remove()
        firebase
          .database()
          .ref(`challenges/${this.challenge.id}/numSolutions`)
          .set(this.challenge.numSolutions - 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 0.5rem;
  padding: 1rem;
}
.delete {
  margin-left: auto;
}
</style>
