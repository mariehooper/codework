<template>
  <div>
    <error-message v-if="error" :message="error"/>
    <form @submit.prevent="handleSubmit">
      <div class="styled-input-bar">
        <label htmlFor="challenge-url">
          <input
            id="challenge-url"
            name="url"
            @blur="handleBlur"
            @focus="handleFocus"
            placeholder="Codewars Kata URL"
            type="text"
            v-model="url"
          >
        </label>
        <button type="submit">Import</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase';
import { getCodewarsChallenge } from '../utils';
import ErrorMessage from './ErrorMessage';

export default {
  name: 'ChallengeImportForm',
  components: {
    ErrorMessage,
  },
  data() {
    return {
      url: '',
      error: null,
    };
  },
  computed: {
    ...mapState(['challenges', 'user']),
  },
  methods: {
    handleBlur(event) {
      event.target.parentNode.parentNode.classList.remove('active');
    },
    handleFocus(event) {
      event.target.parentNode.parentNode.classList.add('active');
    },
    async importChallenge() {
      const [, idOrSlug] = this.url.match(/codewars.com\/kata\/([^/]+)/i) || [null, null];
      if (idOrSlug) {
        try {
          const data = await getCodewarsChallenge(idOrSlug);
          if (!this.challenges.items.find(challenge => challenge.id === data.id)) {
            const { description, id, name, rank, tags, url, slug } = data;
            this.challenges.ref.child(id).set({
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              description,
              name,
              points: parseInt(rank.name, 10),
              tags,
              url,
              slug,
              submittedBy: this.user.id,
              numSolutions: 0,
            });
            this.url = '';
            this.error = null;
          } else {
            this.error = 'That challenge has already been imported!';
          }
        } catch (error) {
          this.error = error.message;
        }
      } else {
        this.error = 'Please enter a correctly-formatted Codewars Kata URL.';
      }
    },
    handleSubmit() {
      this.importChallenge();
    },
  },
};
</script>

<style lang="scss" scoped>
.styled-input-bar {
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
  display: flex;
  overflow: hidden;

  &.active {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  label {
    flex: 1;
  }

  input {
    border: none;
    outline: none;
    padding: 0.75rem 1rem;
    width: 100%;
  }

  button {
    background: white;
    border: none;
    border-radius: 0;
    color: #00bcd4;
    font-size: 0.875rem;
    font-weight: 600;
    outline: none;
    padding: 0.75rem 1rem;
    position: relative;
    text-transform: uppercase;

    &:focus {
      background-color: #f6f9fc;
    }

    &:hover {
      color: #1ed4d4;
      cursor: pointer;
    }

    &::before {
      background: #f2eaf7;
      bottom: 7px;
      content: '';
      left: 0;
      position: absolute;
      top: 7px;
      width: 2px;
    }
  }
}

</style>
