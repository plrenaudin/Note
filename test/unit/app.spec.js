/* global beforeAll, describe, it, expect */

import Vue from 'vue'
import App from '../../src/App.vue'

describe('App.vue', () => {
  var vm;
  beforeAll(() => {
    vm = new Vue({
      render: h => h('app'),
      components: { App }
    }).$mount()
  });
  it('should render the explorer', () => {
    expect(vm.$el.querySelectorAll('.explorer li').length).toBe(1)
  })
  it('should render the editor title input', () => {
    expect(vm.$el.querySelectorAll('input.titleInput').length).toBe(1)
  })
  it('should render the editor', () => {
    expect(vm.$el.querySelectorAll('.editorContent').length).toBe(1)
  })
})
