<script setup>
import { ref, onMounted, defineProps, defineEmits, toRefs } from 'vue';
import { useToast } from 'primevue/usetoast';
import projectService from '@/service/projectService';
import DataTable from 'primevue/datatable';
import periodDetailService from '@/service/periodDetailService';
import periodnameInputFields from '../customInputfields/periodnameInputFields.vue';


const toast = useToast();
useToast;

const emit = defineEmits(['valueChanged', 'close']);
const props = defineProps({
    fromVisible: Boolean,
    id: Number, 
    projectid: Number,
    selectedValue: String,
    modeReadonly: {
        type: Boolean,
        default: false
    }
});
const { fromVisible, id ,projectid} = toRefs(props);

const visible = ref(false);
const modeView = ref(true);
const description = ref('');
const periodDetail = ref([]);
const periodDetailData = ref([]);
const deletePeriodDetail = ref([]);
const periodNameSelected = ref({ id: null, name: '' }); // Initialize with a default value
const periodDetailid = ref(null);


const handleClickEdit = () => {
    modeView.value = false;
};

const addPeriodDetail = () => {
    const perioddetail = {
        description: "",
        periodNameSelected: 0,
    };
    periodDetailData.value.push(perioddetail);
    periodDetail.value = [...periodDetailData.value]; // Update periodDetail if needed
};

const handleClickSave = async (index) => {
    const validate = await validatedata(index);
    if (!validate) {
        return false;
    }

    try {
        let payload;
        if (!periodDetailid.value) { // Check if new record
            payload = {
                description: description.value,
                periodNameSelected: periodNameSelected.value.id,
                projectid: projectid.value
            };
            const res = await periodDetailService.createPeriodDetail(payload);

            if (res.status === 'success') {
                periodDetailid.value = res.result.periodDetailid;
                await fetchData(periodDetailid.value);

                toast.add({
                    severity: 'success',
                    summary: 'Save Success',
                    detail: 'บันทึกข้อมูลสำเร็จ',
                    life: 5000
                });

                emit('valueChanged', periodDetailid.value);
                await handleClickEdit();
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Save Error',
                    detail: 'บันทึกไม่สำเร็จ',
                    life: 5000
                });
            }
        } else { // Update existing record
            payload = {
                description: description.value,
                periodDetailData: periodDetailData.value,
                deletePeriodDetail: deletePeriodDetail.value,
                periodNameSelected: periodNameSelected.value.id,
                projectid: projectid.value
            };
            const res = await periodDetailService.updatePeriodDetailId(payload, periodDetailid.value);

            if (res.status === 'success') {
                await fetchData(periodDetailid.value);

                toast.add({
                    severity: 'success',
                    summary: 'Save Success',
                    detail: 'แก้ไขข้อมูลสำเร็จ',
                    life: 5000
                });

                emit('valueChanged', periodDetailid.value);
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
        const errorMessage = ex.response?.data?.message || ex.message || 'An error occurred';

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000
        });

        console.error('Error during save operation:', ex);
    }
};

const validatedata = async (index) => {
    if (periodDetail.value[index].description === '') {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'กรุณากรอกรายละเอียด', life: 5000 });
        return false;
    }
    return true;
};

const fetchData = async (value) => {
        const res = await periodDetailService.findPeriodDetailById(value);
        description.value = res.data.description;
};

const periodDetailDelete = (index, data) => {
    periodDetailData.value.splice(index, 1);
    deletePeriodDetail.value.push(data);
};

const handleClickClose = () => {
    emit('close', false);
};

const onRowDblClick = (event) => {
    periodNameSelected.value = { id: event.data.periodNameid, name: event.data.periodName };
    emit('valueChanged', event.data.periodNameid);
    visible.value = false;
};

onMounted(async () => {
    try {
        const res = await projectService.getPeriodDetail(id.value);
        periodDetail.value = res.data;
        console.log('Initial Data:', res.data); // Debug output
    } catch (error) {
        console.error('Error during initial data fetch:', error);
    }
});
</script>


<template>
    <div>
        <InputGroup>
            <Dialog v-model:visible="fromVisible" maximizable modal header="งาน" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @update:visible="handleClickClose">
                <DataTable :value="periodDetail" tableStyle="min-width: 50rem" @row-dblclick="onRowDblClick" stripedRows :scrollable="true" selectionMode="single">
                    <template #header>
                        <div class="flex justify-end items-center">
                            <Button severity="info" label="เพิ่มงวด" raised @click="addPeriodDetail" />
                        </div>
                    </template>
                    <Column header="ชื่อ" field="periodName">
                        <template #body>
                            <periodnameInputFields
                                :selected-value="periodNameSelected"
                                @valueChanged="(value) => { periodNameSelected = value; }"
                                :disabled="modeView"
                            ></periodnameInputFields>
                        </template>
                    </Column>
                    <Column header="รายละเอียด" field="description">
                        <template #body="{ index }">
                            <InputText v-model="periodDetail[index].description" class="w-full" :disabled="modeView"></InputText>
                        </template>
                    </Column>
                    <Column>
                        <template #body="{ index, data }">
                            <div class="flex flex-row justify-around">
                                <Button icon="pi pi-trash" style="background-color: yellow; color: black; border-color: yellow" @click="periodDetailDelete(index, data)" :disabled="modeView" />
                                <Button severity="info" label="บันทึกข้อมูล" raised @click="handleClickSave(index)" v-if="!modeView" />
                                <Button severity="info" label="แก้ไขข้อมูล" raised @click="handleClickEdit(index)" v-if="modeView" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </Dialog>
        </InputGroup>
    </div>
</template>
