<script setup>
import { ref, onMounted } from 'vue';
import GenericViewPage from '../GenericViewPage.vue';
import customerService from '@/service/customerService';
import customerfrom from '@/components/fromDialog/customerfrom.vue';

const customer = ref([]);
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
    id.value = event.data.customerid;
};

const loadData = async () => {
    const res = await customerService.getAllCustomer();

    customer.value = res.data;
};
const searchData = async (value) => {
    const res = await customerService.searchCustomerByFirstname(value);

    customer.value = res.data;
};

onMounted(async () => {
    await loadData();
});
</script>
<template>
    <GenericViewPage :list="customer" @button-add="handleClickAdd" @onRowDbClick="onRowDbClick" @search="searchData" :title="'ลูกค้า'">
        <template #Column>
            <Column header="ชื่อ" field="customerFirstname"> </Column>
            <Column header="นามสกุล" field="customerLastname"></Column>
            <Column header="เบอร์โทรศัพท์" field="customerPhone"></Column>
            <Column header="ไอดี-ไลน์" field="customerLine"></Column>
        </template>
    </GenericViewPage>
    <customerfrom v-if="fromVisible" :from-visible="fromVisible" :id="id" :onload="loadData" @button-close="handleClickClose"></customerfrom>
</template>
<style></style>
