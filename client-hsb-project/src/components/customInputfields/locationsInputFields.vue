<script setup>
import { ref, onMounted, defineProps, defineEmits, toRefs } from 'vue';
import { LongdoMapLoad } from 'longdo-map-vue';
import longdoMapPage from './longdoMapPage.vue';
import customerService from '@/service/customerService';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
LongdoMapLoad({
  apiKey: '2dad446cee13a4155665e5000991ef93',
});

const emit = defineEmits(['update:modelValue', 'valueChanged']);
const props = defineProps({
  id: Number,
  modelValue: {
    type: String,
    required: true,
  },
  modeReadonly: {
    type: Boolean,
    default: false,
  },
  locationsCode: {
    type: String,
    default: "",
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  
});

// const {  locationsCode } = toRefs(props);
const visible = ref(false);
const customer = ref([]);
const locations = ref({ lon: 99, lat: 14 });

const alertUpdate = async() => {
    toast.add({
                    severity: 'success',
                    summary: 'Save Success',
                    detail: 'บันทึกที่ตั้งสำเร็จ',
                    life: 5000
                });
   await emit('valueChanged');
};
const alertLocations= () => {
    toast.add({
                    severity: 'error',
                    summary: 'Save Error',
                    detail: 'กรุณาเลือกที่ตัั้ง',
                    life: 5000
                });
};


onMounted(async () => {
  const res = await customerService.getAllCustomer();
  customer.value = res.data;
  console.log(props.locationsCode);
});
</script>

<template>
  <div>
    <InputGroup>
      <InputText 
        placeholder="" 
        :value="modelValue" 
        :disabled="modeReadonly"  
        @input="emit('update:modelValue', $event.target.value)" 
      />
      <Button 
        icon="pi pi-map-marker" 
        style="background-color:red" 
        @click="visible = true" 
        :disabled="modeReadonly" 
     
      />
    </InputGroup>

    <Dialog v-model:visible="visible" v-if="visible" maximizable modal header="ตำแหน่ง" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :pt="{
            root: {
                class: 'p-dialog-maximized'
            },
            content: {
                class: 'job-content'
            }
        }"
    >
      <div style="height: 100%; width: 100%;">
        <longdoMapPage :id="props.id"
        :locationsCode = "locationsCode"
        :lat="lat"
        :lon="lon"
        @location-updated="alertUpdate"
        @location-Wanning="alertLocations"
        ></longdoMapPage>
      </div>
    </Dialog>
  </div>
</template>
