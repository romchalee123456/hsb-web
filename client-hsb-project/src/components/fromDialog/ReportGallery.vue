<script setup>
import { ref, defineProps, toRefs, onMounted, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Image from 'primevue/image';
import projectService from '@/service/projectService';
import userService from '@/service/userService';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import customerInputFields from '../customInputfields/customerInputFields.vue';
import locationsInputFields from '../customInputfields/locationsInputFields.vue';
import PeriodDetailFrom from './PeriodDetailFrom.vue';
import periodDetailService from '@/service/periodDetailService';
import houseDetailService from '@/service/houseDetailService';
import logo from '@/assets/image/huglogo1-ai.png';
import customerService from '@/service/customerService';
import notificationsService from '@/service/notificationsService';
const toast = useToast();

const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    onload: Function,
    modeReadonly: {
        type: Boolean,
        default: false
    }
});
const { fromVisible, id } = toRefs(props);

const modeView = ref(true);
const houseDetailid = ref(0);
const projectCode = ref('');
const houseDetailFileData = ref([]);
const customerFirstname = ref('');
const customerLastname = ref('');
const customerPhone = ref('');
const customerid = ref(0);
const locationsName = ref('');
const houseDetailName = ref('');
const checkedFiles = ref([]);


const emit = defineEmits(['buttonClose']);

const formattedDate = ref('');

const handleClickClose = () => {
    emit('buttonClose');
};
const handleClickSendReport = async() => {
    const res = await notificationsService.sendReportNotification(id.value,customerid.value)
};


const fetchData = async (value) => {
    const res = await houseDetailService.getInformationByHouseDetail(value);
    projectCode.value = res.data.periodDetail.period.project.projectCode;
    locationsName.value = res.data.periodDetail.period.project.locationName;
    houseDetailName.value = res.data.houseDetailname.houseDetailName;
    customerid.value = res.data.periodDetail.period.project.customerid;

    const res1 = await customerService.findCustomerById(customerid.value)
    customerFirstname.value = res1.data.customerFirstname;
    customerLastname.value = res1.data.customerLastname;
    customerPhone.value = res1.data.customerPhone;
    const res2 = await houseDetailService.getSelectedFile(value);
    houseDetailFileData.value = res2.data;

};

onMounted(async () => {

    if (id.value) {
        houseDetailid.value = id.value;
        await fetchData(id.value);
        modeView.value = true;
    } else {
        modeView.value = false;
    }

    const now = new Date();
    formattedDate.value = now.toLocaleDateString();
});
</script>
<template>
    <Toast />
    <div class="card flex justify-center">
        <Dialog
            v-model:visible="fromVisible"
            modal
            :header="'รายงาน'"
            :style="{ width: '90vw' }" 
            :breakpoints="{ '1199px': '75vw', '575px': '95vw' }"
            :pt="{
                root: { class:'p-dialog-maximized' },
                header: { class: 'bg-hsb-primary text-white text-base modal-font-Prompt' }
            }"
            :closable="false"
        >
            <template #header>
                <div class="flex justify-content-between flex-wrap pl-2 pr-2">
                    <i class="pi pi-chevron-left" style="font-size: 1.5rem; color: white" @click="handleClickClose" v-if="!modeReadonly"></i>
                    <span class="header-title">{{ 'รายงาน' }}</span>
                </div>
            </template>

            <div class="container mx-auto px-4 pt-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <!-- Made responsive -->
                    <div class="field grid grid-cols-4 gap-4">
                        <div>
                            <Image :src="logo" alt="Image" width="220" />
                        </div>
                        <div class="col-span-3">
                            <p>บริษัท ฮักสร้างบ้าน จำกัด</p>
                            <p>439 ถนนจิระ ตำบลในเมือง อำเภอเมืองบุรีรัมย์ จังหวัดบุรีรัมย์ 31000</p>
                            <p>อีเมลล์ : hungsangbaan@hungsangbaan.com</p>
                            <p>โทรศัพท์ : 090-239-2396 , 095-621-9024</p>
                        </div>
                    </div>
                    <div class="field flex justify-end"> <!-- Fixed alignment -->
                        <Button severity="info" label="ส่งรายงาน" raised @click="handleClickSendReport" v-if="!modeReadonly" />
                    </div>
                </div>

                <!-- Fields section -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5"> <!-- Made responsive -->
                    <div class="field grid grid-cols-5 gap-2">
                        <label class="mr-5">รายงานเรื่อง</label>
                        <div class="col-span-4">
                            <span>ผลการดำเนินงานโครงสร้าง</span>
                            <span>{{ houseDetailName }}</span>
                        </div>
                    </div>

                    <!-- Other fields -->
                    <div class="field grid grid-cols-5 gap-4">
                        <label class="mr-5">รหัสโครงการ</label>
                        <div class="col-span-4">
                            <span>{{ projectCode }}</span>
                        </div>
                    </div>

                    <div class="field grid grid-cols-5 gap-4">
                        <label class="mr-5">เรียน</label>
                        <div class="col-span-4">
                            <span>{{ customerFirstname + ' ' + customerLastname }}</span>
                        </div>
                    </div>

                    <div class="field grid grid-cols-5 gap-4">
                        <label class="mr-5">โทรศัพท์</label>
                        <div class="col-span-4">
                            <span>{{ customerPhone }}</span>
                        </div>
                    </div>

                    <div class="field grid grid-cols-5 gap-4">
                        <label class="mr-5">ที่ตั้งโครงการ</label>
                        <div class="col-span-4">
                            <span>{{ locationsName }}</span>
                        </div>
                    </div>

                    <div class="field grid grid-cols-5 gap-4">
                        <label class="mr-5">วันที่</label>
                        <div class="col-span-4">
                            <span>{{ formattedDate }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Image section -->
            <div class="container mx-auto px-4 pt-10">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 border border-slate-200"> <!-- Made responsive -->
                    <div class="field pt-2 pb-2" v-for="(file) of houseDetailFileData" :key="file.fileid">
                        <Image :src="'http://localhost:3001/'+file.filePath" alt="Image" width="100%" height="auto" preview /> <!-- Set image responsive -->
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<style>
.bg-hsb-primary {
    background-color: #192a51;
}

@media (max-width: 768px) {
    .field label {
        font-size: 0.9rem;
    }

    .field .col-span-4 {
        font-size: 0.9rem;
    }

    .field span {
        display: block;
    }

    .header-title {
        font-size: 1.2rem;
    }
}
</style>

