<script setup>
import { ref ,onMounted,defineProps,defineEmits} from 'vue';

import customerService from '@/service/customerService';
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
const customer = ref([]);
const customerName = ref();

const onRowDblClick = (event) =>{
console.log(event);
customerName.value = event.data.customerFirstname + " " +event.data.customerLastname

emit('valueChanged',event.data.customerid)
visible.value =false;
}

onMounted(async()=>{
 
    const res = await customerService.getAllCustomer();

     customer.value = res.data;
})
</script>

<template>
    <div>
        <InputGroup>
    <InputText placeholder="" v-model="customerName"    readonly class="w-full"
    :disabled="modeReadonly"  />

    <Button icon="pi pi-search" style="background-color:#192a51;" @click="visible = true" :disabled="modeReadonly"/>

    <Dialog v-model:visible="visible" maximizable modal header="ลูกค้า" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <DataTable :value="customer" tableStyle="min-width: 50rem" paginator :rows="5"
            @row-dblclick="onRowDblClick"
            stripedRows
            :scrollable="true"
  
            selectionMode="single"
                :rowsPerPageOptions="[5, 10, 20, 50]">
            <Column header="ชื่อ" field="customerFirstname"> </Column>
                <Column header="นามสกุล"  field="customerLastname"></Column>
                <Column header="เบอร์โทรศัพท์" field="customerPhone"></Column>
                <Column header="ไอดี-ไลน์" field="customerLine"></Column>
          </DataTable>
        </Dialog>
</InputGroup>
    </div>
</template>