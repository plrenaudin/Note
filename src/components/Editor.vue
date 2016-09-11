<template>
  <div class="editorContainer">
    <input type="hidden" v-model="file.id" />
    <input type="text" class="titleInput" v-model="file.title" />
    <codemirror class="editorContent" v-ref:cm :model.sync="file"></codemirror>
  </div>
</template>

<script>
import File from '../common/Files.js'
import EventBus from '../common/EventBus.js'
import CodeMirror from './CodeMirror.vue'

export default {
  components: { 'codemirror': CodeMirror },

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

    listenOnKeyDown (e) {
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault()
        this.save()
      }
    },

    initEditor () {
      EventBus.$on('create', () => {this.create()})
      EventBus.$on('save', () => {this.save()})
      EventBus.$on('load', (id) => {this.load(id)})
      EventBus.$on('delete', (id) => {this.deleteFile(id)})
      document.addEventListener("keydown", this.listenOnKeyDown, false)
    }

  },

  ready () {
    this.$nextTick(this.initEditor);
  },

  data () {
    return File.openFirst()
  }
}
</script>

<style lang="sass" scoped>
  @import '../common/styles.scss';
  .editorContainer {
    display: flex;
    flex-direction: column;
  }

  .editorContent {
    background-color: $dark-grey;
    box-shadow: 0 2px 5px 0 $orange;
  }

  .titleInput {
    background-color: inherit;
    border:none;
    padding: 7px 0;
    font-size: 1.5em;
    height: 26px;
    margin: 10px 0;
  }
</style>