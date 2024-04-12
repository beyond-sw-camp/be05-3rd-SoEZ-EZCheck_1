<template>
  <Header/>
  <!-- <form>
  
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="userId" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1">User Id</label>
  </div>


  <div data-mdb-input-init class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Password</label>
  </div>  -->

  <form @submit.prevent="signIn">
    <!-- Id input -->
    <div class="form-outline mb-4">
      <input type="text" v-model="userId" class="form-control" />
      <label class="form-label">User Id</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <input type="password" v-model="password" class="form-control" />
      <label class="form-label">Password</label>
    </div>

  <!-- 2 column grid layout for inline styling -->
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <!-- Checkbox -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

    <div class="col">
      <!-- Simple link -->
      <a href="#!">Forgot password?</a>
    </div>
  </div>

  <!-- Submit button 
  <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Sign in</button>
-->
<button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>


  <!-- Register buttons -->
  <div class="text-center">
    <p>Not a member? <a href="#!">Register</a></p>
    <p>or sign up with:</p>
    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button>

    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-google"></i>
    </button>

    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-twitter"></i>
    </button>

    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-github"></i>
    </button>
  </div>
</form>
</template>

<script>
import Header from './Header.vue';
import axios from '@/axios';

export default {
  components: { Header },
  name : "LoginComponent",
  data() {
    return {
      userId: '',
      password: ''
    };
  },
  methods: {
    async signIn() {
      try {
        const response = await axios.post('user/signin', {
          userId: this.userId,
          password: this.password
        });
        // 로그인 성공 시 처리
        console.log('로그인 성공:', response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.push('/'); // 메인 페이지 경로로 변경
      } catch (error) {
        // 로그인 실패 시 처리
        console.error('로그인 실패:', error);
      }
    }
  }
}
</script>

<style>

</style>