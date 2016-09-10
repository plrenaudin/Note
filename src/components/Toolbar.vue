<template>
  <div class="toolbar">
    <ul>
      <li v-for="action in actions" v-on:click="dispatch(action)">
        {{ action }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      actions:['Bold','Italic','Title','Quote','Save']
    }
  },
  methods: {
    dispatch (action) {
      this.$dispatch(action);
    }
  }
}
</script>

<style lang="sass" scoped>
  ul {
    list-style-type: none;
    display: flex;
    li {
      margin: 0 5px;
      cursor: pointer;
    }
  }
</style>