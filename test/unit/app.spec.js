/* global beforeAll, describe, it, expect */

import Vue from 'vue'
import App from '../../src/App.vue'

describe('App.vue', () => {
  var vm;
  beforeAll(() => {
    vm = new Vue({
      template: '<div><app></app></div>',
      components: { App }
    }).$mount()
  });
  it('should render the explorer', () => {
    expect(vm.$el.querySelector('.explorer ul li').textContent).toBe('Add')
  })
  it('should render the editor title input', () => {
    expect(vm.$el.querySelectorAll('.editor input.titleInput').length).toBe(1)
  })
  it('should render the editor textarea', () => {
    expect(vm.$el.querySelectorAll('.editor textarea').length).toBe(1)
  })
})
