<template>
  <div class="room-list">
    <h2>Available Rooms</h2>
    <div v-for="room in rooms" :key="room.type" class="room">
      <div class="room-details">
        <h3>{{ room.type }}</h3>
        <p>{{ room.description }}</p>
        <p>Price: {{ room.price }}</p>
      </div>
      <button @click="bookRoom(room.type)">Book Now</button>
    </div>
  </div>
</template>

<script>
export default {
    name : "RoomListComponent",
    props : {
        checkInDate: String,
        checkOutDate: String
    },
    data() {
        return {
            rooms : [
                { type: 'SUPERIOR', description: 'A cozy room with all the essentials.', price: '$100' },
                { type: 'DELUXE', description: 'Spacious room with luxurious amenities.', price: '$200' },
                { type: 'SUITE', description: 'An exquisite suite with premium features.', price: '$300' }
            ]
        }
    }
    // methods : {
    // bookRoom(roomType) {
    //   console.log(`Booking room: ${roomType}`);
    //   // 예약 로직을 추가하세요. 예를 들면, 예약 API를 호출하거나, 예약 페이지로 리디렉트할 수 있습니다.
    // }
    // }
}
</script>

<style>
    
</style>