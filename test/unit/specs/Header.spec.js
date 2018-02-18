import Vue from 'vue';
import Header from '@/components/Header';

describe('Header.vue', () => {
  test.skip('should render correct contents', () => {
    const Constructor = Vue.extend(Header);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.wordmark').textContent)
      .toEqual('Codework');
  });
});
