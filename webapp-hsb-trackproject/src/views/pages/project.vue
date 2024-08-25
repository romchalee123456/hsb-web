<script setup>
import { onMounted } from 'vue';
import projectTrackingService from '@/service/projectTrackingService';

onMounted(async()=>{

  const res = await  projectTrackingService.getProject();

});

</script>
<template>
   <div class="col-12 text-center pt-0 pl-6 pr-6 diagonal-gradient fix-search">
              <div class="col ">
                <InputGroup>
                  <InputGroupAddon class="bg-primary text-white">
                    <i class="pi pi-search"></i>
                  </InputGroupAddon>
                  <InputText class="w-full bg-primary text-white" placeholder="ค้นหา" />
                </InputGroup>
              </div>
            </div>
            <Card>
    <template #title>Simple Card</template>
    <template #content>
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
    </template>
</Card>
            
</template>

<style scoped>
.fix-search{
    flex-shrink: 0;
    width: 100%;
    background-color: #ffffff;
}

</style>
