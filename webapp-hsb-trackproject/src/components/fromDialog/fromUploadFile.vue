<script setup>
import { defineProps, defineEmits, ref, toRefs } from 'vue';
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';

const props = defineProps({
    dialogVisible: Boolean,
    uploading: Boolean
});

const { dialogVisible, uploading } = toRefs(props);

const emit = defineEmits(['onClose', 'onUploadFiles']);

const onUploadFiles = async (event) => {
    console.log(event.files);
    emit('onUploadFiles', event.files);
};

const onFileSelected = (event) => {
    console.log(event);
};

const onCloseDialog = () => {
    emit('onClose');
};
</script>
<template>
    <Dialog title="Upload File(s)" :closeOnEscape="false" modal :header="'c'" v-model:visible="dialogVisible" @update:visible="onCloseDialog" :draggable="false" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="card">
            <FileUpload name="files[]" @uploader="onUploadFiles" @select="onFileSelected" :multiple="true" :choose-label="'d'" :upload-label="'hh'" :cancel-label="'d'" accept="image/*" :maxFileSize="1000000" customUpload>
                <template #empty>
                    <div v-if="uploading" class="flex align-items-center justify-content-center flex-column">
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" animationDuration=".5s" />
                    </div>
                    <div v-else class="flex align-items-center justify-content-center flex-column">
                        <i class="pi pi-cloud-upload border-2 border-circle p-3 text-3xl text-400 border-400" />
                        \
                    </div>
                </template>
            </FileUpload>
        </div>
        <template #footer> \ </template>
    </Dialog>
</template>
