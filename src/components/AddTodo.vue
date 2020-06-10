<template>
  <div>
    <form @submit.prevent="onSubmit">
      <md-card :class="{ 'no-margin': isEdit }">
        <md-card-header>
          <div v-if="isEdit" class="md-title">Edit Todo</div>
          <div v-else class="md-title">Add a New Todo</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="title">Title</label>
                <md-input required type="text" id="title" name="title" v-model="title" />
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-datepicker id="date" name="date" v-model="date" />
            </div>
            <div class="md-layout-item">
              <md-field multiline>
                <label for="description">Description</label>
                <md-input type="text" id="description" name="description" v-model="description" />
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button v-if="isEdit" type="submit" class="md-primary md-raised md-dense">Edit</md-button>
          <md-button v-else type="submit" class="md-primary md-raised md-dense">Add</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddTodo',
  props: {
    isEdit: {
      default: false,
      type: Boolean
    },
    todo: Object,
  },
  data() {
    return {
      title: '',
      description: '',
      date: new Date().toISOString().substring(0,10),
    }
  },
  computed: {
    ...mapGetters(['mainList']),
  },
  created() {
    if (this.isEdit) {
      this.title = this.todo.title
      this.description = this.todo.description
      this.date = this.todo.date.substring(0, 10)
    }
  },
  methods: {
    ...mapActions(['addTodo', 'updateTodo']),
    onSubmit() {
      if (this.isEdit) {
        const updatedTodo = {
          ...this.todo,
          title: this.title,
          description: this.description,
          date: this.date,
        }
        this.updateTodo(updatedTodo)
        this.$emit('closeDialog')
      } else {
        this.addTodo({
          title: this.title,
          description: this.description,
          date: (new Date(this.date)).toISOString() || (new Date()).toISOString(),
          done: false,
          list: this.$route.params.id || this.mainList._id
        })
      }
      this.title = ''
      this.description = ''
      this.date = new Date().toISOString().substring(0,10)
    }
  },
}
</script>

<style lang="scss" scoped>
  form {
    display: flex;
    justify-content: center;
  }

  .md-field {
    margin-bottom: 0;
  }

  .md-card-header {
    padding-bottom: 0;
  }

  .md-card {
    width: 100%;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .no-margin {
    margin: 0;
  }
</style>