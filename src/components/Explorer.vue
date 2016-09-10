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

  export default {
    methods: {
      select(id) {
        alert('selected',id);
      },
      load(id) {
        this.$dispatch('Load', id)
      },
      deleteFile(id) {
        this.$dispatch('Delete', id)
      },
      create () {
        this.$dispatch('Create')
      },
      reloadItems() {
        this.items = JSON.parse(localStorage.getItem(Config.STORAGE_KEY))
      }
    },
    data () {
      this.reloadItems()
      return {
        items : this.items
      }
    },
    events: {
      'Saved' () {
        this.reloadItems()
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
