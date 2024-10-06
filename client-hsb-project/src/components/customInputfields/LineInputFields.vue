<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';

import notificationsService from '@/service/notificationsService';
import DataTable from 'primevue/datatable';
import ProgressSpinner from 'primevue/progressspinner';
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
const loding = ref(true);
const customer = ref([]);
const displayName = ref();

const onRowDblClick = (event) => {
    console.log(event);
    displayName.value = event.data.displayName;

    emit('valueChanged', event.data.userId);
    visible.value = false;
};

onMounted(async () => {
    const res = await notificationsService.getAllUserLineIds();
  
    customer.value = res.data;
    
    if (props.id && props.id != null && props.id != '123') {
        const customerSelected = customer.value.find((value) => {
            if (value.userId == props.id) {
                return value.displayName;
            }
        });
        displayName.value = customerSelected.displayName;
    }
    loding.value = false;
    // console.log(displayName.value);
});
</script>

<template>
    <div>
        <InputGroup>
            <InputText placeholder="" v-model="displayName" readonly class="w-full" :disabled="modeReadonly" />

            <Button icon="pi pi-search" style="background-color: #192a51" @click="visible = true" :disabled="modeReadonly" />


            <Dialog v-model:visible="visible" maximizable modal header="ลูกค้า" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                
                <div class="card flex justify-center" v-if="loding">
                    <label>โหลดข้อมูล</label>
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>
                <DataTable v-else :value="customer" tableStyle="min-width: 50rem" paginator :rows="5" @row-dblclick="onRowDblClick" stripedRows :scrollable="true" selectionMode="single" :rowsPerPageOptions="[5, 10, 20, 50]">
                    <Column header="ชื่อ" field="displayName"> 
                        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <img alt="flag" :src="data.pictureUrl" style="width: 100px" />
                <span>{{ data.displayName }}</span>
            </div>
        </template>
                    </Column>           
                </DataTable>
            </Dialog>
        </InputGroup>
    </div>
</template>
