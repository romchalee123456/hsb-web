<script setup>
import { ref, watch, onMounted, defineProps, defineEmits, toRefs } from 'vue';
import Textarea from 'primevue/textarea';
import houseDetailService from '@/service/houseDetailService';
import uploadFile from './uploadFile.vue';
import { useToast } from 'primevue/usetoast';
import notificationsService from '@/service/notificationsService';
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

const fromUploadFileVisible = ref(false);
const fromHistoryVisible = ref(false);

const notificationsList = ref([]);

const fetchData = async () => {
    const res = await notificationsService.findAllNotificationHistory(props.id);

    notificationsList.value = res.data;
};

onMounted(async () => {
    await fetchData();
});
</script>

<template>
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
            <div class="flex justify-content-between flex-wrap pl-2 pr-2">
                <i class="pi pi-chevron-left" style="font-size: 1.5rem; color: #192a51" @click="onClosed"></i>
            </div>
            <div class="flex justify-center items-center text-white p-0">
                <span class="pb-3" style="font-size: 1.5rem; letter-spacing: 0.1rem">ประวัติการส่งอนุมัติ</span>
            </div>
        </div>
        <Card style="height: 79vh;">
            <template #content>
                <div class="content bg-white content-gradient">
                    <div class="px-5" v-for="notifications of notificationsList" :key="notifications.notificationsId">
                        <div class="pt-3">
                            <Card style="background-color: #e9f2f7; border-radius: 10px; box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2)">
                                <template #title>
                                    <span class="font-bold kanit-thin">{{ notifications.notificationsType.notificationsTypeName + ' ' + notifications.description }}</span>
                                </template>
                            </Card>
                        </div>
                    </div>
                    <br>
                </div>
            </template>
        </Card>
    </Dialog>
</template>
