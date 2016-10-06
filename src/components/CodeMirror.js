import Vue from 'vue'
import EventBus from '../common/EventBus.js'
import * as CodeMirror from 'codemirror'
import gfm from '../../node_modules/codemirror/mode/gfm/gfm.js'
const codeTag = '\n```\n'

export default Vue.component('codemirror', {
  props: ['model'],

  render: h => h('div'),

  created() {
    this.$nextTick(this.initCodeMirror);
  },

  methods: {
    initCodeMirror: function () {
      var vm = this

      vm.cm = CodeMirror.default(vm.$el, {
        mode: 'gfm',
        theme: 'monokai',
        matchBrackets: true,
        lineWrapping: true,
        extraKeys: { "Enter": "newlineAndIndentContinueMarkdownList" }
      });
      vm.cm.on('change', function () {
        vm.$set(vm.model, 'content', vm.cm.getValue())
      });

      // Set the initial value
      vm.cm.setValue(vm.model.content)
      vm.idFileEdit = vm.model.$loki
      vm.cm.clearHistory()

      this.$watch('model', function (value) {
        if (value.content !== vm.cm.getValue()) {
          vm.cm.setValue(value.content)
        }
        if (!vm.idFileEdit || value.$loki !== vm.idFileEdit) {
          vm.cm.clearHistory()
          vm.idFileEdit = value.$loki
        }
      });

      this.$el.addEventListener("paste", this.onPaste, true);
      this.focus()
    },

    focus() {
      this.cm.focus()
    },

    onPaste(e) {
      e.preventDefault()
      let pastedText = e.clipboardData.getData('Text')
      if (pastedText && pastedText.trim()) {
        this.cm.replaceSelection(codeTag + pastedText + codeTag)
      }
    }
  }
})