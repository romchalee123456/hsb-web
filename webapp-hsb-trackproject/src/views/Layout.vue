
<script setup>

</script>
<template>
    <div class="wrapper">
 <RouterView></RouterView>
  
      <!-- Footer Section -->
      <div class="footer-bottom ">
        <footer class="footer bg-primary text-white">
          <div class="container-fluid">
            <div class="grid grid-nogutter ">
              <div class="col">
                <a href="/" class="nostyle">
                  <div class="text-center">
                    <span class="pi pi-home" style="font-size: 1rem"></span>
                  </div>
                  <div class="text-center">หน้าหลัก</div>
                </a>
              </div>
              <div class="col">
                <a href="/" class="nostyle">
                  <div class="text-center">
                    <span class="pi pi-search" style="font-size: 1rem"></span>
                  </div>
                  <div class="text-center">ตรวจสอบงาน</div>
                </a>
              </div>
              <div class="col">
                <a href="/notifications" class="nostyle">
                  <div class="text-center">
                  <span class="pi pi-user" style="font-size: 1rem"></span>
                </div>
                <div class="text-center">แจ้งเตือน</div>

                </a>
                
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </template>
  
  <style>
/* Import the Kanit font */
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;1,100&display=swap');

/* Base styles */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  touch-action: manipulation;
  font-family: 'Kanit', sans-serif; /* Apply Kanit font to the whole document */
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
  background: linear-gradient( #567a8f 5%,#79a1b8,#79a1b8);
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
  background-color: 0;
}

.nostyle {
  text-decoration: none;
  color: inherit;
}

.diagonal-gradient {
  background: linear-gradient(to top, rgb(250, 248, 248)50%, #79a1b8 50%);
}


</style>
  