<template>
  <div>
    <Header />
  <div class="my-page">
    <h1>My Page</h1>
    <div class="navigation">
      <!-- 네비게이션 링크, 선택적으로 router-link 사용 가능 -->
      <button button type="button" class="btn btn-outline-secondary" @click="getUserInfo = 'info'">내 정보</button>
      <button button type="button" class="btn btn-outline-secondary" @click="selectedTab = 'reservations'">내 예약 목록</button>
    </div>

    <!-- 선택된 탭에 따라 다른 컴포넌트를 표시 -->
    <div v-if="selectedTab === 'info'">
      <p>내 정보 컴포넌트가 여기에 표시됩니다.</p>
    </div>
    <div v-if="selectedTab === 'reservations'">
      <MyReservations />
    </div>
  </div>
  </div>
  
</template>




<script>
import Header from './Header.vue';
import MyReservations from './MyReservations.vue';
export default {
  name: 'MyPage',
  components: {
    Header,
    MyReservations
  },
  data() {
    return {
      selectedTab: 'reservations'  // 기본적으로 예약 목록 탭을 선택
    };
  },
  mounted() {
    // 예약 데이터를 불러오는 로직, API 호출 등을 여기에 추가
    this.fetchReservations();
  },
  methods: {
    fetchReservations() {
      // API 호출을 통해 예약 데이터 불러오기
      // 예시: this.reservations = [{ id: 1, description: '호텔 예약', date: '2024-04-20' }];
      // 실제 API 호출로 대체해야 함
    }
  }
}
</script>

<style scoped>
.my-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navigation button {
  margin: 5px;
}

.reservation-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>