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
import Config from '../Config.js'
import File from '../common/Files.js'
export default {
  components: { Toolbar },

  methods: {
    create() {
      this.file = File.create().file
      this.save()
    },

    save () {
      File.save(this.file)
      this.$dispatch('Saved')
    },

    load (id) {
      this.file = File.load(id).file
    },

    deleteFile (id) {
      File.deleteFile(id)
      if(this.file.id === id) {
        this.file = File.openFirst().file
      }
      this.$dispatch('Deleted')
    }
  },

  data () {
    return File.openFirst()
  },

  events: {
    'Bold' () {
      this.content += 'bold'
    },
    'Italic' () {
      this.content += 'italic'
    },
    'Quote' () {
      this.content += 'quote'
    },
    'Title' () {
      this.content += 'title'
    },
    'Save' () {
      this.save()
    }
  }
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