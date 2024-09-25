<script setup>
import Card from 'primevue/card';
import userService from '@/service/userService';
import loginService from '@/service/loginService';
import { onMounted, ref } from 'vue';
import logo from '@/assets/image/huglogo1-ai.png';
import projectService from '@/service/projectService';
import { useRoute } from 'vue-router';
import houesDetailFrom from '@/components/fromDialog/houesDetailFrom.vue';

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
const periodDetailid = ref();
const selectedRole = ref();
const periodTotal = ref(0);
const periodApproveTotal = ref(0);
const fromVisible = ref(false);
const periodList = ref([]);
const periodDetalList = ref([]);

const menu = ref();
const items = ref([
    {
        // label: 'Options',
        items: [
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

//
const houseDetailFrom = (value) => {
    fromVisible.value = true;
    console.log(value);
    periodDetailid.value = value;
};

const toPeriod = () => {
    router.push('/period/' + route.params.id);
};

const fetchData = async () => {
    const projectId = route.params.id;
    const periodId = route.params.periodId;

    const res = await projectService.findProjectById(projectId);
    const resPeriodDetail = await projectService.getPeriodDetail(periodId);
    
    periodDetalList.value = resPeriodDetail.data;
    projectName.value = res.data.projectName;
    projectCode.value = res.data.projectCode;
    description.value = res.data.description;
    periodList.value = res.periodData;
    periodTotal.value = periodDetalList.value.length;
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
    <houesDetailFrom
        v-if="fromVisible"
        :fromVisible="fromVisible"
        :id="periodDetailid"
        @onClosed="
            (value) => {
                fromVisible = value;
            }
        "
    ></houesDetailFrom>
    <!-- Header Section -->
    <div class="header-top">
        <div class="flex justify-between items-center navbarApp pb-2 pl-0 pr-0 pt-4">
            <!-- Left Side -->
            <i class="pi pi-chevron-left" style="font-size: 1.5rem; color: #192a51" @click="toPeriod"></i>

            <!-- Right Side -->
            <div class="flex items-center space-x-4">
                <OverlayBadge value="2" severity="danger">
                    <i class="pi pi-bell" style="font-size: 2rem"></i>
                </OverlayBadge>
                <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" style="background-color: transparent; padding: 0; border: 0"></Button>
                <Menu ref="menu" id="overlay_menu" :model="items" :popup="true"></Menu>
            </div>
        </div>

        <div class="grid">
                <div class="col-12 grid p-0  pb-3 text-white justify-center">
                    <div class="col-4 p-0 flex justify-center">
                        <span class="p-2" style="font-size: 1.5rem; letter-spacing: 0.1rem">งานหลัก : {{ periodTotal}}</span>
                    </div>
                </div>
            </div>
        </div>


    <div class="content content-gradient">
        <div class="px-5 pt-3">
            <div class="pt-[2px] pb-3">
                <Card style=" height: 79vh; ">
                    <template #content>
                        <div class="pt-[2px] pb-3" v-for="periodDetail of periodDetalList" :key="periodDetail.periodDetailid">
                            <Card style="background-color: #e9f2f7 ; border-radius: 10px; box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2); " @Click="houseDetailFrom(periodDetail.periodDetailid)">
                                <template #title>{{ periodDetail.periodname.periodName }}</template>
                                <template #content>
                                    <p class="m-0">
                                        {{ periodDetail.description }}
                                    </p>
                                </template>
                            </Card>
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
