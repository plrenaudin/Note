<template>
  <div class="folders">
    <ul>
      <li v-for="item in items" v-on:click="load(item.file.id)" :class="item.file.id === currentId ? 'selected' : ''">
        <a href="#" v-on:click="deleteFile(item.file.id)">
          <i class="fa fa-trash"></i>
        </a>
        <span>{{item.file.title}}</span>
      </li>
      <li><a href="#" class="add" v-on:click="create"><i class="fa fa-plus"></i></a></li>
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

      if (this.currentId === 0) this.currentId = this.items ? this.items[0].file.id : ''
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
  @import '../common/styles.scss';
  ul {
    margin-top: 60px;
    list-style-type: none;
    position: relative;
    li {
      cursor: pointer;
      padding: 10px;
      text-align: right;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: inline-block;
        width: 80%;
      }
      .add {
        width:100%;
        text-align: center;
      }
      &:hover {
        background-color: $grey;
        border-radius: 5px 0 0 5px;
      }
      &.selected {
        z-index: 10;
        color: $white;
        background-color: $dark-grey;
        border-radius: 5px 0 0 5px;
        box-shadow: 0 2px 5px 0 $orange;
      }
    }
  }
</style>
