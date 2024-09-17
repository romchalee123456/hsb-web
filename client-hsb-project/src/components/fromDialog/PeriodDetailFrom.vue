<script setup>
import { ref, onMounted, defineProps, defineEmits, toRefs } from 'vue';
import { useToast } from 'primevue/usetoast';
import projectService from '@/service/projectService';
import DataTable from 'primevue/datatable';
import periodDetailService from '@/service/periodDetailService';
import periodnameInputFields from '../customInputfields/periodnameInputFields.vue';
import HouseDetailFrom from './HouseDetailFrom.vue';

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
const { fromVisible, id, projectid } = toRefs(props);

const visible = ref(false);
const modeView = ref(true);
const description = ref('');
const periodDetail = ref([]);
const periodDetailData = ref([]);
const deletePeriodDetail = ref([]);
const periodNameSelected = ref({ id: null, name: '' });
const periodDetailid = ref(null);
const houseDetailFromVisible = ref(false);

const handleClickEdit = () => {
    modeView.value = false;
};

const addPeriodDetail = () => {
    const perioddetail = {
        periodid: id.value,
        projectid: projectid.value,
        description: '',
        periodnameid: null
    };
    periodDetail.value.push(perioddetail);
};

const addHouseDetail = (value) => {
    houseDetailFromVisible.value = true;
    periodDetailid.value = value;
};

const handleClickSave = async (index, data) => {
    const validate = await validatedata(index);
    console.log(data);

    if (!validate) {
        return false;
    }

    try {
        let payload;
        if (!data.periodDetailid) {
            // Check if new record
            payload = {
                periodid: id.value,
                description: data.description,
                periodNameid: periodNameSelected.value,
                projectid: projectid.value
            };
            const res = await periodDetailService.createPeriodDetail(payload);

            if (res.status === 'success') {
                periodDetailid.value = res.data.result.periodDetailid;
                await fetchData(id.value);

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
        } else {
            // Update existing record
            payload = {
                description: description.value,
                periodDetailData: periodDetailData.value,
                deletePeriodDetail: deletePeriodDetail.value,
                periodNameid: periodNameSelected.value,
                projectid: projectid.value
            };
            const res = await periodDetailService.updatePeriodDetailId(payload, data.periodDetailid);

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

const validatedata = async (data) => {
    if (data.description === '') {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'กรุณากรอกรายละเอียด', life: 5000 });
        return false;
    }
    return true;
};

const fetchData = async (value) => {
    const res = await projectService.getPeriodDetail(value);
    periodDetail.value = res.data;
    description.value = res.data.description;

    console.log(res);

    periodNameSelected.value = res.data.periodnameid;
};

const deletePeriodDetailFromDatabase = async (periodDetailid) => {
    await periodDetailService.deletePeriodDetailId(periodDetailid);
};

const periodDetailDelete = async (index, data) => {
    await deletePeriodDetailFromDatabase(data.periodDetailid);
    periodDetail.value.splice(index, 1);
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
    if (id.value) {
        periodDetailid.value = id.value;
        await fetchData(id.value);
        modeView.value = true;
    } else {
        modeView.value = false;
    }
});
</script>

<template>
    <HouseDetailFrom
        v-if="houseDetailFromVisible"
        :fromVisible="houseDetailFromVisible"
        :id="periodDetailid"
        @close="
            () => {
                houseDetailFromVisible = false;
            }
        "
    >
    </HouseDetailFrom>
    <div>
        <InputGroup>
            <Dialog v-model:visible="fromVisible" maximizable modal header="งานหลัก" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @update:visible="handleClickClose">
                <DataTable :value="periodDetail" tableStyle="min-width: 50rem" @row-dblclick="onRowDblClick" stripedRows :scrollable="true" selectionMode="single">
                    <template #header>
                        <div class="flex justify-end items-center">
                            <Button severity="info" label="เพิ่มงานหลัก" raised @click="addPeriodDetail" />
                        </div>
                    </template>
                    <Column header="ชื่อ" field="periodName">
                        <template #body="{ data }">
                            <periodnameInputFields
                                :selected-value="periodNameSelected"
                                :modeReadonly="modeView"
                                :id="data.periodnameid"
                                @valueChanged="
                                    (value) => {
                                        periodNameSelected = value;
                                    }
                                "
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
                                <Button severity="info" label="เพิ่มงานรอง" raised @Click="addHouseDetail(data.periodDetailid)" v-if="!modeView" />
                                <Button icon="pi pi-trash" style="background-color: yellow; color: black; border-color: yellow" @click="periodDetailDelete(index, data)" :disabled="modeView" />
                                <Button severity="info" label="บันทึกข้อมูล" raised @click="handleClickSave(index, data)" v-if="!modeView" />
                                <Button severity="info" label="แก้ไขข้อมูล" raised @click="handleClickEdit(index)" v-if="modeView" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </Dialog>
        </InputGroup>
    </div>
</template>
