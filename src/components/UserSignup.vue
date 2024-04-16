<template>
    <Header />
    <div class="container">
        <form @submit.prevent="register">

            <div class="mb-2">
                <label class="form-label"><span class="">ID</span></label>
                <input type="text" class="form-control" v-model="user.userId" placeholder="ID를 입력하세요">
                <button class="btn btn-primary mt-2" @click="checkId">ID 중복확인</button>
                <div class="alert" :class="{ 'alert-success': isIdValid, 'alert-danger': !isIdValid }"
                    v-show="idCheckMessage">{{ idCheckMessage }}</div>
            </div>

            <div class="mb-2">
                <label class="form-label">비밀번호</label>
                <input type="password" class="form-control" v-model="user.password1" placeholder="비밀번호를 입력하세요">
            </div>

            <div class="mb-2">
                <label class="form-label">비밀번호 확인</label>
                <input type="password" class="form-control" v-model="passwordConfirm" placeholder="비밀번호 확인">
                <div class="alert alert-danger" v-show="!isPasswordMatch">비밀번호가 일치하지 않습니다.</div>
            </div>

            <div class="mb-2">
                <label class="form-label">이름</label>
                <input type="text" class="form-control" v-model="user.username" placeholder="이름을 입력하세요">
            </div>

            <div class="mb-2">
                <label class="form-label">전화번호</label>
                <input type="text" class="form-control" v-model="user.phone" placeholder="전화번호를 입력하세요">
            </div>

            <div class="mb-2">
                <label class="form-label">이메일</label>
                <input type="email" class="form-control" v-model="user.email" placeholder="이메일 주소를 입력하세요">
                <button class="btn btn-primary mt-2" @click="checkEmail">중복확인</button>
                <button class="btn btn-primary mt-2" @click="sendAuthEmail" v-if="isEmailValid">인증메일 발송</button>
                <div class="alert" :class="{ 'alert-success': isEmailValid, 'alert-danger': !isEmailValid }"
                    v-show="emailCheckMessage">{{ emailCheckMessage }}</div>
            </div>

            <div class="mb-2" v-if="isAuthEmailSent">
                <label class="form-label">인증코드</label>
                <input type="text" class="form-control" v-model="authCode">
                <button class="btn btn-primary" @click="checkAuthCode">인증확인</button>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="!isAllValid">가입요청</button>

        </form>
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <p>{{ modalMessage }}</p>
                <button class="close-button" @click="closeModal">닫기</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from '@/axios';
import Header from './Header.vue';
import { useRouter } from 'vue-router';

export default {
    components: { Header },
    name: 'UserSignup',
    setup() {
        const user = ref({
            userId: '',
            password1: '',
            username: '',
            phone: '',
            email: ''
        });
        const router = useRouter();
        const passwordConfirm = ref('')
        const authCode = ref('')
        const isIdValid = ref(false)
        const isEmailValid = ref(false)
        const isAuthCodeValid = ref(false)
        const isAuthEmailSent = ref(false)
        const showModal = ref(false)
        const modalMessage = ref('')
        const idCheckMessage = ref('')
        const emailCheckMessage = ref('')

        const isPasswordMatch = computed(() => {
            return user.value.password1 === passwordConfirm.value
        });

        const isAllValid = computed(() => {
            return isIdValid.value && isEmailValid.value && isAuthCodeValid.value && isPasswordMatch.value
        });

        const checkId = async () => {
            try {
                const response = await axios.post('http://localhost:8080/user/check-id', { userId: user.value.userId })
                if (user.value.userId != '' && response.data === false) {
                    isIdValid.value = true
                    idCheckMessage.value = '사용가능한 아이디 입니다.'
                    modalMessage.value = '사용가능한 아이디 입니다.'
                    console.log("modalMessage : ", modalMessage.value);
                    console.log("isIdValid : ", isIdValid.value);
                } else {
                    isIdValid.value = false
                    idCheckMessage.value = '이미 사용중인 아이디 입니다.'
                    modalMessage.value = '이미 사용중인 아이디 입니다.'
                    console.log("modalMessage : ", modalMessage.value);
                    console.log("isIdValid : ", isIdValid.value);
                }
                showModal.value = true
            }
            catch (error) {
                console.error(error)
            }
        };

        const checkEmail = async () => {
            try {
                const response = await axios.post('http://localhost:8080/user/check-email', { email: user.value.email })
                if (response.data === false) {
                    isEmailValid.value = true
                    emailCheckMessage.value = '사용가능한 이메일 입니다.'
                    modalMessage.value = '사용가능한 이메일 입니다.'
                    console.log("modalMessage : ", modalMessage.value);
                    console.log("isEmailValid : ", isEmailValid.value);
                } else {
                    isEmailValid.value = false
                    emailCheckMessage.value = '이미 사용중인 이메일 입니다.'
                    modalMessage.value = '이미 사용중인 이메일 입니다.'
                    console.log("modalMessage : ", modalMessage.value);
                    console.log("isEmailValid : ", isEmailValid.value);
                }
            }
            catch (error) {
                console.error(error)
            }

        };

        const sendAuthEmail = async () => {
            try {
                await axios.post('http://localhost:8080/user/auth/send', { email: user.value.email })
                isAuthEmailSent.value = true
            }
            catch (error) {
                console.error(error)
            }
        };

        const checkAuthCode = async () => {
            try {
                const response = await axios.post('http://localhost:8080/user/auth/check', { email: user.value.email, authCode: authCode.value })
                isAuthCodeValid.value = response.data
                if (isAuthCodeValid.value === true) {
                    modalMessage.value = '인증되었습니다.'
                    console.log("modalMessage : ", modalMessage.value);
                } else {
                    modalMessage.value = '인증코드가 일치하지 않습니다.'
                    console.log("modalMessage : ", modalMessage.value);
                }
            }
            catch (error) {
                console.error(error)
            }
        };

        const register = async () => {
            if (!isAllValid.value) return
            try {
                const response = await axios.post('http://localhost:8080/user/register', user.value)
                modalMessage.value = response.data
                window.alert(modalMessage.value)
                router.push('/')
            }
            catch (error) {
                console.error(error)
            }
        };

        const closeModal = () => {
            showModal.value = false
        };

        return {
            user,
            passwordConfirm,
            authCode,
            isIdValid,
            isEmailValid,
            isAuthCodeValid,
            isPasswordMatch,
            isAllValid,
            isAuthEmailSent,
            showModal,
            modalMessage,
            idCheckMessage,
            emailCheckMessage,
            checkId,
            checkEmail,
            sendAuthEmail,
            checkAuthCode,
            register,
            closeModal,
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.form-label {
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.alert {
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
}

.alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
}

.alert-danger {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: white;
    border-radius: 10px;
    z-index: 1000;
}

.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
}

.close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close-button:hover,
.close-button:focus {
    color: black;
    text-decoration: none;
}

/* .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: white;
    border-radius: 10px;
    z-index: 1000;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
}

.close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close-button:hover,
.close-button:focus {
    color: black;
    text-decoration: none;
} */
</style>
