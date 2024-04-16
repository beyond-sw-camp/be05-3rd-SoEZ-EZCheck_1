<template>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h2 class="mb-2 mt-3">관리자 페이지</h2>
        </div>
        <AdminHeader/>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
// import Datepicker from './Datepicker.vue';
import AdminHeader from './AdminHeader.vue';

export default {
    components : {
        AdminHeader
    },
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
</style>