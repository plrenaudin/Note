<template>
  <div class="editorContainer">
    <input type="hidden" v-model="file.id" />
    <input type="text" class="titleInput" v-model="file.title" />
    <codemirror class="editor" :model.sync="file.content"></codemirror>
  </div>
</template>

<script>
import File from '../common/Files.js'
import EventBus from '../common/EventBus.js'
import * as CodeMirror from 'codemirror'
import gfm from '../../node_modules/codemirror/mode/gfm/gfm.js'

export default {
  components: {
    codemirror: {
      replace: false,
      props: ['model'],
      ready: function () {
        this.$nextTick(this.initCodeMirror);
      },
      methods: {
        initCodeMirror: function() {
          var vm = this;

          var cm = CodeMirror.default(vm.$el, {
              mode: 'gfm',
              lineNumbers: true,
              extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
          });

          cm.on('change', function() {
              vm.$set('model', cm.getValue());
              // Add { silent: true }  as 3rd arg?
          });

          // Set the initial value
          cm.setValue(vm.model);

          this.$watch('model', function(value) {
              if (value !== cm.getValue())
                cm.setValue(value);
          });
        }
      }
    }
  },
  methods: {
    create() {
      this.file = File.create().file
      this.save()
    },

    save () {
      File.save(this.file)
      EventBus.$emit('saved', this.file.id)
    },

    load (id) {
      this.file = File.load(id).file
    },

    deleteFile (id) {
      File.deleteFile(id)
      if(this.file.id === id) {
        this.file = File.openFirst().file
      }
      EventBus.$emit('deleted', id)
    },

    listen(e) {
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault()
        this.save()
      }
    }
  },

  created () {
    EventBus.$on('create', () => {this.create()})
    EventBus.$on('save', () => {this.save()})
    EventBus.$on('load', (id) => {this.load(id)})
    EventBus.$on('delete', (id) => {this.deleteFile(id)})
  },

  attached () {
    document.addEventListener("keydown", this.listen, false);
  },

  data () {
    return File.openFirst()
  }
}
</script>

<style scoped>
  @import url('../../node_modules/codemirror/lib/codemirror.css');
  .editorContainer {
    display: flex;
    flex-direction: column;
  }

  .titleInput {
    height: 25px;
    margin: 10px 0;
  }

  .editor {
    flex-grow: 1;
    height: 100%;
  }
</style>