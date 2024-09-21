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
}
const { fromVisible } = toRefs(props);

const fromUploadFileVisible = ref(false);
const fromHistoryVisible = ref(false);


const notificationsList = ref([]);

const fetchData = async () => {

    const res = await notificationsService.findAllNotificationHistory(props.id);

    notificationsList.value = res.data;
}


onMounted(async () => {
    await fetchData();
})
</script>
<!-- {
    "status": "success",
    "data": [
        {
            "fileid": 1,
            "fileName": "คาน.png",
            "filePath": "https://เสาคานสําเร็จรูป.com/wp-content/uploads/2022/10/170364_210318_0-1024x768.jpg",
            "statusId": 1,
            "createOn": "2024-08-28T16:26:29.473Z",
            "houseDetailId": 1,
            "backUpStatus": 1,
            "fileBackupPath": "https://เสาคานสําเร็จรูป.com/wp-content/uploads/2022/10/170364_210318_0-1024x768.jpg"
        }
    ]
} -->
<template>
  
    <Dialog v-model:visible="fromVisible" modal :closable="false" :pt="{
        root: {
            class: 'p-dialog-maximized'
        },
        content: {
            class: 'job-content'
        }
    }" contentStyle="font-size: 1.5rem;padding:0px">
    
    
    <div class="flex justify-content-between flex-wrap pl-2 pr-2">
            <i class="pi pi-chevron-left" style="font-size: 1.5rem; color: #192a51" @click="onClosed"></i>
    </div>
        <Card>
            <template #content>
                <div class="content bg-white content-gradient ">
        <div class="px-5"
        v-for="(notifications) of notificationsList"
        :key="notifications.notificationsId"
          >
          <div class="pt-3">
          <Card @Click="onNotificationsClick(notifications.notificationsHistoryId,notifications.houseDetailId)">
        <template #title> <span class="font-bold kanit-thin">{{ notifications.notificationsType.notificationsTypeName +" "+notifications.description }}</span> </template>
    
        <template #footer>
          <div class="flex justify-content-start gap-4">

 
          </div>
        </template>
    </Card>
  </div>
  
        </div>
    
      </div>
                

            </template>
        </Card>
    </Dialog>
</template>
