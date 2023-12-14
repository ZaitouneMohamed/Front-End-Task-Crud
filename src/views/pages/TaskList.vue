<template>
    <layout-div>
        <div class="container">
            <h2 class="text-center mt-5 mb-3">Task List</h2>
            <div class="card">
                <div class="card-header">
                    <router-link to="/create" class="btn btn-outline-primary">Create New Task
                    </router-link>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>title</th>
                                <th>Description</th>
                                <th>status</th>
                                <th>date</th>
                                <th width="240px">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="project in projects" :key="project.id">
                                <td>{{ project.title }}</td>
                                <td>{{ project.description }}</td>
                                <td>{{ project.status }}</td>
                                <td>{{ project.date }}</td>
                                <td>
                                    <router-link :to="`/show/${project.id}`"
                                        class="btn btn-outline-info mx-1">Show</router-link>
                                    <router-link :to="`/edit/${project.id}`"
                                        class="btn btn-outline-success mx-1">Edit</router-link>
                                    <button @click="handleDelete(project.id)" className="btn btn-outline-danger mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </layout-div>
</template>
   
<script>
import axios from 'axios';
import LayoutDiv from '../../components/Layouts.vue';
import Swal from 'sweetalert2'

export default {
    name: 'TaskList',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            projects: []
        };
    },
    created() {
        this.fetchTaskList();
    },
    methods: {
        fetchTaskList() {
            axios.get('https://task.electroniqueclasse.com/api/task')
                .then(response => {
                    this.projects = response.data;
                    return response
                })
                .catch(error => {
                    return error
                });
        },
        handleDelete(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`https://task.electroniqueclasse.com/api/task/${id}`)
                        .then(response => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Task deleted successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.fetchTaskList();
                            return response
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'An Error Occured!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            return error
                        });
                }
            })
        }
    },
};
</script>