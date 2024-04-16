<template>
    <Header/>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h3 class="mb-2 mt-2">객실 상태 변경</h3>
            </div>
            <div class="col-md-6 d-flex justify-content-end align-items-end">
                <button class="btn btn-primary">저장</button>
            </div>
        </div>
        <hr>

        <table class="table table-bordered mz-">
            <!-- <caption>프로필 테이블</caption> -->
            
            

            <tr class="submenu">
                <th>객실ID</th>
                <th>객실등급ID</th>
                <th>객실 비밀번호</th>
                <th>객실 상태</th>
            </tr> 

            <tbody v-for="room in rooms"
                    :key="room.rId">
                <tr align="center">
                    <td>{{room.rId}}</td>
                    <td>{{room.rgId}}</td>
                    <td>{{room.rPwd}}</td>
                    <td :class="rooms.rStatus"
                        @click="toggleSatus(room)"
                        @click.stop>
                        {{room.rStatus ? 'Maintenance' : 'Available'}}
                    </td>
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
import axios from '@/axios';
import Header from './Header.vue';

export default {    
    components : {
        Header
    },
    setup () {
        console.log(">>>>>> setup");
        const searchText = ref('');
        const rooms = ref([]);

        const getRooms = async () => {
            console.log("happy");
            try {
                const response = await axios.get('rooms');
                rooms.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        getRooms();

        const toggleSatus = (room) => {
            room.rStatus = !room.rStatus;
        }

        return {
            searchText,
            toggleSatus,
            rooms,
            getRooms
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