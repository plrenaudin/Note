<template>
  <div class="folders">
    <ul>
      <li v-for="item in items" v-on:click="load(item.file.id)" v-bind:class="item.file.id === currentId ? 'selected' : ''">
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
      this.currentId = id
    },
    deleteFile(id) {
      EventBus.$emit('delete', id)
    },
    create () {
      EventBus.$emit('create')
    },
    reloadItems() {
      this.items = JSON.parse(localStorage.getItem(Config.STORAGE_KEY))
      if (this.currentId === 0) this.currentId = this.items[0].file.id
    }
  },

  created () {
    EventBus.$on('saved', (id) => {
      this.reloadItems();
      this.currentId = id
    })
    EventBus.$on('deleted', (id) => {
      if (this.currentId=== id) this.currentId = 0
      this.reloadItems()
    })
    this.reloadItems()
  },

  data () {
    return {
      items : this.items,
      currentId : 0
    }
  }
}
</script>

<style lang="sass" scoped>
  ul {
    list-style-type: none;
    li {
      cursor: pointer;
      &.selected {
        font-weight: bold;
      }
    }
  }
</style>
