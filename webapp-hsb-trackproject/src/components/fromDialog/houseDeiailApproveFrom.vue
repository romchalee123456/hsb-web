<script setup>
import { ref, watch, onMounted, defineProps, defineEmits, toRefs } from 'vue';
import Textarea from 'primevue/textarea';
import houseDetailService from '@/service/houseDetailService';
import uploadFile from './uploadFile.vue';
import { useToast } from 'primevue/usetoast';
import notificationsService from '@/service/notificationsService';
import houseDeiailApproveHistory from './houseDeiailApproveHistory.vue';
import ConfirmDialog from 'primevue/confirmdialog';
const toast = useToast();
import apiName from '@/service/currentName';
const emit = defineEmits(['valueChanged', 'onClosed']);
const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    notificationsId: Number,
    onload: Function
});
const onClosed = () => {
    emit('onClosed', false);
};
const { fromVisible } = toRefs(props);

const fromHistoryVisible = ref(false);
const buttonVisible = ref(true);
const houseDetailName = ref('');
const houseDetailStatus = ref();
const houseDetailDescriptions = ref();
const notifications = ref();

const fileList = ref([]);

const fetchData = async () => {
    const res = await houseDetailService.findAllFileByHouseDetail(props.id);
    const res1 = await houseDetailService.findHouseDetailById(props.id);
    const res2 = await notificationsService.findNotificationById(props.notificationsId);
    fileList.value = res.data;
    houseDetailName.value = res1.data.houseDetailname.houseDetailName;
    houseDetailStatus.value = res1.data.houseDetailStatus;
    notifications.value = res2.data;
};

const approveNotificationsId = async (notificationsId) => {
    const description = { description: houseDetailDescriptions.value };
    console.log(description);
    await notificationsService.approveNotification(notificationsId, description);
    await props.onload();
    buttonVisible.value = false;
};

const sendBackNotification = async (notificationsId) => {
    const description = { description: houseDetailDescriptions.value };
    await notificationsService.sendBackNotification(notificationsId, description);
    await props.onload();
    buttonVisible.value = false;
};
// Show dialog based on a condition or event
const showDialog = () => {
    fromHistoryVisible.value = true;
};

onMounted(async () => {
    console.log(props.notificationsId);
    await fetchData();
});
</script>

<template>
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
        contentStyle="font-size: 1.5rem; padding:0px"
    >
        <div class="header-top p-0">
            <div class="flex align-item-center flex-wrap pl-2 pr-2 pt-2">
                <i class="pi pi-chevron-left pr-5" style="font-size: 1.5rem; color: #192a51" @click="onClosed"></i>
                <div>
                    <h1>
                        <span class="p-2 text-white pr-2" style="font-size: 1.5rem; letter-spacing: 0.1rem">{{ houseDetailName }}</span>
                        <Badge v-if="houseDetailStatus == 1" :value="'ร่าง'" severity="secondary"></Badge>
                        <Badge v-if="houseDetailStatus == 2" :value="'รออนุมัติ'" severity="warn"></Badge>
                        <Badge v-if="houseDetailStatus == 3" :value="'อนุมัติ'" severity="success"></Badge>
                    </h1>
                </div>

                <div class="pl-2">
                    <Button @click="visible = true"><span style="font-size: 0.8rem" @click="showDialog">ประวัติ</span></Button>
                </div>
            </div>
            <div class="pl-4 pr-4 text-white p-0" v-if="notifications">
                <div class="col" style="font-size: 1.3rem; letter-spacing: 0.1rem">
                    {{ 'งานหลัก : ' + notifications.housedetail.periodDetail.periodname.periodName }}
                </div>
                <div class="col" style="font-size: 1rem; letter-spacing: 0.1rem">
                    {{ '   โครงการ : ' + notifications.housedetail.periodDetail.period.project.projectCode }}
                </div>
                <div class="col" style="font-size: 1rem; letter-spacing: 0.1rem">
                    {{ '   งวด : ' + notifications.housedetail.periodDetail.period.description }}
                </div>
                <div class="col" style="font-size: 1rem; letter-spacing: 0.1rem">
                    {{ '   รายละเอียด : ' + notifications.description }}
                </div>
            </div>
        </div>
        <div class="col-12 diagonal-gradient p-0">
            <div class="pl-4 pr-4">
                <Textarea class="w-full bg-primary text-white" placeholder="ความเห็น" v-model="houseDetailDescriptions"></Textarea>
            </div>
        </div>

        <div class="flex flex-wrap gap-4 justify-center">
            <Button label="อนุมัติ" icon="pi pi-check" @click="approveNotificationsId(props.notificationsId)" v-if="buttonVisible" />
            <Button label="ส่งกลับ" icon="pi pi-user" @click="sendBackNotification(props.notificationsId)" v-if="buttonVisible" />
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
                                <div class="flex justify-end"></div>
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
}
</style>
