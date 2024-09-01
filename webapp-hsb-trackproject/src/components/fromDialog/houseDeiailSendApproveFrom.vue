<script setup>
import { ref, watch, onMounted, defineProps, defineEmits, toRefs } from 'vue';
import Textarea from 'primevue/textarea';
import houseDetailService from '@/service/houseDetailService';
import uploadFile from './uploadFile.vue';
const emit = defineEmits(['valueChanged', 'onClosed']);
const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    onload: Function
});
const onClosed = () => {
    emit('onClosed', false);
}
const { fromVisible } = toRefs(props);

const fromUploadFileVisible = ref(false);


const fileList = ref([]);

const fetchData = async () => {

    const res = await houseDetailService.findAllFileByHouseDetail(props.id);
    fileList.value = res.data;

}

const onClickUploadFile = async () => {
 
    fromUploadFileVisible.value = true;
}


onMounted(async () => {

    await fetchData();

})
</script>
<!-- {
    "status": "success",
    "data": [
        {
            "fileid": 1,
            "fileName": "คาน.png",
            "filePath": "https://เสาคานสําเร็จรูป.com/wp-content/uploads/2022/10/170364_210318_0-1024x768.jpg",
            "statusId": 1,
            "createOn": "2024-08-28T16:26:29.473Z",
            "houseDetailId": 1,
            "backUpStatus": 1,
            "fileBackupPath": "https://เสาคานสําเร็จรูป.com/wp-content/uploads/2022/10/170364_210318_0-1024x768.jpg"
        }
    ]
} -->
<template>
    <uploadFile
    :fromVisible="fromUploadFileVisible"
    :id="props.id"
    ></uploadFile>
    <Dialog v-model:visible="fromVisible" modal :closable="false" :pt="{
        root: {
            class: 'p-dialog-maximized'
        },
        content: {
            class: 'job-content'
        }
    }" contentStyle="font-size: 1.5rem;padding:0px">
    
        <div class="flex justify-content-between flex-wrap pl-2 pr-2">
            <i class="pi pi-chevron-left" style="font-size: 1.5rem; color: #192a51" @click="onClosed"></i>

            <div>
                <Button @click="visible = true"><span style="font-size: 0.8rem;" @click="onClickUploadFile">เพิ่มรูป</span></Button>
                <Button @click="visible = true"><span style="font-size: 0.8rem;">ส่งอนุมัติ</span></Button>

            </div>
        </div>
        <div class="grid pt-3 col">
            <div class="col-12 navbarApp">
                <div class="pl-4 pr-4">

                </div>
            </div>
            <div class="col-12 diagonal-gradient">
                <div class="pl-4 pr-4">
                    <Textarea class="w-full bg-primary" placeholder="รายละเอียด...."></Textarea>
                </div>
            </div>

        </div>

        <Card>
         
            <template #content>
                <div v-for="file of fileList" :key="file.fileid">
                    <div class="pb-5">
                        <div class="bg-primary  grid col-12 ">
                            <div class="col-4 ">
                                <Image :src="file.filePath" alt="Image" width="150rem" preview />
                            </div>
                            <div class="col-8 flex flex-column">
                                <span style="color: aliceblue;">{{ file.fileName }}</span>
                                <div class="flex justify-end">


                                    <Button @click="visible = true"
                                    style="background-color: red;border: black;"
                                    > 
                                        <i class="pi pi-trash text-white "
                                            style="font-size: 2.5rem; border: black;box-sizing: 1px;" @click="() => {
                                                fromVisible = true;
                                            }
                                                "></i></Button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                

            </template>
        </Card>
    </Dialog>
</template>
