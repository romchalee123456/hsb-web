<script setup>
import { ref, defineProps, toRefs, onMounted, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import userService from '@/service/userService';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
useToast;
const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    onload: Function
});
const { fromVisible, id } = toRefs(props);

const userId = ref(0);
const modeView = ref(true);
const selectedRole = ref({ id: 1, name: 'admin' });
const password = ref('');
const rePassword = ref('');
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const teamName = ref('');
const phoneNumber = ref('');
const userLineNotificationsid = ref('');

const role = ref([
    { id: 1, name: 'admin' },
    { id: 2, name: 'ผู้ดูแลโครงการ' },
    { id: 3, name: 'หัวหน้าช่าง' }
]);

const emit = defineEmits(['buttonClose']);

const handleClickClose = () => {
    modeView.value = true;
    id.value = 0;
    emit('buttonClose');
};
const handleClickEdit = () => {
    modeView.value = false;
};

const handleClickDelete = async () => {
    try {
        const res = await userService.DeleteUserId(userId.value);

        if (res.status == 'success') {
            toast.add({ severity: 'success', summary: 'Delete Success', detail: 'ลบข้อมูลสำเร็จ', life: 3000 });
            props.onload();
            await handleClickClose();
        }
    } catch (ex) {
        toast.add({ severity: 'error', summary: 'Error', detail: ex, life: 3000 });
    }
};
const validatedata = async () => {
    if (firstname.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกชื่อ', life: 5000 });
        return false;
    }
    if (lastname.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกนามสกุล', life: 5000 });
        return false;
    }
    if (email.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกอีเมล์', life: 5000 });
        return false;
    }
    if (password.value === '' && userId.value === 0) {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกรหัสผ่าน', life: 5000 });
        return false;
    }

    if (password.value !== rePassword.value) {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'รหัสผ่านไม่ตรงกัน', life: 5000 });
        return false;
    }

    if (phoneNumber.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกเบอร์', life: 5000 });
        return false;
    }

    if (teamName.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกชื่อทีม', life: 5000 });
        return false;
    }
    return true;
};

const handleClickSave = async () => {
    const validate = await validatedata();
    if (!validate) {
        return false;
    }

    try {
        if (userId.value === 0) {
            const payload = {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                password: password.value,
                role: selectedRole.value.id,
                teamName: teamName.value,
                phoneNumber: phoneNumber.value,
                userLineNotificationsid: userLineNotificationsid.value
            };
            const res = await userService.insertUser(payload);

            if (res.status === 'success') {
                await fetchData(res.data.result.id);
                userId.value = res.data.result.id;

                toast.add({
                    severity: 'success',
                    summary: 'Save Success',
                    detail: 'บันทึกข้อมูลสำเร็จ',
                    life: 5000
                });

                props.onload();

                await handleClickEdit();
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Save Error',
                    detail: 'บันทึกไม่สำเร็จ',
                    life: 5000
                });
            }
        } else {
            const payload = {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                role: selectedRole.value.id,
                teamName: teamName.value,
                phoneNumber: phoneNumber.value.toString(),
                userLineNotificationsid: userLineNotificationsid.value
            };
            const res = await userService.UpdateUser(payload, userId.value);

            if (res.status === 'success') {
                await fetchData(userId.value);

                toast.add({
                    severity: 'success',
                    summary: 'Save Success',
                    detail: 'แก้ไขข้อมูลสำเร็จ',
                    life: 5000
                });

                props.onload();

                await handleClickEdit();
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Save Error',
                    detail: 'แก้ไขไม่สำเร็จ',
                    life: 5000
                });
            }
        }
    } catch (ex) {
        // Extracting error message from the exception object
        const errorMessage = ex.response?.data?.message || ex.message || 'An error occurred';

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000
        });

        console.error('Error during user insertion:', ex);
    }
};

const fetchData = async (value) => {
    const res = await userService.getUserId(value);

    firstname.value = res.data.firstname;
    lastname.value = res.data.lastname;
    email.value = res.data.email;
    selectedRole.value = role.value[res.data.role - 1];
    teamName.value = res.data.teamName;
    phoneNumber.value = res.data.phoneNumber;
    password.value = '';
    rePassword.value = '';
    userLineNotificationsid.value = res.data.userLineNotificationsid;
};
onMounted(async () => {
    if (id.value) {
        userId.value = id.value;
        await fetchData(id.value);
        modeView.value = true;
    } else {
        modeView.value = false;
    }
});
</script>
<template>
    <Toast />
    <div class="card flex justify-center">
        <Dialog
            v-model:visible="fromVisible"
            maximizable
            modal
            :header="'เพิ่มข้อมูลผู้ใช้'"
            :style="{ width: '80rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            :pt="{
                root: {
                    // class:'p-dialog-maximized'
                },
                header: {
                    class: 'bg-hsb-primary text-white text-base modal-font-Prompt'
                }
            }"
            @update:visible="handleClickClose"
        >
            <div class="container mx-auto px-4 pt-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">ชื่อจริง</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="firstname1" type="text" v-model="firstname" :disabled="modeView" />
                        </div>
                    </div>

                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">นามสกุล</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="firstname1" type="text" v-model="lastname" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">LoginName</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="firstname1" type="text" v-model="email" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">เบอร์โทร</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="firstname1" type="text" v-model="phoneNumber" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4" v-if="userId == 0">
                        <div>
                            <label v-if="userId == 0" class="mr-5">รหัสผ่าน</label>
                            <label v-else class="mr-5">เปลี่ยนรหัสผ่าน</label>
                        </div>
                        <div class="col-span-4">
                            <InputText type="password" v-model="password" toggleMask class="w-full" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4" v-if="userId == 0">
                        <div>
                            <label v-if="userId == 0" class="">รหัสผ่าน</label>
                            <label v-else class="mr-5">เปลี่ยนรหัสผ่าน</label>
                        </div>
                        <div class="col-span-4">
                            <InputText v-model="rePassword" class="w-full" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">ชื่อทีม</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="firstname1" type="text" v-model="teamName" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="">ตำแหน่ง</label>
                        </div>
                        <div class="col-span-4">
                            <Dropdown v-model="selectedRole" :options="role" optionLabel="name" placeholder="" checkmark :highlightOnSelect="false" class="w-full md:w-14rem" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="">Line NotificationId</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="firstname1" type="text" v-model="userLineNotificationsid" :disabled="modeView" />
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <Button severity="info" label="บันทึกข้อมูล" raised @Click="handleClickSave" v-if="!modeView" />
                <Button severity="info" label="แก้ไขข้อมูล" raised @Click="handleClickEdit" v-if="modeView" />
                <Button severity="info" label="ลบข้อมูล" raised @Click="handleClickDelete" v-if="userId != 0 && !modeView" />

                <Button severity="secondary" label="ปิด" raised @Click="handleClickClose" />
            </template>
        </Dialog>
    </div>
</template>
<style>
.bg-hsb-primary {
    background-color: #192a51;
}
</style>
