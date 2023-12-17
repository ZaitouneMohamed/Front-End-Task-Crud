<template>
    <layout-div>

        <h2 class="text-center mt-5 mb-3">Register Form</h2>
        <div class="card">
            <div class="card-header">
                <router-link class="btn btn-outline-info float-right" to="/login">Login
                </router-link>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label>Name</label>
                        <input v-model="UserInfo.name" type="text" class="form-control" />
                        <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                    </div>
                    <br>
                    <div class="form-group">
                        <label>Email</label>
                        <input v-model="UserInfo.email" type="email" class="form-control" />
                        <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
                    </div>
                    <br>
                    <div class="form-group">
                        <label htmlFor="description">password</label>
                        <input v-model="UserInfo.password" type="password" class="form-control" />
                        <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
                    </div>
                    <button @click="handleSave()" :disabled="disabled" type="button" class="btn btn-outline-primary mt-3">
                        Register
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
name: 'LoginForm',
components: {
    LayoutDiv,
},
data() {
    return {
        UserInfo: {
            name: '',
            email: '',
            password: '',
        },
        errors: {},
        disabled: false,
    };
},
methods: {
    handleSave() {
        this.isSaving = true
        axios.post('https://task.electroniqueclasse.com/api/register', this.UserInfo)
            .then(response => {
                localStorage.setItem('token',JSON.stringify(response.data.token)),
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$router.push({ path: `/` });
            })
            .catch(error => {
                this.disabled = true
                this.errors = error.response.data.errors;
            });
    },
},
watch: {
    UserInfo: {
        handler() {
            this.errors = {};
            this.disabled = false;
        },
        deep: true,
    },
},
};
</script>