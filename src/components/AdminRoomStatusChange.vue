<template>
    <Header/>
    <div class="container">
        <div class="row align-items-stretch">
            <div class="col-md-6 d-flex justify-content-start align-items-begin">
                <h3 class="mt-3">객실 상태 변경</h3>
            </div>
            <div class="col-md-6 d-flex justify-content-end align-items-begin">
                <button class="btn btn-primary mt-3"
                        @click="saveChangedStatus">저장</button>
            </div>
        </div>
        <hr>

        <table class="table table-bordered mz-">
            <!-- <caption>프로필 테이블</caption> -->
            
            

            <tr class="submenu">
                <th>선택</th>
                <th>객실ID</th>
                <th>객실등급ID</th>
                <th>객실 비밀번호</th>
                <th>객실 상태</th>
            </tr> 

            <tbody>
                <tr v-for="room in rooms" :key="room.rId" align="center">
                    <td>
                        <input  type="checkbox" 
                                @click="selectRooms(room)">
                    </td>
                    <td>{{ room.rid }}</td>
                    <td>{{ room.roomGrade.roomGradeEnum }}</td>
                    <td>{{ room.rpwd }}</td>
                    <td>{{ room.roomStatusEnum }}</td>
                </tr>
            </tbody>
        </table>
        
        


        <div class="error"> <!-- 에러라는 데이터 바인딩 -->
            {{ error }}
        </div>

    </div>
</template>

<script>
import {ref} from 'vue';
// import {useRouter} from 'vue-router'
import axios from 'axios';
import Header from './Header.vue';

export default {    
    components : {
        Header
    },
    setup () {
        console.log(">>>>>> setup");
        const rooms = ref([]);
        const selectedRoomIds = ref([]);

        const getRooms = async () => {
            try {
                console.log(">>>>>> getRooms", rooms);
                const response = await axios.get('http://localhost:8080/room/allRooms');
                rooms.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }
        getRooms();


        const selectRooms = (room) => {
            if (!selectedRoomIds.value.includes(room.rid)) {
                selectedRoomIds.value.push(room.rid);
            } else {
                const index = selectedRoomIds.value.indexOf(room.rid);
                selectedRoomIds.value.splice(index, 1);
            }
        }

        const saveChangedStatus = async () => {
            try {
                // 선택된 방들의 ID를 이용하여 각 방의 상태를 변경
                await Promise.all(selectedRoomIds.value.map(roomId => axios.get(`http://localhost:8080/room/updateRoomStatus/${roomId}`)));
                window.alert('저장되었습니다.');
                window.location.reload();
            } catch (error) {
                console.error(error);
                window.alert("오류! 저장되지 않았습니다.");
            } 
        }

        // const saveChangedStatus = async () => {
        //     try {
        //         // 선택된 방들의 ID를 이용하여 각 방의 상태를 가져옴
        //         const roomStatusPromises = selectedRoomIds.value.map(roomId => axios.get(`http://localhost:8080/room/getRoomStatus/${roomId}`));
        //         const roomStatusResponses = await Promise.all(roomStatusPromises);
        //         const roomStatuses = roomStatusResponses.map(response => response.data);

        //         // 선택된 방들의 현재 상태를 확인하여 변동사항이 있는지 체크
        //         const changedRooms = selectedRoomIds.value.filter((roomId, index) => roomStatuses[index] !== rooms.value.find(room => room.rid === roomId).roomStatusEnum);

        //         if (changedRooms.length === 0) {
        //             // 변동사항이 없는 경우
        //             window.alert('변동사항이 없습니다.');
        //         } else {
        //             // 변동사항이 있는 경우에만 변경된 상태를 저장
        //             await Promise.all(changedRooms.map(roomId => axios.get(`http://localhost:8080/room/updateRoomStatus/${roomId}`)));
        //             window.alert('변경사항이 저장되었습니다.');
        //         }
        //     } catch (error) {
        //         console.error(error);
        //         window.alert("오류! 저장되지 않았습니다.");
        //     } 
        // }

        return {
            selectRooms,
            rooms,
            getRooms,
            saveChangedStatus
        }
    }

}
</script>


<style>
    .no-border {
        border: none;
    }
    .work{
        color: olive;
        text-decoration: line-through;
    }
    
    .submenu th{
        line-height: 40px;          /* 텍스트 한 줄의 높이 설정 */
        text-align: center;         /* 텍스트를 가운데로 정렬 */
        /* list-style-type: none; */
        /* float: left;                왼쪽으로 나열되도록 설정 */
        /* scroll-snap-align: middle;     세로 정렬을 가운데로 설정 */
        /* position: relative; */
        /* margin-right: 25%;     li간 간격 조절 */
    }
    .text-right  {
        float: right;
    }
</style>