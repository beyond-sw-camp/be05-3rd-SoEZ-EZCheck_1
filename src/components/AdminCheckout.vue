<template>
    <div>
        <Header/>
        <div class="container">
            <div class="row align-items-stretch">
                <div class="col-md-6 d-flex justify-content-start align-items-begin">
                    <h3 class="mt-3">체크아웃 요청 승인</h3>
                </div>
                <!-- <div class="col-md-6 d-flex justify-content-end align-items-begin">
                    <button class="btn btn-primary mt-3"
                        @click="saveChangedStatus">저장</button>
                </div> -->
            </div>

            <hr>

            <table class="table table-bordered mz-">
                <tr class="submenu">
                    <th>체크아웃 요청ID</th>
                    <th>사용자ID</th>
                    <th>체크아웃 요청 날짜</th>
                    <th>체크아웃 상태</th>
                    <th>선택</th>
                    <!-- 체크아웃 상태는 INPROGRESS, ACCEPTED나 REJECTED 중 택1 -->
                </tr>

                <tbody>
                    <tr v-for="coutRoom in coutRooms"
                        :key="coutRoom.coutId" align="center">
                        <td>{{coutRoom.coutId}}</td>
                        <td>{{coutRoom.uid}}</td>
                        <td>{{coutRoom.coutDate}}</td>                        
                        <td>{{ coutRoom.checkOutStatusEnum }}</td>
                        <td>
                            <button  class="btn btn-primary"
                                    @click="approveCheckoutRequest(coutRoom.coutId)">승인</button>
                            <button  class="btn btn-danger" 
                                    @click="rejectCheckoutRequest(coutRoom.coutId)">거절</button>
                            <!-- <button  class="btn btn-primary"
                                    @click="selectRooms(coutRoom)">승인</button>
                            <button  class="btn btn-danger" 
                                    @click="selectRooms(coutRoom)">거절</button> -->
                        </td>

                        <!-- <td>
                            <div>
                                <input type="radio" v-model="coutRoom.approvalStatus" value="ACCEPTED">
                                ACCEPTED
                            </div>
                            <div>
                                <input type="radio" v-model="coutRoom.approvalStatus" value="REJECTED">
                                REJECTED
                            </div>
                        </td> -->
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
        const coutRooms = ref([]);
        // const selectedCheckoutRoomIds = ref([]);

        const getCheckoutRooms = async () => {
            try {
                console.log(">>>>>> getRooms", coutRooms);
                const response = await axios.get('http://localhost:8080/checkouts/all');
                coutRooms.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }
        getCheckoutRooms();

        const approveCheckoutRequest = async (coutId) => {
            try {
                await axios.get(`http://localhost:8080/checkouts/approve/${coutId}`);
                window.alert('승인되었습니다.');
                getCheckoutRooms();
            } catch (error) {
                console.error(error);
                window.alert("오류! 처리되지 않았습니다.");
                getCheckoutRooms();
            } 
        }

        const rejectCheckoutRequest = async (coutId) => {
            try {
                await axios.get(`http://localhost:8080/checkouts/reject/${coutId}`);
                window.alert('거절되었습니다.');
                getCheckoutRooms();
            } catch (error) {
                console.error(error);
                window.alert("오류! 처리되지 않았습니다.");
                getCheckoutRooms();
            } 
        }

        // const saveChangedStatus = async () => {
        //     try {
        //         // 선택된 방들의 ID를 이용하여 각 방의 상태를 변경
        //         await Promise.all(selectedCheckoutRoomIds.value.map(coutId => axios.get(`http://localhost:8080/checkouts/approve/${coutId}`)));
        //         window.alert('저장되었습니다.');
        //         window.location.reload();
        //     } catch (error) {
        //         console.error(error);
        //         window.alert("오류! 저장되지 않았습니다.");
        //     }
        // }

        return {
            coutRooms,
            approveCheckoutRequest,
            rejectCheckoutRequest
            // saveChangedStatus
        }







        // console.log(">>>>>> setup");
        // const coutRooms = ref([]);
        // const selectedCheckoutRoomIds = ref([]);

        // const getCheckoutRooms = async () => {
        //     console.log("happy");
        //     try {
        //         console.log(">>>>>> getRooms", coutRooms);
        //         const response = await axios.get('http://localhost:8080/checkouts/all');
        //         coutRooms.value = response.data;
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
        // getCheckoutRooms();
        // const selectRooms = (coutRoom) => {
        //     if (!selectedCheckoutRoomIds.value.includes(coutRoom.coutId)) {
        //         selectedCheckoutRoomIds.value.push(coutRoom.coutId);
        //     } else {
        //         const index = selectedCheckoutRoomIds.value.indexOf(coutRoom.coutId);
        //         selectedCheckoutRoomIds.value.splice(index, 1);
        //     }
        // }
        // const saveChangedStatus = async () => {
        //     try {
        //         // 선택된 방들의 ID를 이용하여 각 방의 상태를 변경
        //         await Promise.all(selectedCheckoutRoomIds.value.map(coutId => axios.get(`http://localhost:8080/checkouts/approve/${coutId}`)));
        //         window.alert('저장되었습니다.');
        //         window.location.reload();
        //     } catch (error) {
        //         console.error(error);
        //         window.alert("오류! 저장되지 않았습니다.");
        //     } 
        // }

        // return {
        //     coutRooms,
        //     selectRooms,
        //     saveChangedStatus
        // }
        

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