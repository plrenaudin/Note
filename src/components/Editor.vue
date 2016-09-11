<template>
  <div class="editorContainer">
    <toolbar></toolbar>
    <input type="hidden" v-model="file.id" />
    <input type="text" class="titleInput" v-model="file.title" />
    <textarea class="editor" v-model="file.content"></textarea>
  </div>
</template>

<script>
import Toolbar from './Toolbar.vue'
import File from '../common/Files.js'
import EventBus from '../common/EventBus.js'

export default {
  components: { Toolbar },

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
    }
  },

  created () {
    EventBus.$on('bold', () => {this.file.content += 'bold'})
    EventBus.$on('italic', () => {this.file.content += 'Italic'})
    EventBus.$on('quote', () => {this.file.content += 'Quote'})
    EventBus.$on('title', () => {this.file.content += 'Title'})
    EventBus.$on('create', () => {this.create()})
    EventBus.$on('save', () => {this.save()})
    EventBus.$on('load', (id) => {this.load(id)})
    EventBus.$on('delete', (id) => {this.deleteFile(id)})
  },

  data () {
    return File.openFirst()
  },

}
</script>

<style scoped>
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