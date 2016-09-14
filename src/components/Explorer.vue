<template>
  <div class="folders">
    <ul>
      <li v-for="item in items" v-on:click="load(item.$loki)" :class="item.$loki === currentId ? 'selected' : ''">
        <a href="#" v-on:click="deleteFile(item.$loki)">
          <i class="fa fa-trash"></i>
        </a>
        <span>{{item.title}}</span>
      </li>
      <li><a href="#" class="add" v-on:click="create"><i class="fa fa-plus"></i></a></li>
    </ul>
  </div>
</template>

<script>
import Config from '../Config.js'
import EventBus from '../common/EventBus.js'
import Files from '../common/Files.js'

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
      Files.listAll((data) => {
        this.items = data
        console.log(data)
        if (!this.currentId && this.items && this.items.length > 0) {
          this.currentId = this.items[0].$loki
        }
      })
    }
  },

  created () {
    EventBus.$on('saved', (id) => {
      this.reloadItems()
      this.currentId = id
    })

    EventBus.$on('deleted', (id) => {
      if (this.currentId === id) this.currentId = 0
      this.reloadItems()
    })

    this.reloadItems()
  },

  data () {
    return {
      items : null,
      currentId : null
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
        width: 100%;
        text-align: center;
      }
      &:hover {
        background-color: rgba( $dark-grey, .2);
        border-radius: 5px 0 0 5px;
      }
      &.selected {
        z-index: 10;
        color: $white;
        background-color: $dark-grey;
        border-radius: 5px 0 0 5px;
        box-shadow: $box-shadow;
      }
    }
  }
</style>