<script setup>
import { ref, onMounted, defineProps, defineEmits, toRefs } from 'vue';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import houseDetailService from '@/service/houseDetailService';
import housedetailnameInputFields from '../customInputfields/housedetailnameInputFields.vue';

const toast = useToast();
useToast;

const emit = defineEmits(['valueChanged', 'close']);
const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    selectedValue: String,
    modeReadonly: {
        type: Boolean,
        default: false
    }
});
const { fromVisible, id } = toRefs(props);

const visible = ref(false);
const modeView = ref(true);
const houseDetail = ref([]);
const houseDetailid = ref();
const houseDetailNameSelected = ref({ id: null, name: '' });
const periodDetailid = ref(null);
const houseDetailNameid = ref(null);
const deletehouseDetail = ref([]);

const handleClickEdit = () => {
    modeView.value = false;
};

const addHouseDetail = () => {
    const housedetail = {
        houseDetailNameId: houseDetailNameid.value,
        periodDetailid: id.value
    };
    houseDetail.value.push(housedetail);
};

const handleClickSave = async () => {
    const save = ref(false);

    for (const data of houseDetail.value) {
        try {
            let payload;
            save.value = true;
            if (!data.houseDetailid) {
                payload = {
                    houseDetailNameId: data.houseDetailNameId,
                    periodDetailid: id.value
                };
                const res = await houseDetailService.createHouseDetail(payload);
            } else {
                // Update existing record
                payload = {
                    houseDetailNameId: data.houseDetailNameId,
                    periodDetailid: id.value
                };
                const res = await houseDetailService.updateHouseDetailId(data.houseDetailid, payload);
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
    }

    if (save.value) {
        await fetchData(id.value);

        toast.add({
            severity: 'success',
            summary: 'Save Success',
            detail: 'บันทึกข้อมูลสำเร็จ',
            life: 5000
        });

        emit('valueChanged', houseDetailid.value);
        await handleClickEdit();
    } else {
        toast.add({
            severity: 'error',
            summary: 'Save Error',
            detail: 'บันทึกไม่สำเร็จ',
            life: 5000
        });
    }
};

const fetchData = async (value) => {
    const res = await houseDetailService.findAllHouseDetail(value);
    houseDetail.value = res.data;

    console.log(res);

    houseDetailNameSelected.value = res.data.houseDetailNameid;
};

const deletePeriodDetailFromDatabase = async (houseDetailid) => {
    await houseDetailService.deleteHouseDetailId(houseDetailid);
};

const houseDetailDelete = async (index, data) => {
    await deletePeriodDetailFromDatabase(data.houseDetailid);
    houseDetail.value.splice(index, 1);
    deletehouseDetail.value.push(data);
};

const handleClickClose = () => {
    emit('close', false);
};

const onRowDblClick = (event) => {
    houseDetailNameSelected.value = { id: event.data.houseDetailNameid, name: event.data.houseDetailNameid };
    emit('valueChanged', event.data.houseDetailNameid);
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
    <div>
        <InputGroup>
            <Dialog v-model:visible="fromVisible" maximizable modal header="งานรอง" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @update:visible="handleClickClose">
                <DataTable :value="houseDetail" tableStyle="min-width: 50rem" @row-dblclick="onRowDblClick" stripedRows :scrollable="true" selectionMode="single">
                    <template #header>
                        <div class="flex justify-end items-center">
                            <Button severity="info" label="เพิ่มงานรอง" raised @click="addHouseDetail" />
                            <Button severity="info" label="บันทึกข้อมูล" raised @click="handleClickSave()" v-if="!modeView" />
                            <Button severity="info" label="แก้ไขข้อมูล" raised @click="handleClickEdit()" v-if="modeView" />
                        </div>
                    </template>
                    <Column header="ชื่อ" field="houseDetailName">
                        <template #body="{ data }">
                            <housedetailnameInputFields
                                v-if="data"
                                :selected-value="houseDetailNameSelected"
                                :modeReadonly="modeView"
                                :id="data.houseDetailNameId"
                                @valueChanged="
                                    (value) => {
                                        data.houseDetailNameId = value;
                                    }
                                "
                                :disabled="modeView"
                            ></housedetailnameInputFields>
                        </template>
                    </Column>
                    <Column>
                        <template #body="{ index, data }">
                            <div class="flex flex-row justify-around">
                                <Button icon="pi pi-trash" style="background-color: yellow; color: black; border-color: yellow" @click="houseDetailDelete(index, data)" :disabled="modeView" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </Dialog>
        </InputGroup>
    </div>
</template>
