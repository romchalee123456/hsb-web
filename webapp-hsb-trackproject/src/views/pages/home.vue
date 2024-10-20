<script setup>
import Card from 'primevue/card';
import userService from '@/service/userService';
import loginService from '@/service/loginService';
import { onMounted, ref } from 'vue';
import InputText from 'primevue/inputtext';
import logo from '@/assets/image/huglogo1-ai.png';
import router from '@/router';
import projectTrackingService from '@/service/projectTrackingService';
import notificationsService from '@/service/notificationsService';

const firstname = ref('');
const lastname = ref('');
const role = ref([
    { id: 1, name: 'admin' },
    { id: 2, name: 'ผู้ดูแลโครงการ' },
    { id: 3, name: 'หัวหน้าช่าง' }
]);
const projectTotal = ref(0);
const projectList = ref([]);
const selectedRole = ref();
const notificationsCount = ref(0); // Count of notifications
const searchQuery= ref('');
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

const toPeriod = async (projectid) => {
    router.push('/period/' + projectid);
};

const toNotifications = async () => {
    router.push('/notifications');
};

const searchData = async () => {
    const res = await projectTrackingService.searchProjectByCode(searchQuery.value);
    projectTotal.value = res.data.projectTotal;
    projectList.value = res.data.projects;
};

const fetchData = async () => {
    const res = await projectTrackingService.getProject();

    projectTotal.value = res.data.projectTotal;
    projectList.value = res.data.projects;

    const resUser = await userService.getDefult();
    firstname.value = resUser.data.firstname;
    lastname.value = resUser.data.lastname;

    selectedRole.value = role.value[resUser.data.role - 1].name;

    const notificationsRes = await notificationsService.findAllNotification();
    notificationsCount.value = notificationsRes.data.length;
};
onMounted(async () => {
    await fetchData();
});

</script>
<template>
    <!-- Header Section -->
    <div class="header-top">
        <div class="flex flex-wrap justify-end navbarApp pb-2 pl-0 pr-0 pt-4">
            <!-- <OverlayBadge value="2" severity="danger"> -->
            <div class="relative">
            <i class="pi pi-bell" style="font-size: 2rem" @click="toNotifications" />
            <span v-if="notificationsCount > 0" class="notification-badge">{{ notificationsCount }}</span>
            </div>
            <!-- </OverlayBadge> -->
            <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" style="background-color: transparent; padding: 0; border: 0" />
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
        <div class="grid">
            <div class="col-12 p-0">
                <div class="col-12 grid p-0 navbarApp">
                    <div class="col-4 p-0 flex justify-end">
                        <Image :src="logo" alt="Image" width="95" h image-style="border-radius: 50%;" />
                    </div>

                    <div class="col-8 p-0 navbarApp text-white">
                        <div class="font-bold">
                            <span class="p-2" style="font-size: 1.2rem">{{ firstname }}</span>
                            <span class="p-2" style="font-size: 1.2rem">{{ lastname }}</span>
                        </div>
                        <div class="font-bold">
                            <span class="p-2" style="font-size: 1rem">ตำแหน่ง : {{ selectedRole }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-12 p-0 navbarApp text-white">
                    <div class="font-bold" style="padding-left: 5rem; padding-right: 5rem; padding-top: 1.5rem">
                        <span class="p-2" style="font-size: 1rem">โครงการ : {{ projectTotal }}</span>
                    </div>
                </div>
                <div class="col-12 text-center pt-0 pl-6 pr-6 pb-0 diagonal-gradient">
                    <div class="col">
                        <InputGroup>
                            <InputGroupAddon class="bg-primary text-white">
                                <i class="pi pi-search"></i>
                            </InputGroupAddon>
                            <InputText v-model="searchQuery" class="w-full bg-primary text-white" />
                            <button @click="searchData" class="w-[70px] h-[36px] bg-primary text-white ">ค้นหา</button>
                        </InputGroup>
                    </div>
                </div>
                <!-- Content Section -->
            </div>
        </div>
    </div>

    <div class="content bg-white content-gradient">
        <div class="px-5" v-for="project of projectList" :key="project.projectCode">
            <div class="pt-3">
                <Card @Click="toPeriod(project.projectid)" style="border-bottom: 1px solid rgba(0, 0, 0, 0.2)">
                    <template #title>
                        <span class="font-bold kanit-thin">{{ project.projectCode }}</span> :
                        <span class="font-bold kanit-thin">{{ project.projectName }}</span>
                       
                   </template>
                    <template #content>
                        <p class="m-0">
                            {{ project.description }}
                        </p>
                    </template>
                    <template #footer>
                        <div class="flex justify-content-start gap-4">
                            <Button type="button" label="งวด" :badge="project._count.periods" outlined severity="secondary" />
                            <Button type="button" label="เสร็จสิ้น" badgeSeverity="contrast" style="background-color: #79a1b8; border-color: #79a1b8" />
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<style>
.notification-badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: red; /* Adjust color as needed */
    color: white; /* Adjust color as needed */
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
}
.content-gradient {
    background: linear-gradient(to bottom, rgb(250, 248, 248) 100%, #79a1b8 0%);
}
</style>
