<template>
    <layout-div>
        <h2 class="text-center mt-5 mb-3">Create New Task</h2>
        <div class="card">
            <div class="card-header">
                <router-link class="btn btn-outline-info float-right" to="/">View All Tasks
                </router-link>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label>Title</label>
                        <input v-model="Task.title" type="text" class="form-control" />
                        <span class="text-danger" v-if="errors.title">{{ errors.title[0] }}</span>
                    </div>
                    <br>
                    <div class="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea v-model="Task.description" class="form-control" rows="3"></textarea>
                        <span class="text-danger" v-if="errors.description">{{ errors.description[0] }}</span>
                    </div>
                    <div class="form-group">
                        <label>Date</label>
                        <input v-model="Task.date" type="date" class="form-control" />
                        <span class="text-danger" v-if="errors.date">{{ errors.date[0] }}</span>
                    </div>
                    <button @click="handleSave()" :disabled="disabled" type="button" class="btn btn-outline-primary mt-3">
                        Save Task
                    </button>
                </form>
            </div>
        </div>
    </layout-div>
</template>
   
<script>
import LayoutDiv from '../../components/Layouts.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
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
            errors: {},
            disabled: false,
            token: JSON.parse(localStorage.getItem('token'))
        };
    },
    methods: {
        handleSave() {
            this.isSaving = true
            const config = {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                },
            };
            axios.post('https://task.electroniqueclasse.com/api/task', this.Task, config)
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
                    this.disabled = true
                    this.errors = error.response.data.errors;
                });
        },
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
};
</script>