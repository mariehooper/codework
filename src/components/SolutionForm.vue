<template>
  <div class="sticky-wrapper">
    <error-message v-if="error" :message="error"/>
    <form @submit.prevent="handleSubmit">
      <div v-if="user">
        <ul class="toggle-buttons">
          <li>
            <button
              :class="`toggle-button ${mode === 'write' ? 'active' : null}`"
              type="button"
              data-mode="write"
              @click.prevent="toggleView"
            >
              Write
            </button>
          </li>
          <li>
            <button
              :class="`toggle-button ${mode === 'preview' ? 'active' : null}`"
              type="button"
              data-mode="preview"
              @click.prevent="toggleView"
            >
              Preview
            </button>
          </li>
        </ul>
        <textarea
          v-if="mode === 'write'"
          class="styled-text-area"
          name="solution"
          placeholder="Add your solution"
          @blur="handleBlur"
          @focus="handleFocus"
          v-model="solution"
        />
        <div v-if="mode === 'preview'" class="solution-preview" v-html="solutionHtml"/>
        <div class="form-footer">
          <a
            href="https://guides.github.com/features/mastering-markdown/"
            target="_blank"
            rel="noopener noreferrer"
          >
            You can write your solution in Markdown!
          </a>
          <button class="white-button" type="submit">Submit</button>
        </div>
      </div>
      <p v-else class="message">Sign in to submit a solution!</p>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
import marked from 'marked';
import { mapState } from 'vuex';
import ErrorMessage from './ErrorMessage';

export default {
  name: 'SolutionForm',
  components: {
    ErrorMessage,
  },
  props: {
    challenge: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      solution: '',
      mode: 'write',
      error: null,
    };
  },
  computed: {
    ...mapState(['solutions', 'user']),
    solutionHtml() {
      return marked(this.solution);
    },
  },
  methods: {
    async saveSolution() {
      await this.solutions.ref.push({
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        content: this.solution,
        submittedBy: this.user.id,
      });
      firebase
        .database()
        .ref(`challenges/${this.challenge.id}/numSolutions`)
        .set(this.challenge.numSolutions + 1);
    },
    handleSubmit() {
      if (this.solution.trim() !== '') {
        this.saveSolution();
      } else {
        this.error = 'Please enter a solution!';
      }
    },
    handleFocus(event) {
      event.target.classList.add('active');
    },
    handleBlur(event) {
      event.target.classList.remove('active');
    },
    toggleView(event) {
      this.mode = event.target.dataset.mode;
    },
  },
};
</script>

<style lang="scss" scoped>
.styled-text-area {
  border: none;
  border-radius: 0 4px 4px;
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
  display: block;
  font-family: monospace, monospace; /* stylelint-disable-line font-family-no-duplicate-names */
  font-size: 0.9rem;
  line-height: 1.3;
  min-height: 8rem;
  outline: none;
  padding: 1rem;
  width: 100%;

  &.active {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
}

.sticky-wrapper {
  position: sticky;
  top: 20px;
}

.form-footer {
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  a {
    color: #fff;
    font-size: 0.9rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.solution-preview {
  background: #fff;
  border-radius: 0 4px 4px;
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
  display: block;
  font-size: 0.9rem;
  line-height: 1.3;
  min-height: 8rem;
  padding: 1rem;
  width: 100%;
}

.toggle-buttons {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding-left: 0;

  li {
    border-radius: 0 4px 0 0;
    font-size: 0.8rem;
    overflow: hidden;

    &:first-child {
      border-radius: 4px 0 0;
    }
  }
}

.toggle-button {
  background: #fff;
  border: none;
  border-radius: 0;
  min-width: 70px;
  opacity: 0.5;
  outline: none;
  padding: 0.6rem;

  &.active {
    opacity: 1;

    &:hover {
      cursor: default;
      opacity: 1;
    }
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}

.white-button {
  background: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #00bcd4;
  cursor: pointer;
  display: block;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.025em;
  padding: 0.5rem 0.625rem;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
}

</style>
