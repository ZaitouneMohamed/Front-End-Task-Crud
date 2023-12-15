<template>
    <layout-div>
        <h2 class="text-center mt-5 mb-3">Show Task</h2>
        <div class="card">
            <div class="card-header">
                <router-link class="btn btn-outline-info float-right" to="/">View All Tasks
                </router-link>
            </div>
            <div class="card-body">
                <b className="text-muted">Title :</b>
                <p>{{ Task.title }}</p>
                <b className="text-muted">Description :</b>
                <p>{{ Task.description }}</p>
                <b className="text-muted">date :</b>
                <p>{{ Task.date }}</p>
                <b className="text-muted">status :</b>
                <p>{{ Task.status }}</p>
            </div>
        </div>
    </layout-div>
</template>
  
<script>
import axios from 'axios';
import LayoutDiv from '../../components/Layouts.vue';
import Swal from 'sweetalert2'

export default {
    name: 'TaskShow',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            Task: {
                title: '',
                date: '',
                description: '',
                status: '',
            },
            isSaving: false,
            token: JSON.parse(localStorage.getItem('token'))
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
                this.Task = response.data
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
    methods: {

    },
};
</script>