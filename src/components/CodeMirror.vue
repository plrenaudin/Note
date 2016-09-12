<template>
  <div>

  </div>
</template>

<script>
import EventBus from '../common/EventBus.js'
import * as CodeMirror from 'codemirror'
import gfm from '../../node_modules/codemirror/mode/gfm/gfm.js'
const codeTag = '\n```\n'
export default {
  props: ['model'],

  ready () {
    this.$nextTick(this.initCodeMirror);
  },

  methods: {
    initCodeMirror: function() {
      var vm = this

      vm.cm = CodeMirror.default(vm.$el, {
          mode: 'gfm',
          theme: 'monokai',
          lineNumbers:true,
          matchBrackets: true,
          lineWrapping: true,
          extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
      });
      vm.cm.on('change', function() {
          vm.$set('model.content', vm.cm.getValue())
      });

      // Set the initial value
      vm.cm.setValue(vm.model.content)
      vm.cm.idFileEdit = vm.model.id
      vm.cm.clearHistory()

      this.$watch('model', function(value) {
        if (value.content !== vm.cm.getValue()) {
          vm.cm.setValue(value.content)
        }
        if (!vm.cm.idFileEdit || value.id !== vm.cm.idFileEdit) {
          vm.cm.clearHistory()
          vm.cm.idFileEdit = value.id
        }
      });

      document.addEventListener("paste", this.onPaste, true);
    },

    onPaste (e) {
      e.preventDefault()
      let pastedText = e.clipboardData.getData('Text')
      this.cm.replaceSelection(codeTag + pastedText + codeTag)
      console.log('paste', pastedText)
    }
  }
}
</script>

<style>
  @import url('../../node_modules/codemirror/lib/codemirror.css');
  @import url('../../node_modules/codemirror/theme/monokai.css');
  .CodeMirror {
    min-height: 80vh;
  }
</style>