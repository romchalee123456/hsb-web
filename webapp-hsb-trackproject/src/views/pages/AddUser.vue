<script setup>
import { ref, onMounted } from 'vue';
import GenericViewPage from '../GenericViewPage.vue';
import userService from '@/service/userService';
import fromAddUser from '@/components/fromDialog/fromAddUser.vue';

const users = ref([]);
const fromVisible = ref(false);
const id = ref(0);
const handleClickAdd = () =>{
    fromVisible.value = true;
}

const handleClickClose = () =>{
    fromVisible.value = false;
    id.value = 0;
}
const onRowDbClick = (event) =>{
   console.log(event.data);
    fromVisible.value = true;
    id.value = event.data.id;
}

const loadData = async() =>{
    const res = await userService.getAllUser();

users.value = res.data;
}
const searchData = (value) => {
    
   console.log(value)
}

onMounted(async () => {
   await loadData();

});
</script>
<template>
    <GenericViewPage
    :list="users"
@button-add="handleClickAdd"
@onRowDbClick="onRowDbClick"
@search="searchData"
    >
    <template #Column>
        <Column header="ชื่อ" filterField="firstname" field="firstname"> </Column>
                <Column header="นามสกุล"  field="lastname"></Column>
                <Column header="ชื่อทีม" field="TameName"></Column>
                <Column header="เบอร์โทร" field="PhoneNumber"></Column>
    </template>
    </GenericViewPage>
<fromAddUser
v-if="fromVisible"
:from-visible="fromVisible"
:id="id"
:onload="loadData"
@button-close="handleClickClose"
></fromAddUser>
</template>
<style>


</style>
