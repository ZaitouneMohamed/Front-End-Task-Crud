<template>
    <layout-div>
        <h2 class="text-center mt-5 mb-3">Create New Task</h2>
        <div class="card">
            <div class="card-header">
                <router-link class="btn btn-outline-info float-right" to="/">View All Tasks
                </router-link>
            </div>
            <div class="card-body">
                {{ Task }}
                <form>
                    <div class="form-group">
                        <label>Title</label>
                        <input v-model="Task.title" type="text" class="form-control" />
                        
                    </div>
                    <div class="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea v-model="Task.description" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Date</label>
                        <input v-model="Task.date" type="date" class="form-control" />
                    </div>
                    <button @click="handleSave()" :disabled="isSaving" type="button" class="btn btn-outline-primary mt-3">
                        Save Task
                    </button>
                </form>
            </div>
        </div>
    </layout-div>
</template>
   
<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import LayoutDiv from '../../components/Layouts.vue';
import Swal from 'sweetalert2'

export default {
    name: 'CreateTask',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            Task: {
                title: '',
                description: '',
                date: null,
            },
            isSaving: false,
        };
    },
    methods: {
        handleSave() {
            this.isSaving = true
            axios.post('https://task.electroniqueclasse.com/api/task', this.Task)
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Task Create With Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.isSaving = false
                    this.Task.title = ""
                    this.Task.date = ""
                    this.Task.description = ""
                    this.$router.push({ path: `/` });
                })
                .catch(error => {
                    this.isSaving = false
                    Swal.fire({
                        icon: 'error',
                        title: error,
                        showConfirmButton: false,
                        timer: 4500
                    })
                    return error
                });
        },
    },
};
</script>