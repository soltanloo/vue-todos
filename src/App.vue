<template>
  <div id="app" class="page-container md-layout-row">
    <md-app>
      <md-app-toolbar class="md-accent">
        <h3>Todos</h3>

        <div class="md-toolbar-section-end">
          <router-link to="/completed">
            <md-button>Show Completed Tasks</md-button>
          </router-link>
        </div>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-list>
          <md-list-item style="margin-top: auto;">
            <md-field>
              <label>Create a New List</label>
              <md-input placeholder="New List" v-model="newList"></md-input>
            </md-field>
            <md-button class="md-raised md-primary" @click="createNewList">Create</md-button>
          </md-list-item>
          <md-divider></md-divider>
          <md-list-item exact :to="{path: '/'}">
            <span class="md-list-item-text">Daily Tasks</span>
          </md-list-item>
          <md-list-item :to="{path: `/list/${list._id}`}" v-bind:key="list._id" v-for="list in customLists">
            <span class="md-list-item-text">{{list.title}}</span>
            <md-button @click.prevent="openEditDialog(list)" class="md-icon-button md-list-action">
              <md-icon>edit</md-icon>
            </md-button>
            <md-button @click.prevent="remove(list._id)" class="md-icon-button md-list-action md-accent">
              <md-icon>delete</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Edit List Name</md-dialog-title>
      <md-field>
        <md-input v-model="editingListTitle"></md-input>
      </md-field>
      <md-dialog-actions>
        <md-button class="md-primary" @click="submitEdit">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      newList: '',
      showDialog: false,
      editingList: null,
      editingListTitle: '',
      editingListID: ''
    }
  },
  methods: {
    ...mapActions(['fetchLists', 'fetchTodos', 'createList', 'updateList', 'deleteList']),
    createNewList() {
      this.createList(this.newList)
      this.newList = ''
    },
    openEditDialog(list) {
      this.showDialog = true
      this.editingList = list
      this.editingListTitle = list.title
      this.editingListID = list._id
    },
    submitEdit() {
      this.showDialog = false
      const updatedList = {
        ...this.editingList,
        title: this.editingListTitle
      }
      this.updateList(updatedList)
      this.editingListTitle = ''
      this.editingListID = ''
    },
    remove(listId) {
      this.deleteList(listId)
    }
  },
  computed: {
    ...mapGetters(['customLists']),
    showAddForm() {
      return true
    }
  },
  created() {
    this.fetchLists()
    this.fetchTodos()
  }
}
</script>

<style lang="scss" scoped>

  #app {
    min-height: 100vh;
  }

  .md-app {
    height: 100vh;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: auto;
    max-width: calc(100vw - 125px);
  }

  .md-list-item-text {
    font-weight: bold;
  }

  .md-dialog .md-field {
    margin: 10px;
    width: auto;
  }

  .md-dialog-title {
    margin-bottom: 0;
  }
</style>
