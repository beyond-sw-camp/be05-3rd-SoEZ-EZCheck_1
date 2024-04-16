<template>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h2 class="mb-4 mt-4 border">관리자 페이지</h2>
        </div>
        <div class="row">
            <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">객실 상태 관리</h5>
                        <p class="card-text">객실 상태 변경 메뉴</p>
                        <button class="btn btn-primary" @click="gotoAdminRoomStatus">바로가기</button>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">체크아웃 관리</h5>
                        <p class="card-text">체크아웃 요청 승인 관리</p>
                        <button class="btn btn-primary" @click="gotoAdminCheckOut">바로가기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';


export default {
    setup () {
        const router = useRouter();

        const gotoAdminRoomStatus = () => {
            try {
                router.push({
                    name: 'AdminRoomStatusChange'
                });
            } catch (error) {
                console.error('Error navigating to AdminRoomStatusChange:', error);
            }
        };

        const gotoAdminCheckOut = () => {
            try {
                router.push({
                    name: 'AdminCheckout'
                });
            } catch (error) {
                console.error('Error navigating to AdminCheckout:', error);
            }
        };

        return {
            gotoAdminRoomStatus,
            gotoAdminCheckOut
        }
    }
}
</script>

<style>
.border {
    border-bottom: 10px solid #dee2e6;
}
</style>