<template>
    <div class="my-reservations">
        <h2>내 예약 목록</h2>
        <div v-if="reservations.length">
            <div class="reservation" v-for="reservation in reservations" :key="'reservation-' + reservation.rvId">
                <h3>예약 ID: {{ reservation.rvId }}</h3>
                <p>사용자 ID: {{ reservation.users.uid }}</p>
                <p>예약 시작 날짜: {{ formatDate(reservation.rvDateFrom) }}</p>
                <p>예약 종료 날짜: {{ formatDate(reservation.rvDateTo) }}</p>
                <p>방 등급: {{ reservation.roomGrade.roomGradeEnum }}</p>
                <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#modal-' + reservation.rvId" @click="showModal(reservation)">
                    체크인
                </button>
            </div>
        </div>
        <p v-else>예약 목록이 없습니다.</p>
        <div v-for="reservation in reservations" :key="'modal-' + reservation.rvId" :id="'modal-' + reservation.rvId" class="modal fade" tabindex="-1" aria-labelledby="'modalLabel-' + reservation.rvId" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ reservation.roomGrade.roomGradeEnum }} 방 목록</h5>
                    </div>
                    <div class="modal-body">
                        <div v-for="room in filteredRooms" :key="'room-' + room.rid">
                            <p>Room Id: {{ room.rid }} - {{ room.roomGrade.roomGradeEnum }} - {{ room.roomStatusEnum }}</p>
                            <input type="text" v-model="room.roomPwd" placeholder="비밀번호 4자리" maxlength="4" class="form-control mb-2">
                            <button type="button" class="btn btn-success" @click="checkInRoom(room, reservation.rvId)">
                                체크인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from '@/axios';

export default {
    name: "MyReservationsComponent",
    data() {
        return {
            reservations: [],
            rooms: [],
            filteredRooms: []
        };
    },
    methods: {
        fetchReservations() {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                alert("로그인이 필요합니다.");
                this.$router.push('/login');
                return;
            }

            const requestDTO = { uId: userId };

            axios.post('/reservation/myReservations', requestDTO, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                this.reservations = response.data;
            })
            .catch(error => {
                console.error('예약 목록을 불러오는 데 실패했습니다:', error);
            });
        },
        showModal(reservation) {
            axios.get(`/checkIn/reservations/available`, { params: { rId: reservation.rvId } })
                .then(response => {
                    this.rooms = response.data;
                    this.filteredRooms = [];
                    for (let i = 0; i < this.rooms.length; i++) {
                    if (this.rooms[i].roomGrade.roomGradeEnum === reservation.roomGrade.roomGradeEnum) {
                        this.filteredRooms.push(this.rooms[i]);
                    }    
                }
                console.log(this.filteredRooms);
                })
                .catch(error => {
                    console.error('가능한 방 목록을 불러오는 데 실패했습니다:', error);
                });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
        checkInRoom(room, rvId) {
        const checkInRequest = {
            userId: localStorage.getItem('userId'), // 사용자 ID
            rvId: rvId, // 예약 ID
            roomId: room.rid, // 방 ID
            roomPwd: room.roomPwd, // 입력된 방 비밀번호
            rgId: room.roomGrade.rgId // 방 등급 ID
        };

        if (!room.roomPwd || room.roomPwd.length < 4) {
            alert("비밀번호 4자리를 입력해주세요.");
            return;
        }

        axios.post('/checkIn/pcheckIn', checkInRequest, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            alert('체크인이 완료되었습니다: ' + response.data);
            // 체크인 후 모달 닫기 및 필드 초기화
            room.roomPwd = ''; // 비밀번호 필드 초기화
        })
        .catch(error => {
            console.error('체크인 요청 실패:', error);
            alert('체크인 실패: ' + error.response.data);
        });
    }
    },
    mounted() {
        this.fetchReservations();
    }
}
</script>
<style scoped>
.my-reservations .reservation {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
}
</style>

  