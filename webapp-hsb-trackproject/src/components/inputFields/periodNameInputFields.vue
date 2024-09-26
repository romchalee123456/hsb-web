<script setup>
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue';
import projectTrackingService from '@/service/projectTrackingService';
import DataTable from 'primevue/datatable';

const emit = defineEmits(['valueChanged', 'onClosed']);
const props = defineProps({
    selectedValue: String,
    modeReadonly: {
        type: Boolean,
        default: false
    }
});

const visible = ref(false);
const periodNameList = ref([]);
const periodName = ref(props.selectedValue);

const onRowDblClick = (event) => {
    periodName.value = `${event.data.periodName}`;
    emit('valueChanged', event.data.periodName);
    visible.value = false;
};

onMounted(async () => {
    const res = await projectTrackingService.getPeriodName();
    periodNameList.value = res.data.periodname;
});

// Watch for changes in the selectedValue prop to update customerName
watch(
    () => props.selectedValue,
    (newValue) => {
        periodName.value = newValue;
    }
);
</script>

<template>
    <div>
        <InputGroup>
            <InputText v-model="periodName" readonly :disabled="modeReadonly" />
            <Button icon="pi pi-search" style="background-color: #192a51" @click="visible = true" :disabled="modeReadonly" />
            <Dialog v-model:visible="visible" :closable="false" modal>
                <DataTable :value="periodNameList" :style="{ width: '20rem' }" @row-click="onRowDblClick">
                    <Column header="ชื่องาน" field="periodName"></Column>
                </DataTable>
            </Dialog>
        </InputGroup>
    </div>
</template>
