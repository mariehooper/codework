<template>
  <div class="card">
    <div class="card-header">
      <user-data
        :submitted-by="challenge.submittedBy"
        :created-at="challenge.createdAt"
      />
      <span class="level-indicator">
        <span :style="{ backgroundColor: level.color }" />
        {{ level.text }}
      </span>
    </div>
    <h2 class="card-title">
      {{ challenge.name }}
    </h2>
    <article class="card-body" v-html="descriptionHtml" />
    <div class="card-footer">
      <span>{{ numSolutions }}</span>
      <router-link
        v-if="internalLink"
        class="button"
        :to="`challenge/${challenge.slug}`"
      >
        Solve
      </router-link>
      <a
        v-else
        class="button"
        :href="challenge.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        Start Solving
      </a>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import UserData from './UserData'
import { pluralize } from '../utils'

export default {
  name: 'Challenge',
  components: {
    UserData
  },
  props: {
    challenge: {
      type: Object,
      required: true
    },
    internalLink: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    level() {
      switch (this.challenge.points) {
        case 8:
          return { text: 'Beginner', color: '#58D68D' }
        case 7:
        case 6:
          return { text: 'Intermediate', color: '#ffeb3b' }
        default:
          return { text: 'Advanced', color: '#f44336' }
      }
    },
    descriptionHtml() {
      return marked(this.challenge.description)
    },
    numSolutions() {
      return pluralize('solution', this.challenge.numSolutions)
    }
  }
}
</script>

<style lang="scss" scoped>
.level-indicator {
  color: #8898aa;
  font-size: 0.875rem;
  font-weight: 500;
  span {
    border-radius: 50%;
    content: ' ';
    display: inline-block;
    height: 10px;
    width: 10px;
  }
}
</style>
