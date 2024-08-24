<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'หน้าหลัก',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-chart-pie', to: '/' }]
    },
    {
        label: 'ผู้ใช้',
        items: [{ label: 'เพิ่มผู้ใช้งาน', icon: 'pi pi-fw pi pi-user', to: '/addUser' }]
    },
    {
        label: 'จัดการโครงการ',
        items: [{ label: 'โครงการ', icon: 'pi pi-fw pi pi-home', to: '/project' }]
    },
  
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
