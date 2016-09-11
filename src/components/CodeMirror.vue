<template>
  <div>

  </div>
</template>

<script>
import EventBus from '../common/EventBus.js'
import * as CodeMirror from 'codemirror'
import gfm from '../../node_modules/codemirror/mode/gfm/gfm.js'
import * as Highlight from 'highlight.js'
export default {
  props: ['model'],

  ready () {
    this.$nextTick(this.initCodeMirror);
  },

  methods: {
    initCodeMirror: function() {
      var vm = this

      var cm = CodeMirror.default(vm.$el, {
          mode: 'gfm',
          theme: 'monokai',
          lineNumbers:true,
          matchBrackets: true,
          lineWrapping: true,
          extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
      });
      cm.on('change', function() {
          vm.$set('model.content', cm.getValue())
      });

      // Set the initial value
      cm.setValue(vm.model.content)
      cm.idFileEdit = vm.model.id
      cm.clearHistory()

      this.$watch('model', function(value) {
        if (value.content !== cm.getValue()) {
          cm.setValue(value.content)
        }
        if (!cm.idFileEdit || value.id !== cm.idFileEdit) {
          cm.clearHistory()
          cm.idFileEdit = value.id
        }
      });

      document.addEventListener("paste", this.onPaste, false);
    },

    onPaste (e) {
      var pastedText = e.clipboardData.getData('Text')
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