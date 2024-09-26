<script setup>
import Card from 'primevue/card';
import userService from '@/service/userService';
import loginService from '@/service/loginService';
import { onMounted, ref } from 'vue';
import InputText from 'primevue/inputtext';
import logo from '@/assets/image/huglogo1-ai.png';
import projectTrackingService from '@/service/projectTrackingService';
import { useRoute } from 'vue-router';
import router from '@/router';
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

const toPeriodDetail = (periodDetailId) => {
    router.push('periodDetail/' + route.params.id + '/' + periodDetailId);
};

const fetchData = async () => {
    const projectId = route.params.id;
    const res = await projectTrackingService.findProjectById(projectId);

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

const toNotifications = async () => {
    router.push('/notifications');
};
onMounted(async () => {
    await fetchData();
});
</script>
<template>
    <!-- Header Section -->
    <div class="header-top">
        <div class="flex justify-between items-center navbarApp pb-2 pl-0 pr-0 pt-4">
            <!-- Left Side -->
            <a href="/"><i class="pi pi-chevron-left" style="font-size: 1.5rem; color: #192a51"></i></a>

            <!-- Right Side -->
            <div class="flex items-center space-x-4">
                <!-- <OverlayBadge value="2" severity="danger"> -->
                    <i class="pi pi-bell" style="font-size: 2rem"   @click="toNotifications"/>
                <!-- </OverlayBadge> -->
                <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" style="background-color: transparent; padding: 0; border: 0"></Button>
                <Menu ref="menu" id="overlay_menu" :model="items" :popup="true"></Menu>
            </div>
        </div>

        <div class="grid">
            <div class="col-12 p-0 navbarApp text-white">
                <div class="font-bold" style="padding-left: 4rem; padding-right: 4rem">
                    <span class="p-2" style="font-size: 1.2rem; letter-spacing: 0.1rem">รหัสโครงการ : {{ projectCode }}</span>
                    <span class="p-2" style="font-size: 1.2rem; letter-spacing: 0.1rem">งวด : {{ periodTotal }}</span>
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

    <div class="content bg-white content-gradient">
        <div class="col-12 p-0 text-white">
            <div class="font-bold flex justify-end items-center" style="padding-left: 3rem; padding-right: 3rem; padding-top: 0.4rem">
                <span class="p-2" style="font-size: 1rem; letter-spacing: 0.1rem; border: 2px; border-radius: 15px; background-color: #19bf62">อนุมัติ : {{ periodApproveTotal }}</span>
            </div>
        </div>

        <div class="px-5 pt-2" v-for="period of periodList" :key="period.periodid">
            <div class="pt-[2px] pb-3">
                <Card style="background-color: #e9f2f7; border-radius: 10px; box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2)" @click="toPeriodDetail(period.periodid)">
                    <template #title>
                        <div class="flex justify-between items-center w-full">
                            <span class="font-bold kanit-thin">{{ period.description }}</span>
                            <Badge style="font-size: 1rem; letter-spacing: 0.1rem; border-radius: 5px" v-if="period.periodStatusId == 1" :value="period.periodStatus.periodStatusName" severity="secondary"></Badge>
                            <Badge style="font-size: 1rem; letter-spacing: 0.1rem; border-radius: 5px" v-if="period.periodStatusId == 2" :value="period.periodStatus.periodStatusName" severity="warn"></Badge>
                            <Badge style="font-size: 1rem; letter-spacing: 0.1rem; border-radius: 5px" v-if="period.periodStatusId == 3" :value="period.periodStatus.periodStatusName" severity="success"></Badge>
                        </div>
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
