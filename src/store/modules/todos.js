import axios from 'axios'

const state = {
  todos: []
}

const getters = {
  allTodos: state => state.todos,
  todosOfList: state => listId => state.todos.filter(todo => todo.list === listId),
  mainTodos: (state, getters, rootState, rootGetters) => state.todos.filter(todo => todo.list === rootGetters.mainList._id),
  completedTodos: state => state.todos.filter(todo => todo.done)
}

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get('/api/tasks')
    commit('setTodos', response.data)
  },
  async addTodo({ commit }, newTodo) {
    const response = await axios.post('/api/tasks', newTodo)
    commit('newTodo', response.data)
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`/api/tasks/${id}`)
    commit('removeTodo', id)
  },
  async updateTodo({ commit }, updatedTodo) {
    await axios.put(`/api/tasks/${updatedTodo._id}`, updatedTodo)
    commit('updateTodo', updatedTodo)
  },
  async moveToMainList({ commit, rootGetters }, todo) {
    const updatedTodo = {
      ...todo,
      list: rootGetters.mainList._id
    }
    await axios.put(`/api/tasks/${updatedTodo._id}`, updatedTodo)
    commit('updateTodo', updatedTodo)
  }
}

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.push(todo),
  removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo._id !== id),
  updateTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex(todo => todo._id === updatedTodo._id)
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}