<template>
    <div>
        <Header/>
        <div class="container">
            <div class="row align-items-stretch">
                <div class="col-md-6 d-flex justify-content-start align-items-begin">
                    <h3 class="mt-3">체크아웃 요청 승인</h3>
                </div>
                <div class="col-md-6 d-flex justify-content-end align-items-begin">
                    <button class="btn btn-primary mt-3">저장</button>
                </div>
            </div>

            <hr>

            <table class="table table-bordered mz-">
                <tr class="submenu">
                    <th>체크아웃 요청ID</th>
                    <th>사용자ID</th>
                    <th>체크아웃 요청 날짜</th>
                    <th>체크아웃 상태</th>
                    <!-- 체크아웃 상태는 INPROGRESS, ACCEPTED나 REJECTED 중 택1 -->
                </tr>

                <tbody>
                    <tr v-for="room in rooms"
                        :key="room.coutId" align="center">
                        <td>{{room.coutId}}</td>
                        <td>{{room.uId}}</td>
                        <td>{{room.coutDate}}</td>
                        <!-- <td :class="coutRooms.coutStatus" @click="toggleStatus(coutRoom)" @click.stop>
                            {{coutRoom.rStatus ? 'Maintenance' : 'Available'}}
                        </td> -->
                        <td>
                            <div>
                                <input type="radio" v-model="room.approvalStatus" value="ACCEPTED">
                                ACCEPTED
                            </div>
                            <div>
                                <input type="radio" v-model="room.approvalStatus" value="REJECTED">
                                REJECTED
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';
import {ref} from 'vue';
// import {useRouter} from 'vue-router'
import axios from '@/axios';
// import Datepicker from './Datepicker.vue';

export default {
    components : {
        Header
    },
    setup(){
        console.log(">>>>>> setup");
        const rooms = ref([]);

        const getCheckoutRooms = async () => {
            console.log("happy");
            try {
                const response = await axios.get('rooms');
                rooms.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }
        getCheckoutRooms();

        const handleDateChange = (dates) => {
            this.checkInDate = dates.checkInDate;
            this.checkOutDate = dates.checkOutDate;
        }

        return {
            rooms,
            handleDateChange
        }
        

    }

}
</script>

<style>
    .submenu th{
        line-height: 40px;          /* 텍스트 한 줄의 높이 설정 */
        text-align: center;         /* 텍스트를 가운데로 정렬 */
    }
    .coutAuthorize{
        display: flex;
        justify-content: right;
        align-items: right;
    }
</style>