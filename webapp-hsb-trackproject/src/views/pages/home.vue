<script setup>
import Card from 'primevue/card';
import userService from '@/service/userService';
import { onMounted,ref } from 'vue';

const firstname = ref('');
const lastname = ref('');
onMounted(async () => {
  const res = await userService.getDefult();
   firstname.value = res.data.firstname;
   lastname.value = res.data.lastname;
   console.log(firstname.value)

});
</script>
<!-- "data": {
 #79a1b8
    "id": 3,
    "firstname": "John1",
    "lastname": "Doe1",
    "email": "john.doe@example.com",
    "password": "$2a$10$7WgEtn2vMZi/PDMsikjK1uIG7jPTWU6pa6N7.DeebnH7Ojq5X..Fa",
    "created_on": "2024-08-19T16:50:30.591Z",
    "role": 1,
    "TameName": "admin",
    "PhoneNumber": null
} -->
<template>
<div class="grid">
    <div class="col-12">
        <div class="text-center p-3 border-round-sm  navbarApp font-bold">
<span>{{ firstname }}</span>
<span>{{ lastname }}</span>

        </div>
    </div>
    <div class="col">
        <div class="text-center p-3 border-round-sm bg-primary font-bold ">2</div>
    </div>
    <div class="col">
        <div class="text-center p-3 border-round-sm bg-primary font-bold ">3</div>
    </div>
</div>
</template>

<style>
.navbarApp{
    background-color: #79a1b8;
}
</style>