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
import axios from '@/axios';

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
    },
    methods : {
    bookRoom(roomType) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('로그인이 필요합니다');
        this.$router.push('/login');
        return;
      }
      const rgId = roomType === 'SUPERIOR' ? 1 :
                 roomType === 'DELUXE' ? 2 :
                 roomType === 'SUITE' ? 3 : null;
      let reservationRequest = {
        uId: userId, // This should be dynamically set based on the logged-in user
        rgId: rgId, // Map roomType to rgId if necessary
        rvDateFrom: this.checkInDate,
        rvDateTo: this.checkOutDate
      };

      axios.post('/reservation/make', reservationRequest, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
            .then(response => {
              alert('Room booked successfully!');
              console.log(response.data);
            })
            .catch(error => {
              console.error('Error booking the room:', error);
              alert('Failed to book the room.');
            });

          }
          }
}
</script>

<style>
    
</style>