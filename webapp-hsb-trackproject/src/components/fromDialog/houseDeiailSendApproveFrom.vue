<script setup>
import { ref, watch, onMounted, defineProps, defineEmits, toRefs } from 'vue';
import Textarea from 'primevue/textarea';
import houseDetailService from '@/service/houseDetailService';
import uploadFile from './uploadFile.vue';
import { useToast } from 'primevue/usetoast';
import houseDeiailApproveHistory from './houseDeiailApproveHistory.vue';
import notificationsService from '@/service/notificationsService';
import apiName from '@/service/currentName';
const toast = useToast();
const emit = defineEmits(['valueChanged', 'onClosed']);
const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    onload: Function
});
const onClosed = () => {
    emit('onClosed', false);
};
const { fromVisible } = toRefs(props);

const fromHistoryVisible = ref(false);
const fromUploadFileVisible = ref(false);
const houseDetailName = ref('');
const houseDetailStatus = ref();
const houseDetailDescriptions = ref('');

const fileList = ref([]);
const deleteUploadFile = ref([]);

const fetchData = async () => {
    const res = await houseDetailService.findAllFileByHouseDetail(props.id);
    const res1 = await houseDetailService.findHouseDetailById(props.id);

    fileList.value = res.data;
    houseDetailName.value = res1.data.houseDetailname.houseDetailName;
    houseDetailStatus.value = res1.data.houseDetailStatus;
};

const deleteFileFromDatabase = async (fileid) => {
    await houseDetailService.deleteFileByID(fileid); // Adjust according to your service
};

const uploadFileDelete = async (index, file) => {
    await deleteFileFromDatabase(file.fileid);
    fileList.value.splice(index, 1);
    deleteUploadFile.value.push(file);
    await fetchData();

    toast.add({
        severity: 'success',
        summary: 'Delete Success',
        detail: 'ลบรูปภาพสำเร็จ',
        life: 5000
    });
};

// Show dialog based on a condition or event
const showDialog = () => {
    fromUploadFileVisible.value = true;
};
const showDialogHistory = () => {
    fromHistoryVisible.value = true;
};
const sendApprove = async () => {
    const notifications = {
        description: houseDetailDescriptions.value,
        houseDetailId: props.id
    };

    await notificationsService.createNewNotification(notifications);

    await fetchData();
};
onMounted(async () => {
    await fetchData();
});
</script>

<template>
    <uploadFile :fromVisible="fromUploadFileVisible" @buttonClose="fromUploadFileVisible = false" :onload="fetchData" :id="props.id" />

    <houseDeiailApproveHistory
        v-if="fromHistoryVisible"
        :fromVisible="fromHistoryVisible"
        :id="props.id"
        @onClosed="
            (value) => {
                fromHistoryVisible = value;
            }
        "
        :onload="fetchData"
    ></houseDeiailApproveHistory>

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
            <div class="flex justify-stretch flex-wrap pb-3 pt-2">
                <i class="pi pi-chevron-left pr-5" style="font-size: 1.2rem; color: #192a51" @click="onClosed"></i>
                <div>
                    <h1>
                        <span class="p-1 text-white pr-8" style="font-size: 1.1rem; letter-spacing: 0.1rem">{{ houseDetailName }}</span>
                        <Badge v-if="houseDetailStatus == 1" :value="'ร่าง'" severity="secondary"></Badge>
                        <Badge v-if="houseDetailStatus == 2" :value="'รออนุมัติ'" severity="warn"></Badge>
                        <Badge v-if="houseDetailStatus == 3" :value="'อนุมัติ'" severity="success"></Badge>
                    </h1>
                </div>
            </div>
        </div>
        <div class="grid col p-0 justify-center">
            <div class="col-12 diagonal-gradient">
                <div class="pl-4 pr-4">
                    <Textarea class="w-full bg-primary text-white" v-model="houseDetailDescriptions"></Textarea>
                </div>
            </div>
            <div class="pl-2 ">
                <div v-if="houseDetailStatus == 1">
                    <Button style="margin-right: 5px; margin-left: 5px"><span style="font-size: 0.8rem" @click="showDialog">เพิ่มรูป</span></Button>
                    <Button @click="visible = true" style="margin-right: 5px"><span style="font-size: 0.8rem" @click="sendApprove">ส่งอนุมัติ</span></Button>
                    <Button @click="visible = true"><span style="font-size: 0.8rem" @click="showDialogHistory">ประวัติ</span></Button>
                </div>
            </div>
        </div>

        <Card>
            <template #content>
                <div v-for="file of fileList" :key="file.fileid">
                    <div class="pb-3">
                        <div class="bg-primary grid col-12 rounded-md">
                            <div class="col-4">
                                <Image :src="apiName +'/'+ file.filePath" alt="Image" width="150rem" preview />
                            </div>
                            <div class="col-8 flex flex-column">
                                <span style="color: aliceblue; font-size: 1.1rem">{{ file.fileName }}</span>
                                <div class="flex justify-end">
                                    <Button @click="uploadFileDelete(index, file)" style="background-color: #fede00; border: black">
                                        <i class="pi pi-trash text-black" style="font-size: 2rem; border: black; box-sizing: 1px"> </i>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </Dialog>
</template>
<style>
.p-dialog-header {
    background: #567a8f;
    padding: 0px;
};

</style>