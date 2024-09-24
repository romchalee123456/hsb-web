<script setup>
import { ref, defineProps, toRefs, onMounted, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Image from 'primevue/image';
import projectService from '@/service/projectService';
import userService from '@/service/userService';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import houseDetailService from '@/service/houseDetailService';
import ReportGallery from './ReportGallery.vue';
const toast = useToast();

const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    onload: Function
});
const { fromVisible, id } = toRefs(props);

const projectid = ref(0);
const periodid = ref(0);
const modeView = ref(true);
const houseDetailid = ref(0);
const selectedRole = ref({ id: 1, name: 'ดำเนินการ' });
const selectedRoleSponse = ref();
const responses = ref([]);
const projectCode = ref('');
const periodData = ref([]);
const periodDetailData = ref([]);
const houseDetailData = ref([]);
const houseDetailFileData = ref([]);
const description = ref('');
const projectName = ref('');
const amount = ref('');

const houseDetailSelected = ref();
const periodSelected = ref();
const periodDetailSelected = ref();
const projectStatus = ref([
    { id: 1, name: 'ดำเนินการ' },
    { id: 2, name: 'เสร็จสิ้น' },
    { id: 3, name: 'ปิดโครงการ' }
]);
const checkedFiles = ref([]);
const createReportFromVisible = ref(false);


const emit = defineEmits(['buttonClose']);

const handleClickClose = () => {
    modeView.value = true;
    id.value = 0;
    emit('buttonClose');
};


const handleClickShowReport = () => {
    const isAnyChecked = checkedFiles.value.some(fileChecked => fileChecked === true);
    if (isAnyChecked) {
        handleShowReport();
    } else {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'กรุณาเลือกอย่างน้อยหนึ่งไฟล์', life: 3000 });
    }
};

const handleShowReport = async () => {
    for (const data of houseDetailFileData.value) {
        if (data.reportSelected == true) {
            await houseDetailService.updateSelectedFile(data.fileid);
        } else {
            await houseDetailService.updateSelectedFileFalse(data.fileid)
        }
    }


    createReportFromVisible.value = true; 
};


const fetchData = async (value) => {
    const res = await projectService.findProjectById(value);
    projectCode.value = res.data.projectCode;
    projectName.value = res.data.projectName;
    amount.value = res.data.amount;
    description.value = res.data.description;
    selectedRole.value = projectStatus.value[res.data.projectStatusid - 1];
    selectedRoleSponse.value = responses.value[res.data.responseid - 1];
    periodData.value = res.periodData;
};

const fetchPeriodDetail = async (period) => {
    const res1 = await projectService.getPeriodDetail(period.periodid);
    periodDetailData.value = res1.data
    
};

const fetchHouseDetail = async (periodDetail) => {
    const res2 = await houseDetailService.findAllHouseDetail(periodDetail.periodDetailid);
    houseDetailData.value = res2.data
    
};

const fetchHouseDetailFile = async (houseDetail) => {
    houseDetailid.value = houseDetail.houseDetailid;
    const res3 = await houseDetailService.findAllFileByHouseDetail(houseDetail.houseDetailid);
    houseDetailFileData.value = res3.data
    
    houseDetailFileData.value.forEach(file => {
            checkedFiles.value.push(false);
    });
};

const fileReportSelected = async (file, checkedFiles) => {
    file.reportSelected = checkedFiles;
}

onMounted(async () => {

    if (id.value) {
        projectid.value = id.value;
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
            :header="'รายงาน'"
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
        <div class="grid grid-cols-3 gap-4">
          <div class="field grid grid-cols-5 gap-4">
            <div>
              <label class="mr-5 ">งวด</label>
            </div>
            <div class="col-span-4">
                <Select v-model="periodSelected" :options="periodData" optionLabel="description" placeholder="เลือกงวด" class="w-full md:w-56"
                @change="fetchPeriodDetail(periodSelected)"
                > 
                </Select>
            </div>
          </div>
          <div class="field grid grid-cols-5 gap-4">
            <div>
              <label class="">งานหลัก</label>
            </div>
            <div class="col-span-4">
                <Select v-model="periodDetailSelected" :options="periodDetailData" optionLabel="periodname.periodName" placeholder="เลือกงานหลัก" class="w-full md:w-56"
                @change="fetchHouseDetail(periodDetailSelected)"
                > 
            </Select>
            </div>
          </div>
          <div class="field grid grid-cols-5 gap-4">
            <div>
              <label class="">งานรอง</label>
            </div>
            <div class="col-span-4">
                <Select v-model="houseDetailSelected" :options="houseDetailData" optionLabel="houseDetailname.houseDetailName" placeholder="เลือกงานรอง" class="w-full md:w-56"
                @change="fetchHouseDetailFile(houseDetailSelected)"
                > 
            </Select>
            </div>
          </div>
        </div>
        </div>
        <div class="container mx-auto px-4 pt-10">
            <div class="grid grid-cols-4 gap-4 border border-slate-200">
                <div class="field pt-2 pb-2" v-for="(file,index) of houseDetailFileData"
                :key="file.fileid">
                    <Image :src="'http://localhost:3001/'+file.filePath" alt="Image" width="250rem" hight="250rem" preview />
                    <Checkbox
                            v-model="checkedFiles[index]"
                            binary
                            variant="filled"
                            class="absolute bottom-2 right-2"
                            @change="fileReportSelected(file, checkedFiles[index])"
                        />
                </div>     
            </div>
        </div>
        <div class="pt-4 flex justify-end">
        <Button severity="info" label="สร้างรายงาน" raised @click="handleClickShowReport" />
        </div>
        </Dialog>
    </div>
    <ReportGallery
    v-if="createReportFromVisible"
    :fromVisible="createReportFromVisible"
    :id="houseDetailid"
    @buttonClose="() => {createReportFromVisible = false}"
></ReportGallery>
</template>
<style>
.bg-hsb-primary {
    background-color: #192a51;
}

</style>
