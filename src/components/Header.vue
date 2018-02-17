<template>
  <header class="header">
    <div class="wrapper">
      <router-link class="wordmark" to="/">
        <h1>Co<span>de</span>work</h1>
      </router-link>
      <button v-if="!user" class="button-link" @click.prevent="signIn">Sign in</button>
      <div v-else class="dropdown">
        <button class="trigger" @click.stop="openMenu">
          <Avatar :src="user.photoUrl" :alt="user.name" />
          <span>{{ user.name }}</span>
        </button>
        <ul v-if="menuOpen" class="menu" data-toggle>
          <li data-toggle>
            <button class="button-link" @click.prevent="signOut">Sign out</button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Avatar from './Avatar';

export default {
  name: 'Header',
  components: {
    Avatar,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['signIn', 'signOut']),
    openMenu() {
      if (!this.menuOpen) {
        this.menuOpen = true;
        window.addEventListener('click', this.closeMenu);
      }
    },
    closeMenu(e) {
      if (e.target.dataset.toggle == null) {
        this.menuOpen = false;
        window.removeEventListener('click', this.closeMenu);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  padding: 0.75rem;
}

.wrapper {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 75rem;
}

.wordmark {
  text-decoration: none;

  h1 {
    color: #00bcd4;
    font-size: 1.5rem;
    margin: 0;
  }

  span {
    color: #ccc;
  }
}

.trigger {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 0.9rem;
  outline: none;
  padding: 0;
  position: relative;
}

.dropdown {
  position: relative;
}

.menu {
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  left: -0.375rem;
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  position: absolute;
  top: 2.3rem;
  width: 100%;
  z-index: 1;

  li {
    padding: 0.5rem;
  }

  &::before,
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
  }

  &::before {
    border: 8px solid transparent;
    border-bottom-color: #eee;
    left: 9px;
    right: auto;
    top: -16px;
  }

  &::after {
    border: 7px solid transparent;
    border-bottom-color: #fff;
    left: 10px;
    right: auto;
    top: -14px;
  }
}

.button-link {
  background: none;
  border: none;
  color: #00bcd4;

  &:hover {
    color: #1ed4d4;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
