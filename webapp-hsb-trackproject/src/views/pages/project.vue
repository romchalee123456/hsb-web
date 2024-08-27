<script setup>
import { onMounted, ref } from 'vue';
import projectTrackingService from '@/service/projectTrackingService';

const projectTotal = ref(0);
const projectList = ref([]);

const fetchData = async () => {
    const res = await projectTrackingService.getProject();

    projectTotal.value = res.data.projectTotal;
    projectList.value = res.data.projects;
};
onMounted(async () => {
    await fetchData();
});
// {
//     "status": "success",
//     "data": {
//         "projectTotal": 1,
//         "projects": [
//             {
//                 "projectid": 1,
//                 "projectName": "บ้านทรัพย์อนัน-คุณกลาง",
//                 "projectCode": "PRJ001",
//                 "description": "บ้านคุณกลาง ",
//                 "createOn": "2024-08-25T12:19:49.589Z",
//                 "amount": "1000",
//                 "userid": null,
//                 "projectStatusid": 1,
//                 "responseid": 1
//             }
//         ]
//     }
// }
</script>
<template>

    <div class="col-12 text-center pt-0 pl-6 pr-6 diagonal-gradient fix-search">
        <div class="col">
            <InputGroup>
                <InputGroupAddon class="bg-primary text-white">
                    <i class="pi pi-search"></i>
                </InputGroupAddon>
                <InputText class="w-full bg-primary text-white" placeholder="ค้นหา" />
            </InputGroup>
        </div>
    </div>
    <div
            v-for="(project) of projectList"
        :key="project.projectCode"
          >
          <Card>
        <template #title>{{ project.projectName }}</template>
        <template #content>
            <p class="m-0">
               {{ project.description }}
            </p>
        </template>
        <template #footer>
          <div class="flex justify-content-center">

          </div>
        </template>
    </Card>
        </div>

</template>

<style scoped>
.fix-search {
    flex-shrink: 0;
    width: 100%;
    background-color: #ffffff;
}
</style>
