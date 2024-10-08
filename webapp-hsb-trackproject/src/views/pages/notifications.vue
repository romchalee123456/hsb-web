<script setup>
import Card from 'primevue/card';
import { onMounted, ref } from 'vue';
import houseDeiailApproveFrom from '@/components/fromDialog/houseDeiailApproveFrom.vue';
import notificationsService from '@/service/notificationsService';

const visibleFrom = ref(false);
const houseDetailid = ref();
const notificationsId = ref();
const notificationsList = ref([]);
const notificationsCount = ref(0);

const onNotificationsClick = async (notificationsIds, houseDetailids) => {
    houseDetailid.value = houseDetailids;
    notificationsId.value = notificationsIds;
    visibleFrom.value = true;
    console.log(houseDetailids);
};

const fetchData = async () => {
    const res = await notificationsService.findAllNotification();

    notificationsList.value = res.data;
    notificationsCount.value = notificationsList.value.length;
};
onMounted(async () => {
    await fetchData();
});


</script>
<template>
    <houseDeiailApproveFrom
        v-if="visibleFrom"
        :fromVisible="houseDetailid"
        :id="houseDetailid"
        :notifications-id="notificationsId"
        @onClosed="
            (value) => {
                houseDetailid = value;
            }
        "
        :onload="fetchData"
    ></houseDeiailApproveFrom>
    <!-- Header Section -->
    <div class="header-top">
      <div class="pl-2 pr-2 pt-4">
        <a href="/"><i class="pi pi-chevron-left" style="font-size: 1.5rem; color: #192a51;"></i></a>
        </div>
        <div class=" flex justify-center items-center text-white p-0">
            <span class="pb-3" style="font-size: 1.5rem; letter-spacing: 0.1rem">รายการแจ้งเตือน</span>
        </div>
    </div>
    <div class="content bg-white content-gradient">
        <div class="px-5" v-for="notifications of notificationsList" :key="notifications.notificationsId">
            <div class="pt-3">
                <Card style="background-color: #e9f2f7 ; border-radius: 10px; box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2); " @Click="onNotificationsClick(notifications.notificationsId, notifications.houseDetailId)">
                    <template #title>
                        <span class="font-bold kanit-thin">{{ notifications.description }}</span></template
                    >
                    <template #content>
                        <p class="m-0">
                            {{ 'งานรอง :' + notifications.housedetail.houseDetailname.houseDetailName }}
                        </p>
                        <div class="col" style="font-size: 0.9rem">
                            {{ 'งานหลัก :' + notifications.housedetail.periodDetail.periodname.periodName }}
                        </div>
                        <div class="col" style="font-size: 0.9rem">
                            {{ '   โครงการ :' + notifications.housedetail.periodDetail.period.project.projectCode + '   งวด :' + notifications.housedetail.periodDetail.period.description }}
                        </div>
                    </template>
                    <template #footer>
                        <div class="flex justify-content-start gap-4"></div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<style>
.content-gradient {
    background: linear-gradient(to bottom, rgb(255, 255, 255) 100%, #79a1b8 0%);
}
</style>
