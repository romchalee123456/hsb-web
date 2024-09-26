<script setup>
import { onMounted ,ref} from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const houseDetailId = ref(0);
const visible = ref(false);
import ReportGallery from '@/components/fromDialog/ReportGallery.vue';
onMounted(async () => {
     houseDetailId.value = route.params.id;
     visible.value = true;
});
</script>
<template>
    <div>
<ReportGallery
    v-if="visible"
    :fromVisible="visible"
    :id="houseDetailId"
    :modeReadonly="true"
    @buttonClose="() => {visible = false}"
></ReportGallery>
    </div>
</template>
