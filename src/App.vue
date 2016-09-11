<template>
  <div class="body">
    <explorer class="explorer" name="explorer" v-ref:explorer></explorer>
    <editor class="editor" v-ref:editor></editor>
  </div>
</template>

<script>
import Explorer from './components/Explorer.vue'
import Editor from './components/Editor.vue'

export default {
  components: {Explorer, Editor}
}
</script>

<style lang="sass" scoped>
  .body {
    display: flex;
    height: 100%;
    align-items: stretch;
    font-family: Helvetica, Arial, Sans-Serif;
  }

  .explorer {
    flex: 0 0 250px;
  }

  .editor {
    height: 100%;
    flex: 0 0 80%;
  }
</style>