<script setup>
import { ref, defineProps, toRefs, onMounted, defineEmits } from "vue";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import FileUpload from 'primevue/fileupload';
import uploadFileService from "@/service/uploadFileService";


// const emit = defineEmits(['update:fromVisible']);
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
        name: file.name,         // Optional: Include file name
        type: file.type,         // Optional: Include file type
        size: file.size,         // Optional: Include file size
        base64: base64.split(',')[1]  // Exclude the metadata part of the base64 string
      };
    })
  );

  const uploadPayload = {
    id: props.id,
    files: base64Files // Include the base64-encoded files
  };

  console.log(uploadPayload);
  await uploadFileService.UploadFileHouseDetail(uploadPayload);
};



onMounted(async () => {

if (id.value) {
    fileid.value = id.value;
    await fetchData(id.value);
    modeView.value = true;
} else {
    modeView.value = false;
}
});

</script>
<template>
  <Toast />
  <div class="card flex justify-center">
    <Dialog v-model:visible="fromVisible" maximizable modal :header="'เพิ่มรูปภาพ'" :style="{ width: '80rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :pt="{
        root: {
          // class:'p-dialog-maximized'
        },
        header: {
          class: 'bg-hsb-primary text-white text-base modal-font-Prompt',
        },
      }"
      >

<div class="card">
        <Toast />
        <FileUpload name="files[]" 
        customUpload
        @uploader="onAdvancedUpload"
        :multiple="true" accept="image/*" :maxFileSize="52428800">
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