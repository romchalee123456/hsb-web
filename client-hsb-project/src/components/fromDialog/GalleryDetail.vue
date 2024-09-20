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
const periodfromVisible = ref(false);

const selectedRole = ref({ id: 1, name: 'ดำเนินการ' });
const selectedRoleSponse = ref();
const responses = ref([]);
const projectCode = ref('');
const periodData = ref([]);
const periodDetailData = ref([]);
const houseDetailData = ref([]);
const houseDetailFileData = ref([]);
const deletePeriod = ref([]);
const description = ref('');
const projectName = ref('');
const amount = ref('');
const customerSelected = ref();
const houseDetailSelected = ref();
const periodSelected = ref();
const periodDetailSelected = ref();
const projectStatus = ref([
    { id: 1, name: 'ดำเนินการ' },
    { id: 2, name: 'เสร็จสิ้น' },
    { id: 3, name: 'ปิดโครงการ' }
]);
const locationsName = ref('');
const locationCode = ref('');
const lat = ref();
const lon = ref();
const checkedFiles = ref([]);
const createReport = ref(false);

const emit = defineEmits(['buttonClose']);

const openPeriodDetail = (event) => {
    console.log(event);
periodfromVisible.value = true;
console.log(event.data.periodid);
periodid.value = event.data.periodid;

};

const addPeriod = () => {
    const isoDateString = new Date().toISOString(); // ISO-8601 format

    const period = {

        projectid: projectid.value,
        description: "",
        periodStatusId: 1,
        periodnameid: 0,
        createOn:isoDateString,
        periodStatus: {
            periodStatusName: 'ปิด'
        }
    };

    periodData.value.push(period);
};

const periodDelete = (index,data) => {
    periodData.value.splice(index,1);
    deletePeriod.value.push(data);
};

const openPeriod = (index) => {
    periodData.value[index].periodStatusId=2;
    periodData.value[index].periodStatus.periodStatusName="ดำเนินการ";
};

const closePeriod = (index) => {
    periodData.value[index].periodStatusId=1;
    periodData.value[index].periodStatus.periodStatusName="ปิด";
};

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
        const res = await projectService.deleteProjectId(projectid.value);

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
    if (projectCode.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกรหัสโครงการ', life: 5000 });
        return false;
    }
    if (projectName.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกชื่อโครงการ', life: 5000 });
        return false;
    }
    if (amount.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกมูลค่า', life: 5000 });
        return false;
    }
    if (description.value === '') {
        toast.add({ severity: 'warn', summary: 'warn Error', detail: 'กรุณากรอกรายละเอียด', life: 5000 });
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
        if (projectid.value === 0) {
            const payload = {
                projectCode: projectCode.value,
                projectName: projectName.value,
                amount: amount.value,
                responseid: selectedRoleSponse.value.id,
                projectStatusid: selectedRole.value.id,
                description: description.value,
                periodData: periodData.value
            };
            const res = await projectService.createProject(payload);

            if (res.status === 'success') {
                await fetchData(res.data.result.projectid);
                projectid.value = res.data.result.projectid;

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
                projectCode: projectCode.value,
                projectName: projectName.value,
                amount: amount.value,
                responseid: selectedRoleSponse.value.id,
                projectStatusid: selectedRole.value.id,
                description: description.value,
                periodData: periodData.value,
                deletePeriod: deletePeriod.value
            };
            const res = await projectService.updateProjectId(payload, projectid.value);

            if (res.status === 'success') {
                await fetchData(projectid.value);

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
    const res = await projectService.findProjectById(value);
    projectCode.value = res.data.projectCode;
    projectName.value = res.data.projectName;
    amount.value = res.data.amount;
    description.value = res.data.description;
    selectedRole.value = projectStatus.value[res.data.projectStatusid - 1];
    selectedRoleSponse.value = responses.value[res.data.responseid - 1];
    periodData.value = res.periodData;
    locationsName.value = res.data.locationName;
    locationCode.value = res.data.locationCode;
    lat.value = res.data.lat;
    lon.value = res.data.lon;
    customerSelected.value = res.customerData;
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
    const res3 = await houseDetailService.findAllFileByHouseDetail(houseDetail.houseDetailid);
    houseDetailFileData.value = res3.data
    
    houseDetailFileData.value.forEach(file => {
            checkedFiles.value.push(false);
    });

    createReport.value = true;
};


onMounted(async () => {
    const res = await userService.getAllUser();
    responses.value = res.data;

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
<PeriodDetailFrom
v-if="periodfromVisible"
:fromVisible="periodfromVisible"
:id="periodid"
:projectid="id"
@close="()=>{periodfromVisible = false}"
></PeriodDetailFrom>
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
                        />
                </div>     
            </div>
        </div>
        <div class="pt-4 flex justify-end">
        <Button severity="info" label="สร้างรายงาน" raised  v-if="createReport" onClick=""/>
        </div>
        </Dialog>
    </div>
</template>
<style>
.bg-hsb-primary {
    background-color: #192a51;
}

</style>
