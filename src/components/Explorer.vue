<template>
  <div class="folders">
    <ul>
      <li v-for="item in items" v-on:click="load(item.file.id)">
        {{item.file.title}}
        <a href="#" v-on:click="deleteFile(item.file.id)">X</a>
      </li>
      <li><a href="#" v-on:click="create">Add</a></li>
    </ul>
  </div>
</template>

<script>
  import Config from '../Config.js'
  import EventBus from '../common/EventBus.js'

  export default {
    methods: {
      load(id) {
        EventBus.$emit('load', id)
      },
      deleteFile(id) {
        EventBus.$emit('delete', id)
      },
      create () {
        EventBus.$emit('create')
      },
      reloadItems() {
        this.items = JSON.parse(localStorage.getItem(Config.STORAGE_KEY))
      }
    },

    created () {
      EventBus.$on('saved', () => {this.reloadItems()})
      EventBus.$on('deleted', () => {this.reloadItems()})
      this.reloadItems()
    },

    data () {
      return {
        items : this.items
      }
    }
  }
</script>

<style lang="sass" scoped>
  ul {
    list-style-type: none;
    li {
      cursor: pointer;
    }
  }
</style>
