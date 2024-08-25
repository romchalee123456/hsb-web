
<script setup>
import Card from 'primevue/card';
import userService from '@/service/userService';
import { onMounted, ref } from 'vue';
import InputText from 'primevue/inputtext';
import logo from '@/assets/image/huglogo1-ai.png';
import engineer  from '@/assets/image/engineer.jpg';
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
<template>
    <div class="wrapper">
      <!-- Header Section -->
      <div class="header-top">
        <div class="grid">
          <div class="col text-end navbarApp font-bold">
            <i class="pi pi-bell" style="font-size: 1.5rem"></i>
            <Button
              type="button"
              icon="pi pi-ellipsis-v"
              @click="toggle"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              style="background-color: transparent"
            />
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
          </div>
  
          <div class="col-12 p-0">
            <div class="col-12 grid p-0 navbarApp">
              <div class="col-4 p-0 flex justify-end">
                <Image :src="engineer" alt="Image" width="50" h image-style="border-radius: 50%;" />
              </div>
  
              <div class="col-8 p-0 navbarApp">
                <div class="p-2 font-bold">
                  <span>{{ firstname }}</span>
                  <span>{{ lastname }}</span>
                </div>
              </div>
            </div>
  
            <!-- <div class="col-12 text-center pt-0 pl-6 pr-6 diagonal-gradient">
              <div class="col">
                <InputGroup>
                  <InputGroupAddon class="bg-primary text-white">
                    <i class="pi pi-search"></i>
                  </InputGroupAddon>
                  <InputText class="w-full bg-primary text-white" placeholder="ค้นหา" />
                </InputGroup>
              </div>
            </div> -->
          </div>
        </div>
      </div>
  
      <!-- Content Section -->
      <div class="content">
        <!-- Add your content here, which will be scrollable if needed -->
        <router-view></router-view>
    
      </div>
  
      <!-- Footer Section -->
      <div class="footer-bottom">
        <footer class="footer">
          <div class="container-fluid">
            <div class="grid grid-nogutter">
              <div class="col">
                <a href="/" class="nostyle">
                  <div class="text-center">
                    <span class="pi pi-home" style="font-size: 1rem"></span>
                  </div>
                  <div class="text-center">หน้าหลัก</div>
                </a>
              </div>
              <div class="col">
                <a href="/JobCountAsset" class="nostyle">
                  <div class="text-center">
                    <span class="pi pi-search" style="font-size: 1rem"></span>
                  </div>
                  <div class="text-center">งานตรวจนับพัสดุ</div>
                </a>
              </div>
              <div class="col">
                <div class="text-center">
                  <span class="pi pi-user" style="font-size: 1rem"></span>
                </div>
                <div class="text-center">โปรไฟล์</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </template>
  
  <style>
  /* Base styles */
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    touch-action: manipulation;
  }
  
  /* Wrapper layout */
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  /* Header */
  .header-top {
    flex-shrink: 0;
    width: 100%;
    background-color: #79a1b8;
  }
  
  /* Content area */
  .content {
    flex: 1;
    overflow-y: auto;
    padding: 0px; /* Optional padding */
  }
  
  /* Footer */
  .footer-bottom {
    flex-shrink: 0;
    width: 100%;
  }
  
  .footer {
    background-color: white;
    border-radius: 0;
    padding: 0.5rem 1rem;
    box-shadow: 0.5rem;
  }
  
  /* Other utility styles */
  .navbarApp {
    background-color: #79a1b8;
  }
  
  .nostyle {
    text-decoration: none;
    color: inherit;
  }

.diagonal-gradient {

  background: linear-gradient(to  top, rgb(255, 255, 255) 50%, #79a1b8 50%);

}
  </style>
  