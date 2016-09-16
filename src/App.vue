<template>
  <div class="body">
    <explorer class="explorer" name="explorer" v-ref:explorer></explorer>
    <editor v-ref:editor></editor>
  </div>
</template>

<script>
import Explorer from './components/Explorer.vue'
import Editor from './components/Editor.vue'

export default {
  components: {Explorer, Editor}
}
</script>

<style lang="sass">
  @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css');
  @import './common/styles.scss';
  html,body { height: 100%; margin: 0px; padding: 0px; }
  .body {
    display: flex;
    background-color: $white;
    align-items: stretch;
    font-family: Helvetica, Arial, Sans-Serif;
  }
  a {
    text-decoration:none;
    color: $blue;
  }
  .explorer {
    flex: 0 0 250px;
  }

  .editor {
    height: 100%;
    flex: 0 0 80%;
  }
</style>