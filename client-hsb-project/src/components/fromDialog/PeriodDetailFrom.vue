<script setup>
import { ref ,onMounted,defineProps,defineEmits,toRefs} from 'vue';

import projectService from '@/service/projectService';
import DataTable from 'primevue/datatable';

const emit = defineEmits(['valueChanged','close']);
const props = defineProps({
  fromVisible: Boolean,
  id: Number,
    selectedValue: String,
    modeReadonly: {
    type: Boolean,
    default: false,
  },
});
const { fromVisible, id } = toRefs(props);


const visible = ref(false);
const modeView = ref(true);


const periodDetail = ref([]);
const customerName = ref();

const handleClickClose = () =>{

    emit('close',false)
}
const onRowDblClick = (event) =>{

customerName.value = event.data.customerFirstname + " " +event.data.customerLastname

emit('valueChanged',event.data.customerid)
visible.value =false;
}

onMounted(async()=>{

    const res = await projectService.getPeriodDetail(id.value);

    periodDetail.value = res.data;
})
</script>

<template>
    <div>
        <InputGroup>
    <Dialog v-model:visible="fromVisible" maximizable modal header="งาน" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        @update:visible="handleClickClose"
    >
        <DataTable :value="periodDetail" tableStyle="min-width: 50rem" 
            @row-dblclick="onRowDblClick"
            stripedRows
            :scrollable="true"
  
            selectionMode="single"
   
                >
            <Column header="ชื่อ" field="periodName"> 
            <template #body="{index}">
                <InputText v-model="periodDetail[index].periodname.periodName"
                class="w-full" 
                :disabled="modeView"
                ></InputText>
            </template>
            </Column>
                <Column header="รายละเอียด"  field="description">
                    <template #body="{index}">
                <InputText v-model="periodDetail[index].description"
                class="w-full"
                :disabled="modeView"
                ></InputText>
            </template>
                </Column>
 
          </DataTable>
        </Dialog>
</InputGroup>
    </div>
</template>