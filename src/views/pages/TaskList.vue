<template>
    <layout-div>
        <div class="container">
            <h2 class="text-center mt-5 mb-3">Task List</h2>
            <div class="card">
                <div class="card-header row">
                    <div class="col-4">
                        <router-link to="/create" class="btn btn-outline-primary">Create New Task
                        </router-link>
                    </div>
                    <div class="col-4">
                        <div class="row">
                            <div class="col-6">
                                <select v-model="filter.status" id="" class="form-control">
                                    <option value="">Filter By Status</option>
                                    <option value="">All</option>
                                    <option value="0">Pending</option>
                                    <option value="1">Completed</option>
                                </select>
                                {{ filter }}
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <button class="btn btn-danger">Log Out</button>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>title</th>
                                <th>Description</th>
                                <th>status</th>
                                <th>added by</th>
                                <th>date</th>
                                <th width="240px">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tasks.data" :key="item.id">
                                <td>{{ item.title }}</td>
                                <td>{{ item.description }}</td>
                                <td>
                                    <div v-if="item.status == 0">
                                        <span class="badge bg-danger">Pending</span>
                                    </div>
                                    <div v-else>
                                        <span class="badge bg-success">Completed</span>
                                    </div>
                                </td>
                                <td>{{ item.user.name }}</td>
                                <td>{{ item.date }}</td>
                                <td>
                                    <div v-if="item.is_owner">
                                        <router-link :to="`/show/${item.id}`"
                                            class="btn btn-outline-info mx-1">Show</router-link>
                                        <router-link :to="`/edit/${item.id}`"
                                            class="btn btn-outline-success mx-1">Edit</router-link>
                                        <button @click="handleDelete(item.id)" className="btn btn-outline-danger mx-1">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Bootstrap5Pagination :data="tasks" @pagination-change-page="fetchTaskList" />
                </div>
            </div>
        </div>
    </layout-div>
</template>
   
<script>
import axios from 'axios';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import LayoutDiv from '../../components/Layouts.vue';
import Swal from 'sweetalert2'

export default {
    name: 'TaskList',
    components: {
        LayoutDiv,
        Bootstrap5Pagination
    },
    data() {
        return {
            tasks: [],
            token: JSON.parse(localStorage.getItem('token')),
            filter: {
                status: '',
            }

        };
    },
    created() {
        this.fetchTaskList();
    },
    watch: {
        filter: {
            handler() {
                this.fetchTaskList();
            },
            deep: true,
        },
    },
    methods: {
        fetchTaskList(page = 1) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                },
            };

            // Convert filter object to query string if there are filter parameters
            const filterParams = Object.keys(this.filter)
                .map(key => this.filter[key] !== '' ? `${key}=${this.filter[key]}` : '')
                .filter(Boolean)
                .join('&');

            // Include filterParams in the URL if present
            const apiUrl = filterParams ? `https://task.electroniqueclasse.com/api/task?page=${page}&${filterParams}` :
                `https://task.electroniqueclasse.com/api/task?page=${page}`;

            axios.get(apiUrl, config)
                .then(response => {
                    if (response.data) {
                        this.tasks = response.data;
                    } else {
                        this.tasks = [];
                    }
                })
                .catch(error => {
                    // Handle the error appropriately
                    console.error(error);
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
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${this.token}`
                        },
                    };
                    axios.delete(`https://task.electroniqueclasse.com/api/task/${id}`, config)
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