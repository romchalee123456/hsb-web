<script setup>
import Card from 'primevue/card';
import userService from '@/service/userService';
import loginService from '@/service/loginService';
import { onMounted, ref } from 'vue';
import InputText from 'primevue/inputtext';
import logo from '@/assets/image/huglogo1-ai.png';
import projectService from '@/service/projectService';
import { useRoute } from 'vue-router';

const route = useRoute();
const firstname = ref('');
const lastname = ref('');
const role = ref([
    { id: 1, name: 'admin' },
    { id: 2, name: 'ผู้ดูแลโครงการ' },
    { id: 3, name: 'หัวหน้าช่าง' }
]);
const projectName = ref(0);
const projectCode = ref(0);
const description = ref(0);
const periodList = ref([]);
const selectedRole = ref();
const periodTotal = ref(0);
const periodApproveTotal = ref(0);

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

import router from '@/router';

// {
//     "status": "success",
//     "data": {
//         "projectid": 1,
//         "projectName": "บ้านทรัพย์อนัน-คุณกลาง",
//         "projectCode": "PRJ001",
//         "description": "บ้านคุณกลาง ",
//         "createOn": "2024-08-27T14:15:47.396Z",
//         "amount": "1000",
//         "userid": null,
//         "projectStatusid": 1,
//         "responseid": 1
//     },
//     "periodData": [
//         {
//             "periodid": 1,
//             "projectid": 1,
//             "description": "งวดที่ 1",
//             "createOn": "2024-08-27T14:15:47.410Z",
//             "periodStatusId": 1,
//             "periodnameid": 1,
//             "periodStatus": {
//                 "periodStatusName": "ปิด"
//             }
//         }
//     ]
// }

const fetchData = async () => {
    const projectId = route.params.id;
    const res = await projectService.findProjectById(projectId);

    projectName.value = res.data.projectName;
    projectCode.value = res.data.projectCode;
    description.value = res.data.description;
    periodList.value = res.periodData;
    periodTotal.value = periodList.value.length;
    periodApproveTotal.value = res.countApprovePeriod;

    const resUser = await userService.getDefult();
    firstname.value = resUser.data.firstname;
    lastname.value = resUser.data.lastname;

    selectedRole.value = role.value[resUser.data.role - 1].name;
};
onMounted(async () => {
    await fetchData();
});
</script>
<template>
    <!-- Header Section -->
    <div class="header-top">
        <div class="flex flex-wrap justify-end navbarApp pb-0 pl-0 pr-0 pt-4">
            <OverlayBadge value="2" severity="danger">
                <i class="pi pi-bell" style="font-size: 2rem" />
            </OverlayBadge>
            <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" style="background-color: transparent; padding: 0; border: 0" />
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
        <div class="grid">
            <div class="col-12 p-0">
                <div class="col-12 grid p-0 navbarApp">
                    <div class="col-4 p-0 flex justify-end">
                        <Image :src="logo" alt="Image" width="50" h image-style="border-radius: 50%;" />
                    </div>

                    <div class="col-8 p-0 navbarApp text-white">
                        <div class="font-bold">
                            <span class="p-2" style="font-size: 1.2rem; letter-spacing: 0.1rem">{{ firstname }}</span>
                            <span class="p-2" style="font-size: 1.2rem; letter-spacing: 0.1rem">{{ lastname }}</span>
                        </div>
                        <div class="font-bold">
                            <span class="p-2" style="font-size: 1rem; letter-spacing: 0.1rem">ตำแหน่ง : {{ selectedRole }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-12 p-0 navbarApp text-white">
                    <div class="font-bold" style="padding-left: 4rem; padding-right: 4rem; padding-top: 1.5rem">
                        <span class="p-2" style="font-size: 1rem; letter-spacing: 0.1rem">รหัสโครงการ : {{ projectCode }}</span>
                        <span class="p-2" style="font-size: 1rem; letter-spacing: 0.1rem">งวด : {{ periodTotal }}</span>
                    </div>
                </div>
                <div class="col-12 p-0 navbarApp text-white">
                    <div class="font-bold" style="padding-left: 4rem; padding-right: 4rem; padding-top: 0.5rem">
                        <span class="p-2" style="font-size: 1rem; letter-spacing: 0.1rem">โครงการ : {{ projectName }}</span>
                    </div>
                </div>
                <div class="col-12 p-0 navbarApp text-white">
                    <div class="font-bold" style="padding-left: 4rem; padding-right: 4rem; padding-top: 0.5rem">
                        <span class="p-2" style="font-size: 0.8rem; letter-spacing: 0.1rem">รายละเอียด : {{ description }}</span>
                    </div>
                </div>
                <div class="col-12 text-center pt-0 pl-6 pr-6 pb-0 diagonal-gradient">
                    <div class="col">
                        <InputGroup>
                            <InputGroupAddon class="bg-primary text-white">
                                <i class="pi pi-search"></i>
                            </InputGroupAddon>
                            <InputText class="w-full bg-primary text-white" placeholder="ค้นหา" />
                        </InputGroup>
                    </div>
                </div>
                <!-- Content Section -->
            </div>
        </div>
    </div>

    <div class="content bg-white content-gradient">
        <div class="col-12 p-0 text-white">
            <div class="font-bold flex justify-end items-center" style="padding-left: 4rem; padding-right: 4rem; padding-top: 0.5rem">
                <span class="p-2" style="font-size: 1rem; letter-spacing: 0.1rem; border: 2px; background-color: #192a51">อนุมัติ : {{ periodApproveTotal }}</span>
            </div>
        </div>

        <div class="px-5" v-for="period of periodList" :key="period.periodid">
            <div class="pt-[2px]">
                <Card>
                    <template #title>
                        <div class="flex justify-between items-center  w-full">
                            <span class="font-bold kanit-thin">{{ period.description }}</span>             
                            <Badge style="font-size: 1.1rem; letter-spacing: 0.1rem; border-radius: 5px " v-if="period.periodStatusId == 1" :value="period.periodStatus.periodStatusName" severity="secondary"></Badge>
                            <Badge style="font-size: 1.1rem; letter-spacing: 0.1rem; border-radius: 5px" v-if="period.periodStatusId == 2" :value="period.periodStatus.periodStatusName" severity="warn"></Badge>
                            <Badge style="font-size: 1.1rem; letter-spacing: 0.1rem; border-radius: 5px" v-if="period.periodStatusId == 3" :value="period.periodStatus.periodStatusName" severity="success"></Badge>
                        </div>
                    </template>

                        
                    <template #content> </template>
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
