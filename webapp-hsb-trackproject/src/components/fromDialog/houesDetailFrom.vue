<script setup>
import { ref, onMounted, defineProps, defineEmits, toRefs } from 'vue';
import houseDetailService from '@/service/houseDetailService';
import Textarea from 'primevue/textarea';
import houseDeiailSendApproveFrom from './houseDeiailSendApproveFrom.vue';
import periodDetailService from '@/service/periodDetailService';
const emit = defineEmits(['valueChanged', 'onClosed']);
const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    onload: Function
});
const onClosed = () => {
    emit('onClosed', false);
};
const houesDetailList = ref([]);
const { fromVisible } = toRefs(props);

const fromApproveVisible = ref(false);
const houseDetailid = ref(0);
const description = ref('');
const houesDetailTotal = ref(0);

const houseDetailSendApproveFrom = async (value) => {
    fromApproveVisible.value = true;

    houseDetailid.value = value;
};

const fetchData = async () => {
    const res = await houseDetailService.findAllHouseDetail(props.id);
    const res1 = await periodDetailService.findPeriodDetailById(props.id);
    houesDetailList.value = res.data;
    description.value = res1.data.description;
    houesDetailTotal.value = houesDetailList.value.length;
};

onMounted(async () => {
    await fetchData();
});
</script>
<template>
    <houseDeiailSendApproveFrom
        v-if="fromApproveVisible"
        :fromVisible="fromApproveVisible"
        :id="houseDetailid"
        @onClosed="
            (value) => {
                fromApproveVisible = value;
            }
        "
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
        <div class="header-top p-0">
            <div class="pl-2 pr-2 pt-4">
                <i class="pi pi-chevron-left" style="font-size: 1.5rem; color: #192a51" @click="onClosed"></i>
            </div>
            <div class="flex justify-center items-center text-white p-0">
                <span class="pb-3" style="font-size: 1.5rem; letter-spacing: 0.1rem">งานรอง : {{ houesDetailTotal }}</span>
            </div>
        </div>
        <div class="grid col p-0">
            <div class="col-12 diagonal-gradient p-0">
                <div class="pl-4 pr-4">
                    <Textarea class="w-full bg-primary text-white" v-model="description"></Textarea>
                </div>
            </div>

            <div class="pl-4 pr-4 col" v-for="houesDetail of houesDetailList" :key="houesDetail.houseDetailid">
                <Card style="background-color: #e9f2f7; border-radius: 10px; box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2)" @Click="houseDetailSendApproveFrom(houesDetail.houseDetailid)">
                    <template #title> {{ houesDetail.houseDetailname.houseDetailName }}</template>
                    <template #content>
                        <Badge v-if="houesDetail.houseDetailStatus == 1" :value="'ร่าง'" severity="secondary"></Badge>
                        <Badge v-if="houesDetail.houseDetailStatus == 2" :value="'รออนุมัติ'" severity="warn"></Badge>
                        <Badge v-if="houesDetail.houseDetailStatus == 3" :value="'อนุมัติ'" severity="success"></Badge>
                    </template>
                </Card>
            </div>
        </div>
    </Dialog>
</template>
<style>
.p-dialog-header {
    background: #567a8f;
    padding: 0px;
}
</style>
