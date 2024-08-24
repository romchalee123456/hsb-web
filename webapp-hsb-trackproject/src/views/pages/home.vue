<script setup>
import Card from 'primevue/card';
import userService from '@/service/userService';
import { onMounted, ref } from 'vue';
import InputText from 'primevue/inputtext';
import logo from '@/assets/image/huglogo1-ai.png';
const firstname = ref('');
const lastname = ref('');

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
                icon: 'pi pi-upload'
            }
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
onMounted(async () => {
    const res = await userService.getDefult();
    firstname.value = res.data.firstname;
    lastname.value = res.data.lastname;
    console.log(firstname.value);
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
        <div class="col text-end navbarApp font-bold">
            <i class="pi pi-bell" style="font-size: 1.5rem"></i>
            <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" style="background-color: transparent" />
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>

        <div class="col-12 p-0">
            <div class="col-12 grid p-0 navbarApp ">
                <div class="col-4 p-0 flex justify-end">

               
        <Image :src="logo" alt="Image" width="80" h image-style=" border-radius: 50%; "/>
    </div>
                
                <div class="col-8 p-0 navbarApp ">
                    <div class="p-2 font-bold">
                        <span>{{ firstname }}</span>
                        <span>{{ lastname }}</span>
                    </div>
                </div>
            </div>

            <div class="col-12 text-center pt-0 pl-6 pr-6">
                <div class="col">
                    <InputGroup>
                        <InputGroupAddon class="bg-primary text-white">
                            <i class="pi pi-search"></i>
                        </InputGroupAddon>
                        <InputText class="w-full bg-primary text-white" placeholder="ค้นหา"></InputText>
                    </InputGroup>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="text-center p-3 border-round-sm bg-primary font-bold">2</div>
        </div>
        <div class="col">
            <div class="text-center p-3 border-round-sm bg-primary font-bold">3</div>
        </div>
    </div>
</template>

<style>
.navbarApp {
    background-color: #79a1b8;
}
</style>
