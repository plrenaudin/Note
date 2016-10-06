<template>
  <div class="editorComponent">
    <div class="editorContainer">
      <input type="hidden" v-model="file.$loki" />
      <input type="text" class="titleInput" v-model="file.title" @keydown="listenOnKeyDown($event)" />
      <codemirror class="editorContent" :model="file" ref="cm" @keydown="listenOnKeyDown($event)"></codemirror>
    </div>
    <div class="preview">
      <h1 class="title">Markdown Preview</h1>
      <div v-html="preview"></div>
    </div>
  </div>
</template>

<script>
import Files from '../common/Files.js'
import Config from '../Config.js'
import EventBus from '../common/EventBus.js'
import CodeMirror from './CodeMirror.js'
import Highlight from 'highlight.js'
import marked from 'marked'

export default {
  components: { 'codemirror': CodeMirror },
  computed: {
    preview() {
      return marked(this.file.content)
    }
  },
  methods: {
    create() {
      let me = this
      Files.create((createdFile) => {
        me.file = createdFile
        EventBus.$emit('saved', me.file.$loki)
      })
    },

    save () {
      let me = this
      Files.save(me.file, (savedFile) => {
        me.file = savedFile
        EventBus.$emit('saved', me.file.$loki)
      })
    },

    load (id) {
      let me = this
      Files.load(id, (loaded) => {
        me.file = loaded
        me.$refs.cm.focus()
      })
    },

    deleteFile (id) {
      let me = this, 
        loadFirst = me.file.$loki === id
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
      console.log('keydown')
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(this.save, Config.SAVE_INTERVAL_MS)
      // ctrl+s shortcut
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
      this.create()
    }
  },

  beforeCreate () {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight (code) {
        return Highlight.highlightAuto(code).value
      }
    })
  },

  created () {
    this.$nextTick(this.initEditor);
  },

  data () {
    return {file:{title:'',content:''}}
  },

  filters: {
    marked
  }
}
</script>

<style lang="sass">
  @import '../common/styles.scss';
  @import url('../../node_modules/highlight.js/styles/monokai.css');
  @import url('../../node_modules/codemirror/theme/monokai.css');
  @import url('../../node_modules/codemirror/lib/codemirror.css');
  .CodeMirror {
    flex: 1;
    padding: 10px;
    height: inherit !important;
  }
  .editorComponent{
    display: flex;
    flex-direction: row;
    flex: 1;
  }
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
    text-align: center;
    font-style: italic;
  }

  .preview {
    flex: 1;
    overflow: auto;
    padding: 0 5px;
    .title {
      text-align: center;
      font-weight: 100;
      font-style: italic;
      color: $dark-grey;
      font-size: 1.5em;
    }
    pre {
      padding: 10px;
      color: $white;
      white-space: pre-wrap;
      background-color: $dark-grey;
    }
  }
</style>