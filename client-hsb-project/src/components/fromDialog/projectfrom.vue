<script setup>
import { ref, defineProps, toRefs, onMounted, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import projectService from '@/service/projectService';
import userService from '@/service/userService';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import customerInputFields from '../customInputfields/customerInputFields.vue';
import locationsInputFields from '../customInputfields/locationsInputFields.vue';
import PeriodDetailFrom from './PeriodDetailFrom.vue';
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
const deletePeriod = ref([]);
const description = ref('');
const projectName = ref('');
const amount = ref('');
const customerSelected = ref();
const projectStatus = ref([
    { id: 1, name: 'ดำเนินการ' },
    { id: 2, name: 'เสร็จสิ้น' },
    { id: 3, name: 'ปิดโครงการ' }
]);
const locationsName = ref('');
const locationCode = ref('');
const lat = ref();
const lon = ref();


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
            :header="'เพิ่มโครงการ'"
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
                            <label class="mr-5">รหัสโครงการ</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="projectCode1" type="text" v-model="projectCode" :disabled="modeView" />
                        </div>
                    </div>

                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">ชื่อโครงการ</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="projectCode1" type="text" v-model="projectName" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="mr-5">มูลค่า</label>
                        </div>
                        <div class="col-span-4">
                            <InputText class="w-full" id="projectCode1" type="text" v-model="amount" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="">สถานะ</label>
                        </div>
                        <div class="col-span-4">
                            <Dropdown v-model="selectedRole" :options="projectStatus" optionLabel="name" placeholder="" checkmark :highlightOnSelect="false" class="w-full md:w-14rem" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="">ผู้รับผิดชอบ</label>
                        </div>
                        <div class="col-span-4">
                            <Dropdown v-model="selectedRoleSponse" :options="responses" optionLabel="firstname" placeholder="" checkmark :highlightOnSelect="false" class="w-full md:w-14rem" :disabled="modeView" />
                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="">ลูกค้า</label>
                        </div>
                        <div class="col-span-4">
                          <customerInputFields
                         v-model="customerSelected"
                         :modeReadonly="modeView" 
                          ></customerInputFields>

                        </div>
                    </div>
                    <div class="field grid grid-cols-5 gap-4">
                        <div>
                            <label class="">ตำแหน่งที่ตั้ง</label>
                        </div>
                        <div class="col-span-4">
                          <locationsInputFields
                          :id="projectid"
                          v-model="locationsName"
                          :locations-code="locationCode"
                          :lat="lat"
                          :lon="lon"
                       
                     
                          @valueChanged="fetchData(projectid)"
                          :modeReadonly="modeView" 
                          ></locationsInputFields>
                          
                        </div>
                    </div>
                    <br />
                    <div class="grid col-span-2 gap-4">
                        <div>
                            <label class="mr-5">รายละเอียด</label>
                        </div>
                        <div>
                            <div class="col-span-10">
                                <Textarea class="w-full" v-model="description" variant="filled" rows="5" cols="30" :disabled="modeView"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="datatable-wrapper flex items-center justify-center">
                <DataTable :value="periodData" stripedRows class="w-[1150px]"
                @row-dblclick="openPeriodDetail"
                >
                    <Column field="description" header="งวด">
                        <template #body="{index}">
                            <InputText v-model="periodData[index].description" :disabled="modeView"
                             class="w-full"
                            >
                            </InputText>
                        </template>
                    </Column>
                    <Column  header="สถานะ">
                        <template #body="{ data }">
                            <Badge v-if="data.periodStatusId == 1" :value="data.periodStatus.periodStatusName" severity="secondary"></Badge>
                            <Badge v-if="data.periodStatusId == 2" :value="data.periodStatus.periodStatusName" severity="warn"></Badge>
                            <Badge v-if="data.periodStatusId == 3" :value="data.periodStatus.periodStatusName" severity="success"></Badge>
                        </template>
                    </Column>
                    <Column  header="เปิด/ปิด" style="width: 15%" headerStyle="text-center">
                        <template #body="{ data, index }">
                            <div class="flex justify-center align-center">
                                <Button v-if="data.periodStatusId == 1" severity="success" label="เปิด" raised @Click="openPeriod(index)" :disabled="modeView"/>
                                <Button v-if="data.periodStatusId !== 1" severity="danger" label="ปิด" raised @Click="closePeriod(index)" :disabled="modeView"/>
                            </div>
                        </template>
                    </Column>
                    <Column >
                        <template #body="{index,data}">
                            <Button icon="pi pi-trash"  style="background-color: yellow; color: black; border-color: yellow;" @Click="periodDelete(index,data)" :disabled="modeView"></Button>
                            
                        </template>
                    </Column>
                </DataTable>
            </div>

            <template #footer>
                <Button severity="info" label="เพิ่มงวด" raised @Click="addPeriod" v-if="!modeView" />
                <Button severity="info" label="บันทึกข้อมูล" raised @Click="handleClickSave" v-if="!modeView" />
                <Button severity="info" label="แก้ไขข้อมูล" raised @Click="handleClickEdit" v-if="modeView" />
                <Button severity="info" label="ลบข้อมูล" raised @Click="handleClickDelete" v-if="projectid != 0 && !modeView" />

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
