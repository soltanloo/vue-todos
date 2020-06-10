<template>
  <div>
    <AddTodo v-if="!completed" />
    <br>
    <md-empty-state
      v-if="!todos.length && !completed"
      class="md-primary"
      md-icon="done"
      :md-label="`No Tasks Remaining in '${curList && curList.title}'`"
      md-description="Add ore tasks to do">
    </md-empty-state>
    <div v-else class="todos">
      <Todo :todo="todo" :inMainList="isMain" :key="todo.id" v-for="todo in sortedTodos" :class="{ done: todo.done }" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Todo from './Todo'
import AddTodo from './AddTodo'

export default {
  name: 'TodoList',
  props: {
    isMain: Boolean,
    completed: {
      default: false,
      type: Boolean
    },
  },
  components: {
    Todo,
    AddTodo
  },
  methods: {
    ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
    onDblClick(todo) {
      const updatedTodo = {
        ...todo,
        done: !todo.done
      }
      this.updateTodo(updatedTodo)
    }
  },
  computed: {
    ...mapGetters(['todosOfList', 'mainTodos', 'currentList', 'mainList', 'completedTodos']),
    todos() {
      if (this.completed) return this.completedTodos
      else if(this.$route.params.id) return this.todosOfList(this.$route.params.id)
      else return this.mainTodos
    },
    curList() {
      if (this.completed) return this.mainList
      else if(this.$route.params.id) return this.currentList(this.$route.params.id)
      else return this.mainList
    },
    sortedTodos() {
      const todos = [...this.todos]
      return todos.sort((a, b) => {
        if (a.date >= b.date) return -1
        else return 1
      })
    }
  },
}
</script>

<style>
  .todos {
    display: flex;
    flex-wrap: wrap;
  }
  .done {
    opacity: 0.6;
  }
</style>