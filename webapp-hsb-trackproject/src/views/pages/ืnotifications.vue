
<script setup>
import Card from 'primevue/card';
import loginService from '@/service/loginService';
import { onMounted, ref } from 'vue';
import logo from '@/assets/image/huglogo1-ai.png';
import houseDeiailApproveFrom from '@/components/fromDialog/houseDeiailApproveFrom.vue';
const firstname = ref('');
const lastname = ref('');
const role = ref([
  { id: 1, name: 'admin' },
  { id: 2, name: 'ผู้ดูแลโครงการ' },
  { id: 3, name: 'หัวหน้าช่าง' },

]);

const visibleFrom = ref(false);
const houseDetailid = ref();
const notificationsId = ref();

const notificationsList = ref([]);
const selectedRole = ref();
import notificationsService from '@/service/notificationsService';
const menu = ref();
const items = ref([
    {
        // label: 'Options',
        items: [
            // {
            //     label: 'รีโหลด',
            //     icon: 'pi pi-refresh'
            // },
            {
                label: 'ออกจากระบบ',
                icon: 'pi pi-upload',
                command: () => {
                  loginService.logout();
        }
               
            }
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

const onNotificationsClick = async (notificationsIds,houseDetailids) => {

  houseDetailid.value = houseDetailids;
  notificationsId.value = notificationsIds;
  visibleFrom.value = true;
  console.log(houseDetailids);
}


const fetchData = async () => {

  const res = await notificationsService.findAllNotification();

  notificationsList.value = res.data;

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
    @onClosed="(value)=>{houseDetailid = value}"
    :onload="fetchData"
    ></houseDeiailApproveFrom>
      <!-- Header Section -->
      <div class="header-top">
        <div class=" flex flex-wrap justify-end  navbarApp pb-2 pl-0 pr-0 pt-4" >
    
        <Button
              type="button"
              icon="pi pi-ellipsis-v"
              @click="toggle"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              style="background-color: transparent;padding: 0;border: 0;"
            />
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    
    </div>
        <div class="grid">
        
  
          <div class="col-12 p-0">
            <div class="col-12 grid p-0 navbarApp">
              <div class="col-4 p-0 flex justify-end">
                <Image :src="logo" alt="Image" width="50" h image-style="border-radius: 50%;" />
              </div>
  
              <div class="col-8 p-0 navbarApp text-white">
                <div class=" font-bold">
                  <span class="p-2" style="font-size: 1.2rem">{{ firstname }}</span>
                  <span class="p-2" style="font-size: 1.2rem">{{ lastname }}</span>
                </div>
                <div class=" font-bold">
                  <span class="p-2"  style="font-size: 1rem">ตำแหน่ง : {{ selectedRole }}</span>
               
                </div>
              </div>
            </div>
   
          </div>
        </div>
      </div>
      <!-- {
    "status": "success",
    "data": [
        {
            "notificationsId": 4,
            "description": "",
            "notificationsTypeId": 1,
            "createBy": 1,
            "actionNotificationsId": 1,
            "houseDetailId": 1,
            "actionNotifications": {
                "actionNotificationsId": 1,
                "createOn": "2024-09-17T21:08:24.000Z",
                "actionNotificationsName": "ส่งอนุมัติ"
            },
            "notificationsType": {
                "notificationsTypeId": 1,
                "createOn": "2024-09-17T21:13:15.000Z",
                "notificationsTypeName": "ส่งอนุมัติ"
            },
            "housedetail": {
                "houseDetailid": 1,
                "createOn": "2024-08-28T16:26:29.466Z",
                "houseDetailNameId": 1,
                "periodDetailid": 1,
                "houseDetailStatus": 2,
                "houseDetailname": {
                    "houseDetailNameid": 1,
                    "createOn": "2024-08-28T16:26:29.459Z",
                    "houseDetailName": "House Detail Alpha"
                },
                "periodDetail": {
                    "periodDetailid": 1,
                    "periodid": 1,
                    "projectid": 1,
                    "description": "Detail for Phase 1 of Project Alpha",
                    "createOn": "2024-08-28T16:26:29.452Z",
                    "periodDetailStatusId": 1,
                    "periodnameid": 1,
                    "period": {
                        "periodid": 1,
                        "projectid": 1,
                        "description": "Initial period for Project Alpha",
                        "createOn": "2024-08-28T16:26:29.429Z",
                        "periodStatusId": 1,
                        "project": {
                            "projectid": 1,
                            "projectName": "Project Alpha",
                            "projectCode": "PA123",
                            "description": "First major project.",
                            "createOn": "2024-08-28T16:26:29.412Z",
                            "amount": "10000",
                            "userid": 1,
                            "projectStatusid": 1,
                            "responseid": 1,
                            "locationName": "ห้างบิ๊กซี สะพานควาย",
                            "locationCode": "A00132281",
                            "lat": "13.791113",
                            "lon": "100.54911",
                            "customerid": 1
                        }
                    }
                }
            }
        }
    ]
} -->
      <div class="content bg-white content-gradient ">
        <div class="px-5"
        v-for="(notifications) of notificationsList"
        :key="notifications.notificationsId"
          >
          <div class="pt-3">
          <Card @Click="onNotificationsClick(notifications.notificationsId,notifications.houseDetailId)">
        <template #title> <span class="font-bold kanit-thin">{{ notifications.description }}</span></template>
        <template #content>
            <p class="m-0">
               {{"งาน :"+ notifications.housedetail.houseDetailname.houseDetailName }}
            </p>
            <div class="col" style="font-size: 0.9rem;">
{{ "งานหลัก :"+ notifications.housedetail.periodDetail.periodname.periodName }}
            </div>
            <div class="col" style="font-size: 0.9rem;">
{{  "   โครงการ :"
               + notifications.housedetail.periodDetail.period.project.projectCode   + "   งวด :"+ notifications.housedetail.periodDetail.period.description}}
            </div>
        
        </template>
        <template #footer>
          <div class="flex justify-content-start gap-4">

 
          </div>
        </template>
    </Card>
  </div>
  
        </div>
    
      </div>
  

    
   
  </template>

  <style>
.content-gradient {
  background: linear-gradient(to bottom, rgb(255, 255, 255) 70%, #79a1b8 30%);
}
</style>
  
  
  