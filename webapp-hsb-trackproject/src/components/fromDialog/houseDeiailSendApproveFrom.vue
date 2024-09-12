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
const houseDetailName = ref("");
const fileList = ref([]);
const deleteUploadFile = ref([]);

const fetchData = async () => {

    const res = await houseDetailService.findAllFileByHouseDetail(props.id);
    const res1 = await houseDetailService.findHouseDetailById(props.id);
    const res1 = await houseDetailService.findHouseDetailById(props.id);
    fileList.value = res.data;
    houseDetailName.value = res1.data.houseDetailname.houseDetailName;
    houseDetailName.value = res1.data.houseDetailname.houseDetailName;

}

const onClickUploadFile = async () => {
 
    fromUploadFileVisible.value = true;
}

const deleteFileFromDatabase = async (fileid) => {
        await houseDetailService.deleteFileByID(fileid); // Adjust according to your service
};

const uploadFileDelete = async (index, file) => {
    await deleteFileFromDatabase(file.fileid);
    fileList.value.splice(index,1);
    deleteUploadFile.value.push(file);
};

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
    v-if="fromUploadFileVisible"
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
                <Button @click="visible = true" style="margin-right: 10px;" ><span style="font-size: 0.8rem;" @click="onClickUploadFile">เพิ่มรูป</span></Button>
                <Button @click="visible = true" style="margin-right: 10px;" ><span style="font-size: 0.8rem;" @click="onClickUploadFile">เพิ่มรูป</span></Button>
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
                    <Textarea class="w-full bg-primary text-white" v-model="houseDetailName" ></Textarea>
                    <Textarea class="w-full bg-primary text-white" v-model="houseDetailName" ></Textarea>
                </div>
            </div>

        </div>

        <Card>
         
            <template #content>
                <div v-for="file of fileList" :key="file.fileid">
                    <div class="pb-3">
                        <div class="bg-primary  grid col-12 rounded-md">
                    <div class="pb-3">
                        <div class="bg-primary  grid col-12 rounded-md">
                            <div class="col-4 ">
                                <Image :src="'http://localhost:3001/'+file.filePath" alt="Image" width="150rem" preview />
                                <Image :src="'http://localhost:3001/'+file.filePath" alt="Image" width="150rem" preview />
                            </div>
                            <div class="col-8 flex flex-column">
                                <span style="color: aliceblue; font-size: 1.1rem;">{{ file.fileName }}</span>
                                <span style="color: aliceblue; font-size: 1.1rem;">{{ file.fileName }}</span>
                                <div class="flex justify-end">


                                    <Button @click="uploadFileDelete(index, file)"
                                    style="background-color: #fede00; border: black; "
                                    > 
                                        <i class="pi pi-trash text-black "
                                            style="font-size: 2.0rem; border: black;box-sizing: 1px;">
                                        </i>
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                

            </template>
        </Card>
    </Dialog>
</template>
