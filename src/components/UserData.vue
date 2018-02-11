<template>
  <div class="metadata-wrapper">
    <avatar :alt="user.name" :src="user.photoUrl" size="large"/>
    <div>
      <p class="author-name">{{ user.name }}</p>
      <p class="created-date">{{ formatDate(createdAt) }}</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import Avatar from './Avatar';

export default {
  name: 'UserData',
  components: {
    Avatar,
  },
  props: {
    submittedBy: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Number,
      required: true,
    },
    displayTime: {
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
  mounted() {
    this.userRef = firebase.database().ref(`/users/${this.submittedBy}`);
    this.userRef.on('value', (snapshot) => {
      const { name, photoUrl } = snapshot.val() || {};
      this.user = { name, photoUrl };
    });
  },
  beforeDestroy() {
    this.userRef.off();
  },
  methods: {
    formatDate(date) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      if (this.displayTime) {
        options.hour = 'numeric';
        options.minute = 'numeric';
      }
      const userLang = navigator.languages || navigator.language;
      return new Date(Number(date)).toLocaleString(userLang, options);
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
