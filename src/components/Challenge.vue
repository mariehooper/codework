<template>
  <div class="card">
    <div class="card-header">
      <user-data :submitted-by="challenge.submittedBy" :created-at="challenge.createdAt"/>
      <span class="level-indicator">
        <span :style="{ backgroundColor: level.color }"/>
        {{ level.text }}
      </span>
    </div>
    <h2 class="card-title">{{ challenge.name }}</h2>
    <article class="card-body" v-html="getHtml(challenge.description)"/>
    <div class="card-footer">
      <span>{{ challenge.numSolutions }} solutions</span>
      <router-link v-if="internalLink" class="button" :to="`challenge/${challenge.slug}`">
        Solve
      </router-link>
      <a v-else class="button" :href="challenge.url" target="_blank" rel="noopener noreferrer">
        Start Solving
      </a>
    </div>
  </div>
</template>

<script>
import marked from 'marked';
import UserData from './UserData';

export default {
  name: 'Challenge',
  components: {
    UserData,
  },
  props: {
    challenge: {
      type: Object,
      required: true,
    },
    internalLink: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userRef: null,
      user: {
        name: '',
        photoUrl: '',
      },
    };
  },
  computed: {
    level() {
      switch (this.challenge.points) {
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
  methods: {
    getHtml(markdown) {
      return marked(markdown);
    },
  },
};
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
    margin-right: 0.25rem;
    width: 10px;
  }
}
</style>
