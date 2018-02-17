<template>
  <div id="app">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'App',
  components: {
    'app-header': Header,
  },
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  background: #f5f7f9;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: 'Roboto Slab', serif;
}

p {
  margin-bottom: 0;
}

button,
input,
textarea {
  font-family: inherit;
}

strong {
  font-weight: 600;
}

pre {
  background: #f7f8f9;
  border-radius: 5px;
  color: #424770;
  line-height: normal;
  margin-bottom: 0;
  overflow-x: auto;
  padding: 11px 14px;
  position: relative;
}

code {
  background: #f7f8f9;
  border-radius: 5px;
  color: #424770;
}

code .token {
  margin: 0;
  padding: 0;
}

code .token:not(.script) {
  font-weight: 400;
}

code .token.property {
  font-weight: 500;
}

code .token.atrule,
code .token.keyword {
  color: #6772e5;
}

code .token.boolean,
code .token.builtin,
code .token.class-name,
code .token.constant,
code .token.namespace {
  color: #2191ef;
  font-weight: 600;
}

code.language-markup .token.namespace,
code .token.attr-name,
code .token.selector,
code .token.tag,
code .token.tag * {
  color: #0075d6;
}

code .token.atrule,
code .token.keyword,
code .token.tag {
  font-weight: 600;
}

code .token.attr-name {
  font-style: italic;
}

code .token.comment {
  color: #91a2b0;
  font-weight: 400;
}

code.language-url,
code .token.function,
code .token.url {
  color: #3297d3;
  font-weight: 600;
}

code .token.number {
  color: #fa755a;
}

code .token.header {
  font-weight: 700;
}

code .token.curl,
code .token.option,
code .token.variable {
  color: teal;
  font-weight: 600;
}

code .token.curl,
code .token.option {
  font-weight: 500;
}

code.language-css .property,
code .token.parameter,
code .token.symbol {
  color: #d14;
  font-weight: 500;
}

code.language-html .token.attr-value > .punctuation:not(:first-child),
code.language-markup .token.attr-value > .punctuation:not(:first-child),
code .token.attr-value,
code .token.macro,
code .token.regex,
code .token.string,
code .token.stripe,
code .token.value {
  color: #159570;
  font-weight: 400;
}

code .token.macro .keyword {
  color: #064508;
}

code .token.publishable-key,
code .token.secret-key {
  background: #eceff1;
  border-radius: 3px;
  margin: -2px;
  padding: 2px;
}

code .token.publishable-key.enabled,
code .token.secret-key.enabled {
  background: #dfe3e6;
}

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

form {
  background: linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6);
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
  margin-bottom: 1.5rem;
  padding: 1.5rem;
}

.message {
  color: #fff;
  font-size: 1.5rem;
  margin: 0.475rem 0;
  text-align: center;
}

</style>
