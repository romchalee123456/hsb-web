<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import houseDetailService from '@/service/houseDetailService';
import DataTable from 'primevue/datatable';

const emit = defineEmits(['valueChanged']);
const props = defineProps({
    modelValue: String,
    id: Number,
    modeReadonly: {
        type: Boolean,
        default: false
    }
});

const visible = ref(false);
const housedetailname = ref([]);
const houseDetailName = ref();

const onRowDblClick = (event) => {
    houseDetailName.value = event.data.houseDetailName;
    emit('valueChanged', event.data.houseDetailNameid);
    visible.value = false;
};

onMounted(async () => {
    const res = await houseDetailService.findAllHoseDetailName();
    housedetailname.value = res.data;
    console.log(props);
    if (props.id) {
        const houseDetailNameSelected = housedetailname.value.find((value) => {
            if (value.houseDetailNameid === props.id) {
                return value;
            }
        });

        houseDetailName.value = houseDetailNameSelected.houseDetailName;
    }
});
</script>

<template>
    <div>
        <InputGroup>
            <InputText placeholder="" v-model="houseDetailName" readonly class="w-full" :disabled="modeReadonly" />
            <Button icon="pi pi-search" style="background-color: #192a51" @click="visible = true" :disabled="modeReadonly" />
            <Dialog v-model:visible="visible" maximizable modal header="'งานรอง'" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <DataTable :value="housedetailname" tableStyle="min-width: 50rem" paginator :rows="5" @row-dblclick="onRowDblClick" stripedRows :scrollable="true" selectionMode="single" :rowsPerPageOptions="[5, 10, 20, 50]">
                    <Column header="'ชื่องานรอง'" field="houseDetailName"></Column>
                </DataTable>
            </Dialog>
        </InputGroup>
    </div>
</template>
