<script setup>
import { ref ,onMounted,defineProps,defineEmits} from 'vue';

import periodDetailService from '@/service/periodDetailService';
import DataTable from 'primevue/datatable';

const emit = defineEmits(['valueChanged']);
const props = defineProps({
    selectedValue: String,
    modeReadonly: {
    type: Boolean,
    default: false,
  },
});



const visible = ref(false);
const periodname = ref([]);
const periodName = ref();


const onRowDblClick = (event) =>{
console.log(event);
periodName.value = event.data.periodName 

emit('valueChanged',event.data.periodNameid)
visible.value =false;
}

onMounted(async()=>{
 
    const res = await periodDetailService.findAllPeriodName();

     periodname.value = res.data;
})
</script>

<template>
    <div>
        <InputGroup>
    <InputText placeholder="" v-model="periodName"    readonly
    :disabled="modeReadonly"  />

    <Button icon="pi pi-search" style="background-color:#192a51;" @click="visible = true" :disabled="modeReadonly"/>

    <Dialog v-model:visible="visible" maximizable modal header="งวด" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <DataTable :value="periodname" tableStyle="min-width: 50rem" paginator :rows="5"
            @row-dblclick="onRowDblClick"
            stripedRows
            :scrollable="true"
  
            selectionMode="single"
                :rowsPerPageOptions="[5, 10, 20, 50]">
                <Column header="ชื่องวด"  field="periodName"></Column>
          </DataTable>
        </Dialog>
</InputGroup>
    </div>
</template>