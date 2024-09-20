<script setup>
import { ref, onMounted, defineProps, defineEmits ,toRefs} from 'vue';
import houseDetailService from '@/service/houseDetailService';
import Textarea from 'primevue/textarea';
import houseDeiailSendApproveFrom from './houseDeiailSendApproveFrom.vue';
import periodDetailService from '@/service/periodDetailService';
const emit = defineEmits(['valueChanged','onClosed']);
const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    onload: Function
});
const onClosed = () =>{
emit('onClosed',false);
}
const houesDetailList = ref([]);
const { fromVisible } = toRefs(props);

const fromApproveVisible = ref(false);
const houseDetailid = ref(0);
const periodDetail = ref([]);
const description = ref("");


const houseDetailSendApproveFrom = async(value) =>{
    fromApproveVisible.value = true;

    houseDetailid.value = value;
}


const fetchData = async() =>{
    const res = await houseDetailService.findAllHouseDetail(props.id);
    const res1 = await periodDetailService.findPeriodDetailById(props.id);
    houesDetailList.value = res.data;
    description.value = res1.data.description;

}

onMounted(async()=>{
await fetchData();
})

</script>
<template>
        <houseDeiailSendApproveFrom
    v-if="fromApproveVisible"
    :fromVisible="fromApproveVisible"
    :id="houseDetailid"
       @onClosed="(value)=>{fromApproveVisible = value}"
    ></houseDeiailSendApproveFrom>
    <Dialog
        v-model:visible="fromVisible"
        modal
        :closable="false"
        :pt="{
            root: {
                class: 'p-dialog-maximized'
            },
            content: {
                class: 'job-content'
            }
        }"
        contentStyle="font-size: 1.5rem;padding:0px"
    >
        <div class="flex justify-content-between flex-wrap pl-2 pr-2">
            <i class="pi pi-chevron-left" style="font-size: 1.5rem; color: #192a51" @click="onClosed"></i>
            <span style="font-size: 1.5rem;color:#192a51;"> รายละเอียดงาน</span>
            <div>
                <i class="pi pi-save text-white" style="font-size: 1.5rem"></i>
            </div>
        </div>
        <div class="grid pt-3 col">
            <div class="col-12 navbarApp">
                <div class="pl-4 pr-4">
               
                   
                </div>
            </div>
            <div class="col-12 diagonal-gradient">
                <div class="pl-4 pr-4">
                    <Textarea class="w-full bg-primary text-white" v-model="description"></Textarea>
                </div>
            </div>
         
            <div class="pl-4 pr-4 col" v-for="houesDetail of houesDetailList" :key="houesDetail.houseDetailid">
                <Card @Click="houseDetailSendApproveFrom(houesDetail.houseDetailid)">
        <template #title> {{ houesDetail.houseDetailname.houseDetailName}}</template>
        <template #content>
     
        </template>
                 </Card>
            </div>

        </div>
    </Dialog>
</template>
