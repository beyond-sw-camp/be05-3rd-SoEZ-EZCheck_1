<template>
  <Header/>
  <main>
      <!-- 날짜 선택 섹션 -->
      <section>
        <Datepicker/>
      </section>

      <!-- 사용 가능한 방 타입 표시 섹션 -->
      <section>
        <RoomList :checkInDate="checkInDate" :checkOutDate="checkOutDate" />
      </section>
    </main>
</template>

<script>
import Header from './Header.vue';
import Datepicker from './Datepicker.vue';
import RoomList from './RoomList.vue';

export default {
    name : "AvailableRoom",
  components: { Header, Datepicker, RoomList },
    
    data() {
    return {
      checkInDate: null,
      checkOutDate: null,
    };
  },
}
</script>

<style>

</style>