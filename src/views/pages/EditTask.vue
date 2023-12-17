<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Edit Task</h2>
    <div class="card">
      <div class="card-header">
        <router-link class="btn btn-outline-info float-right" to="/">View All Tasks
        </router-link>
      </div>
      <div class="card-body" v-if="Task.is_owner">
        <form>
          <div class="form-group">
            <label>Title</label>
            <input v-model="Task.task.title" type="text" class="form-control" />
            <span class="text-danger" v-if="errors.title">{{ errors.title[0] }}</span>
          </div>
          <div class="form-group">
            <label htmlFor="description">Description</label>
            <textarea v-model="Task.task.description" class="form-control" rows="3"></textarea>
            <span class="text-danger" v-if="errors.description">{{ errors.description[0] }}</span>
          </div>
          <div class="form-group">
            <label>Date</label>
            <input v-model="Task.task.date" type="date" class="form-control" />
            <span class="text-danger" v-if="errors.date">{{ errors.date[0] }}</span>
          </div>
          <button @click="handleSave()" :disabled="disabled" type="button" class="btn btn-outline-primary mt-3">
            Save Task
          </button>
        </form>
      </div>
      <div class="card-body" v-else>
        <h1 className="text-center">This Task Is Not Your </h1>
      </div>
    </div>
  </layout-div>
</template>
  
<script>
import axios from 'axios';
import LayoutDiv from '../../components/Layouts.vue';
import Swal from 'sweetalert2'

export default {
  name: 'TaskEdit',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      Task: {},
      errors: {},
      token: JSON.parse(localStorage.getItem('token')),
      disabled: false,
    };
  },
  created() {
    const id = this.$route.params.id;
    const config = {
      headers: {
        "Authorization": `Bearer ${this.token}`
      },
    };
    axios.get(`https://task.electroniqueclasse.com/api/task/${id}`, config)
      .then(response => {
        this.Task = response.data,
        console.log(response.data);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occured!',
          showConfirmButton: false,
          timer: 1500
        })
        return error
      })
  },
  watch: {
    Task: {
      handler() {
        this.errors = {};
        this.disabled = false;
      },
      deep: true,
    },
  },
  methods: {
    handleSave() {
      this.isSaving = true
      const id = this.$route.params.id;
      const config = {
        headers: {
          "Authorization": `Bearer ${this.token}`
        },
      };
      axios.put(`https://task.electroniqueclasse.com/api/task/${id}`, this.Task.task, config)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Task updated successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.disabled = false
          this.Task.title = ""
          this.Task.date = ""
          this.Task.description = ""
          this.$router.push({ path: `/` });
        })
        .catch(error => {
          this.disabled = true
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>