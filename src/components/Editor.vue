<template>
  <div class="editorContainer">
    <input type="hidden" v-model="file.$loki" />
    <input type="text" class="titleInput" v-model="file.title" @keydown="listenOnKeyDown($event)" />
    <codemirror class="editorContent" :model.sync="file" v-ref:cm @keydown="listenOnKeyDown($event)"></codemirror>
  </div>
  <div class="preview" v-html="file.content | marked"></div>
</template>

<script>
import Files from '../common/Files.js'
import Config from '../Config.js'
import EventBus from '../common/EventBus.js'
import CodeMirror from './CodeMirror.vue'
import Highlight from 'highlight.js'
import marked from 'marked'

export default {
  components: { 'codemirror': CodeMirror },

  methods: {
    create() {
      Files.create((createdFile) => {
        this.file = createdFile
        EventBus.$emit('saved', this.file.$loki)
      })
    },

    save () {
      Files.save(this.file, (savedFile) => {
        this.file = savedFile
        EventBus.$emit('saved', this.file.$loki)
      })
    },

    load (id) {
      Files.load(id, (loaded) => {
        this.file = loaded
        this.$refs.cm.focus()
      })
    },

    deleteFile (id) {
      let loadFirst = this.file.$loki === id
      Files.deleteFile(id, () => {
        if(loadFirst) {
          Files.openFirst((first) => {
            this.file = first
            EventBus.$emit('select', first.$loki)
          })
        } else {
          EventBus.$emit('reloadFiles')
        }
      });
    },

    listenOnKeyDown (e) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(this.save, Config.SAVE_INTERVAL_MS)
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        if (this.timer) clearTimeout(this.timer)
        e.preventDefault()
        this.save()
      }
    },

    initEditor () {
      EventBus.$on('create', () => {this.create()})
      EventBus.$on('save', () => {this.save()})
      EventBus.$on('load', (id) => {this.load(id)})
      EventBus.$on('delete', (id) => {this.deleteFile(id)})
      this.create();
    }
  },

  init () {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight (code) {
        return Highlight.highlightAuto(code).value
      }
    })
  },

  ready () {
    this.$nextTick(this.initEditor);
  },

  data () {
    return {file:{title:'',content:''}}
  },

  filters: {
    marked: marked
  }
}
</script>

<style lang="sass">
  @import '../common/styles.scss';
  @import url('../../node_modules/highlight.js/styles/monokai.css');
  .editorContainer {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .editorContent {
    background-color: $dark-grey;
    box-shadow: $box-shadow;
    flex: 1;
    display: flex;
    align-items: stretch;
  }

  .titleInput {
    background-color: inherit;
    border: none;
    padding: 7px 0;
    font-size: 1.5em;
    height: 26px;
    margin: 10px 0;
  }

  .preview {
    margin-top: 50px;
    flex: 1;
    overflow: auto;
    padding: 5px;
    pre {
      padding: 10px;
      color: $white;
      white-space: pre-wrap;
      background-color: $dark-grey;
    }
  }
</style>