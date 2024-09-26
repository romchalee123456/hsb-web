<script setup>
import { ref, defineProps, toRefs, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import FileUpload from 'primevue/fileupload';
import uploadFileService from '@/service/uploadFileService';

const emit = defineEmits(['buttonClose']);
const toast = useToast();

const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    onload: Function
});

const { fromVisible } = toRefs(props);

const onAdvancedUpload = async (event) => {
    const files = Array.from(event.files);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const base64Files = await Promise.all(
        files.map(async (file) => {
            const base64 = await convertToBase64(file);
            return {
                name: file.name,
                type: file.type,
                size: file.size,
                base64: base64.split(',')[1]
            };
        })
    );

    const uploadPayload = {
        id: props.id,
        files: base64Files
    };

    await uploadFileService.UploadFileHouseDetail(uploadPayload);

    await props.onload();
};

const handleClickClose = () => {
    emit('buttonClose'); // Notify parent to update fromVisible
};
</script>

<template>
    <Toast />
    <div class="card flex justify-center">
        <Dialog
            v-model:visible="fromVisible"
            maximizable
            modal
            :header="'เพิ่มรูปภาพ'"
            :style="{ width: '80rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            :pt="{
                root: {},
                header: {
                    class: 'bg-hsb-primary text-white text-base modal-font-Prompt'
                }
            }"
            :closable="false"
        >
            <template #header>
                <div class="flex justify-content-between flex-wrap pl-2 pr-2">
                    <i class="pi pi-chevron-left" style="font-size: 1.5rem; color: white" @click="handleClickClose"></i>
                </div>
            </template>

            <div class="card">
                <Toast />
                <FileUpload name="files[]" customUpload @uploader="onAdvancedUpload" :multiple="true" accept="image/*" :maxFileSize="52428800">
                    <template #empty>
                        <span>กด chose</span>
                    </template>
                </FileUpload>
            </div>
        </Dialog>
    </div>
</template>

<style>
.bg-hsb-primary {
    background-color: #192a51;
}
</style>
