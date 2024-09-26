<script setup>
import { ref, onMounted } from 'vue';
import GenericViewPage from '../GenericViewPage.vue';
import projectService from '@/service/projectService';
import GalleryDetail from '@/components/fromDialog/GalleryDetail.vue';

const project = ref([]);
const fromVisible = ref(false);
const id = ref(0);
const handleClickAdd = () => {
    fromVisible.value = true;
};

const handleClickClose = () => {
    fromVisible.value = false;
    id.value = 0;
};
const onRowDbClick = (event) => {
    console.log(event.data);
    fromVisible.value = true;
    id.value = event.data.projectid;
};

const loadData = async () => {
    const res = await projectService.getAllProject();

    project.value = res.data;
};
const searchData = (value) => {
    console.log(value);
};

onMounted(async () => {
    await loadData();
});
</script>
<template>
    <GenericViewPage :list="project" @button-add="handleClickAdd" @onRowDbClick="onRowDbClick" @search="searchData" :title="'รายงาน'" :add-botton-visible="false">
        <template #Column>
            <Column header="รหัสโครงการ" field="projectCode"> </Column>
            <Column header="ชื่อโครงการ" field="projectName"></Column>
            <Column header="รายละเอียด" field="description"></Column>
            <Column header="มูลค่า" field="amount"></Column>
        </template>
    </GenericViewPage>
    <GalleryDetail v-if="fromVisible" :from-visible="fromVisible" :id="id" :onload="loadData" @button-close="handleClickClose"></GalleryDetail>
</template>
<style></style>
