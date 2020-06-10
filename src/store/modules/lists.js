
import axios from 'axios'

const state = {
  lists: [],
  mainList: {}
}

const getters = {
  allLists: state => state.lists,
  customLists: state => state.lists.filter(list => list.isMain === false),
  mainList: state => state.mainList,
  currentList: state => listId => state.lists.find(list => list._id === listId)
}

const actions = {
  async fetchLists({ commit }) {
    const response = await axios.get('/api/lists')
    commit('setLists', response.data)
    const mainList = response.data.find(list => list.isMain)
    commit('setMainList', mainList)
  },
  async createList({ commit }, title) {
    const response = await axios.post('/api/lists', { title, isMain: false })
    commit('addList', response.data)
  },
  async deleteList({ commit }, id) {
    await axios.delete(`/api/lists/${id}`)
    commit('removeList', id)
  },
  async updateList({ commit }, updatedList) {
    await axios.put(`/api/lists/${updatedList._id}`, updatedList)
    commit('updateList', updatedList)
  }
}

const mutations = {
  setLists: (state, lists) => (state.lists = lists),
  setMainList: (state, list) => (state.mainList = list),
  addList: (state, newList) => (state.lists = [...state.lists, newList]),
  removeList: (state, id) => state.lists = state.lists.filter(list => list._id !== id),
  updateList: (state, updatedList) => {
    const index = state.lists.findIndex(list => list._id === updatedList._id)
    if (index !== -1) {
      state.lists.splice(index, 1, updatedList)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}