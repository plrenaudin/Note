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
  }

  .explorer {
    width: 250px;
  }

  .editor {
    flex-grow: 1;
    height: 100%;
  }
</style>