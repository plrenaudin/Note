/* global beforeAll, describe, it, expect */

import Vue from 'vue'
import Toolbar from '../../src/components/Toolbar.vue'

describe('Toolbar.vue', () => {
  var vm;
  beforeAll(() => {
    vm = new Vue({
      template: '<div><toolbar></toolbar></div>',
      components: { Toolbar }
    }).$mount()
  });

  it('should render the list', () => {
    expect(vm.$el.querySelectorAll('li').length).toBe(5)
  })
})
