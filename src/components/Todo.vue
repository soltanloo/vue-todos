<template>
  <div>
    <md-card :md-with-hover="!todo.done">
        <md-card-area md-inset>
          <md-card-header>
            <div class="md-title">{{ todo.title }}</div>
            <div class="md-subhead"><span id="cal-icon"><md-icon>event</md-icon></span>{{ todo.date.substring(0, 10) }}</div>
          </md-card-header>

          <md-card-content v-if="todo.description">
            {{ todo.description }}
          </md-card-content>
        </md-card-area>

        <md-card-actions>
          <md-button md-theme="red-button" v-if="todo.done" @click="markUndone" class="md-icon-button md-dense md-primary md-raised">
            <md-tooltip md-direction="top">Mark Undone</md-tooltip>
            <md-icon>undo</md-icon>
          </md-button>
          <md-button md-theme="green-button" v-else @click="markDone" class="md-icon-button md-dense md-primary md-raised">
            <md-tooltip md-direction="top">Mark Done</md-tooltip>
            <md-icon>done</md-icon>
          </md-button>
          <md-button @click="openEditDialog" class="md-icon-button md-dense">
            <md-tooltip md-direction="top">Edit</md-tooltip>
            <md-icon>edit</md-icon>
          </md-button>
          <md-button v-if="!inMainList" @click="move" class="md-icon-button md-dense">
            <md-tooltip md-direction="top">Move to Daily Tasks</md-tooltip>
            <md-icon>present_to_all</md-icon>
          </md-button>
          <md-button @click="remove" class="md-icon-button md-dense md-accent">
            <md-tooltip md-direction="top">Remove</md-tooltip>
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
      <md-dialog :md-active.sync="showDialog">
        <AddTodo :todo="todo" :isEdit="true" @closeDialog="closeEditDialog()"/>
      </md-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import AddTodo from './AddTodo'


export default {
  name: 'Todo',
  props: ['todo', 'inMainList'],
  components: {
    AddTodo
  },
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    ...mapActions(['deleteTodo', 'updateTodo', 'moveToMainList']),
    markDone() {
      const updated = {
        ...this.todo,
        done: true
      }
      this.updateTodo(updated)
    },
    markUndone() {
      const updated = {
        ...this.todo,
        done: false
      }
      this.updateTodo(updated)
    },
    openEditDialog() {
      this.showDialog = true
    },
    closeEditDialog() {
      this.showDialog = false
    },
    move() {
      this.moveToMainList(this.todo)
    },
    remove() {
      this.deleteTodo(this.todo._id)
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";
  @include md-register-theme("green-button", (
    primary: md-get-palette-color(green, 300)
  ));
  @import "~vue-material/dist/components/MdIcon/theme";
  @import "~vue-material/dist/components/MdButton/theme";
  @import "~vue-material/dist/components/MdTooltip/theme";

  @include md-register-theme("red-button", (
    primary: md-get-palette-color(red, 300),
  ));

  @import "~vue-material/dist/components/MdIcon/theme";
  @import "~vue-material/dist/components/MdButton/theme";
  @import "~vue-material/dist/components/MdTooltip/theme";

  .md-card {
    min-width: 200px;
    height: fit-content;
    max-width: 300px;
    overflow-wrap: break-word;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 8px 8px;
  }
  .md-card-area {
    flex-grow: 1;
  }
  .md-card-actions {
    justify-content: center;
  }
  #cal-icon {
    margin-right: 5px;
  }
  #cal-icon .md-icon {
    height: 20px;
  }
</style>