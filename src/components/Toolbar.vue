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
import EventBus from '../common/EventBus.js'
export default {

  data () {
    return {
      actions:['Bold','Italic','Title','Quote','Save']
    }
  },
  methods: {
    dispatch (action) {
      EventBus.$emit(action.toLowerCase());
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