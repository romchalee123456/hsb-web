<script setup>
import { ref, defineProps, toRefs, onMounted, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import customerService from '@/service/customerService';
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

const customerid = ref(0);
const modeView = ref(true);



const customerFirstname = ref('');
const customerLasttname = ref('');
const customerLine = ref('');
const customerPhone = ref('');
const customerAddress = ref('');

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
        const res = await customerService.deleteCustomerId(customerid.value);

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
    if (customerFirstname.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกชื่อ', life: 5000 });
        return false;
    }
    if (customerLasttname.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกนามสกุล', life: 5000 });
        return false;
    }
    if (customerPhone.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกเบอร์โทรศัพท์', life: 5000 });
        return false;
    }
    if (customerLine.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกไอดี ไลน์', life: 5000 });
        return false;
    }
    if (customerAddress.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกรายละเอียดที่อยู่', life: 5000 });
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
        if (customerid.value === 0) {
            const payload = {
                customerFirstname: customerFirstname.value,
                customerLasttname: customerLasttname.value,
                customerPhone: customerPhone.value,
                customerLine: customerLine.value,
                customerAddress: customerAddress.value,
            };
            const res = await customerService.createCustomer(payload);

            if (res.status === 'success') {
                await fetchData(res.data.result.customerid);
                customerid.value = res.data.result.customerid;

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
                customerFirstname: customerFirstname.value,
                customerLasttname: customerLasttname.value,
                customerPhone: customerPhone.value,
                customerLine: customerLine.value,
                customerAddress: customerAddress.value,
            };
            const res = await customerService.updateCustomerId(payload, customerid.value);

            if (res.status === 'success') {
                await fetchData(customerid.value);

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
    const res = await customerService.findCustomerById(value);
    customerFirstname.value = res.data.customerFirstname;
    customerLasttname.value = res.data.customerLasttname;
    customerPhone.value = res.data.customerPhone;
    customerLine.value = res.data.customerLine;
    customerAddress.value = res.data.customerAddress;
};
onMounted(async () => {

    if (id.value) {
        customerid.value = id.value;
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
            :header="'เพิ่มข้อมูลลูกค้า'"
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
        >
            <div class="container mx-auto px-4 pt-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">ชื่อ</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="customerCode1" type="text" v-model="customerFirstname" :disabled="modeView" />
                        </div>
                    </div>

                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">นามสกุล</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="customerCode1" type="text" v-model="customerLasttname" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">เบอร์โทร</label>
                        </div>
                        <div class="col-span-4">
                            <InputNumber class="w-full" id="customerCode1" type="text" v-model="customerPhone" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">ไอดี-ไลน์</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="customerCode1" type="text" v-model="customerLine" :disabled="modeView" />
                        </div>
                    </div>
                    
                    <div class="grid col-span-2 gap-4">
                        <div>
                            <label class="mr-5">ที่อยู่</label>
                        </div>
                        <div>
                            <div class="col-span-10">
                                <Textarea class="w-full" v-model="customerAddress" variant="filled" rows="5" cols="30" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <Button severity="info" label="บันทึกข้อมูล" raised @Click="handleClickSave" v-if="!modeView" />
                <Button severity="info" label="แก้ไขข้อมูล" raised @Click="handleClickEdit" v-if="modeView" />
                <Button severity="info" label="ลบข้อมูล" raised @Click="handleClickDelete" v-if="customerid != 0 && !modeView" />

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
