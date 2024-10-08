<script setup>
import loginService from '@/service/loginService';
import logo from '@/assets/image/huglogo1-ai.png';
import { useAuthStore } from '@/assets/stores/auth';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import router from '@/router';
import { ref } from 'vue';
const authStore = useAuthStore();
const toast = useToast();
const email = ref('');
const password = ref('');
const checked = ref(false);

const onLogin = async() => {
  
  try {
  const res = await loginService.login(email.value, password.value);

  if (res.status == "success") {
    const user = {
      username: email.value,
      password: password.value,
    };

    authStore.login(user);

    router.push('/');
  } else {
    toast.add({
      severity: 'error',
      summary: 'เข้าสู่ระบบไม่สำเร็จ',
      detail: res.message, // Assuming res.message contains the error details
      life: 3000,
    });
  }
} catch (error) {
  if (error.response && error.response.status === 400) {
    // If the error response has a 400 status code, extract the message
    toast.add({
      severity: 'error',
      summary: 'เข้าสู่ระบบไม่สำเร็จ',
      detail: error.response.data.message, // Show the error message from the response
      life: 3000,
    });
  } else {
    // Handle other errors
    toast.add({
      severity: 'error',
      summary: 'เข้าสู่ระบบไม่สำเร็จ',
      detail: error.message || error, // Show general error message
      life: 3000,
    });
  }
}


 
};
</script>

<template>
    <Toast/>
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden" style="background-color: var(--primary-color)">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <div class="card flex justify-center">
                            <Image :src="logo" alt="Image" width="350" />
                        </div>

                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <!-- <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span> -->
                        </div>
                        <Button label="Sign In" class="w-full bg-secondary" severity="success" @click="onLogin"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* กรอบการออกแบบหลัก */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* ขนาดหน้าจอขนาดเล็ก (มือถือ) */
@media (max-width: 767px) {
  .header {
    font-size: 24px;
    text-align: center;
  }
  .cta-button {
    display: block;
    width: 100%;
    padding: 15px;
    font-size: 18px;
  }
}

/* ขนาดหน้าจอขนาดกลาง (แท็บเล็ต) */
@media (min-width: 768px) and (max-width: 1024px) {
  .header {
    font-size: 30px;
    text-align: center;
  }
  .cta-button {
    width: auto;
    padding: 12px 24px;
    font-size: 20px;
  }
}

/* ขนาดหน้าจอขนาดใหญ่ (เดสก์ท็อป) */
@media (min-width: 1025px) {
  .header {
    font-size: 36px;
    text-align: left;
  }
  .cta-button {
    display: inline-block;
    width: auto;
    padding: 10px 20px;
    font-size: 22px;
  }
}
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
.p-button-success {
    background-color: #192a51;
}
.p-button.p-button-success:not(:disabled):hover,
.p-buttonset.p-button-success > .p-button:not(:disabled):hover,
.p-splitbutton.p-button-success > .p-button:not(:disabled):hover {
    background: #138496;
    color: #ffffff;
    border-color: #117a8b;
}
</style>
