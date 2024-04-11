<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!-- Home 항목 항상 표시 -->
      <a class="navbar-brand" href="/">Home</a>

      <!-- 햄버거 메뉴 버튼, 오른쪽 정렬 -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 햄버거 메뉴 내부 -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <!-- 로그인 전: Login과 Signup 표시 -->
          <li class="nav-item" v-if="!isLoggedIn">
            <a class="nav-link" href="/Login">Login</a>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <a class="nav-link" href="/Signup">Signup</a>
          </li>

          <!-- 로그인 후: MyPage 표시 -->
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link" href="/MyPage">MyPage</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/AvailableRoom">AvailableRooms</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    name : 'HeaderComponent',
    data () {
        return {
            isLoggedIn: false, // 로그인 상태 초기값은 false
        };
    },
}
</script>

<style>
    Navbar {
        margin : 0;
        padding : 0;
    }
</style>