<template>
  <div class="folders">
    <ul>
      <li v-for="item in items" v-on:click="load(item.file.id)" :class="item.file.id === currentId ? 'selected' : ''">
        <a href="#" v-on:click="deleteFile(item.file.id)">
          X
        </a>
        <span>{{item.file.title}}</span>
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
    margin-top: 60px;
    list-style-type: none;
    li {
      cursor: pointer;
      padding: 5px 10px;
      text-align: right;
      span {
        display: inline-block;
        width: 80%;
      }
      &.selected {
        font-weight: bold;
      }
    }
  }
</style>
