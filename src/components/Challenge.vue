<template>
  <div class="card">
    <div class="card-header">
      <div class="metadata-wrapper">
        <avatar :alt="user.name" :src="user.photoUrl" size="large" />
        <div>
          <p class="author-name">{{ user.name }}</p>
          <p class="created-date">{{ formatDate(challenge.createdAt) }}</p>
        </div>
      </div>
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
import firebase from 'firebase';
import Avatar from './Avatar';

export default {
  name: 'Challenge',
  components: {
    Avatar,
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
  mounted() {
    this.userRef = firebase.database().ref(`/users/${this.challenge.submittedBy}`);
    this.userRef.on('value', (snapshot) => {
      const { name, photoUrl } = snapshot.val() || {};
      this.user = { name, photoUrl };
    });
  },
  beforeDestroy() {
    this.userRef.off();
  },
  methods: {
    getHtml(markdown) {
      return marked(markdown);
    },
    formatDate(date) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const userLang = navigator.languages || navigator.language;
      return new Date(Number(date)).toLocaleString(userLang, options);
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  background: #1ee4b7;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #fff;
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  letter-spacing: 0.025em;
  line-height: 40px;
  padding: 0 14px;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
}

.card {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 6px 8px rgba(102, 119, 136, 0.03), 0 1px 2px rgba(102, 119, 136, 0.3);
  margin-bottom: 1.5rem;
  padding: 1.5rem;
}

.card-header {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}

.card-title {
  font-size: 1.25rem;
}

.card-body {
  font-size: 0.9rem;
  line-height: 1.5;

  h1 {
    font-size: 1.25rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  a {
    word-break: break-word;
  }

  img {
    max-width: 100%;
  }
}

.card-footer {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  span {
    color: #8898aa;
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.metadata-wrapper {
  align-items: center;
  display: flex;
}

.author-name {
  font-size: 0.8125rem;
  margin: 0 0 0.2rem;
}

.created-date {
  font-size: 0.75rem;
  margin: 0;
}

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
