<script setup>
import { ref, watch, onMounted, defineProps, defineEmits ,toRefs} from 'vue';
import periodNameInputFields from '../inputFields/periodNameInputFields.vue';
import Textarea from 'primevue/textarea';

const emit = defineEmits(['valueChanged','onClosed']);
const props = defineProps({
    fromVisible: Boolean,
    id: Number,
    onload: Function
});
const onClosed = () =>{
emit('onClosed',false);
}
const { fromVisible } = toRefs(props);
</script>
<template>
    <Dialog
        v-model:visible="fromVisible"
        modal
        :closable="false"
        :pt="{
            root: {
                class: 'p-dialog-maximized'
            },
            content: {
                class: 'job-content'
            }
        }"
        contentStyle="font-size: 1.5rem;padding:0px"
    >
        <div class="flex justify-content-between flex-wrap pl-2 pr-2">
            <i class="pi pi-chevron-left" style="font-size: 1.5rem; pacolor: #192a51" @click="onClosed"></i>
       
            <div>
                <i class="pi pi-save" style="font-size: 1.5rem"></i>
            </div>
        </div>
        <div class="grid pt-3 col">
            <div class="col-12 navbarApp">
                <div class="pl-4 pr-4">
                    <periodNameInputFields
                        :selected-value="customerSelected"
                        @valueChanged="
                            (value) => {
                                customerSelected = value;
                            }
                        "
                        :disabled="modeView"
                    ></periodNameInputFields>
                </div>
            </div>
            <div class="col-12 diagonal-gradient">
                <div class="pl-4 pr-4">
                    <Textarea class="w-full bg-primary" placeholder="รายละเอียด...."></Textarea>
                </div>
            </div>
            <div class="pl-4 pr-4 ">
             
            </div>
            <Card>

        <template #content>
          <div class="bg-primary">
            <div class="grid col-12 ">
                    <div class="col-7"><AutoComplete v-model="value" dropdown :suggestions="items" @complete="search" class="w-full" /></div>
                    <div class="col-5 gap-3 flex">
                        <i
                            class="pi pi-plus-circle text-white"
                            style="font-size: 2.5rem; background-color: green; border-radius: 50%"
                            @click="
                                () => {
                                    fromVisible = true;
                                }
                            "
                        ></i>
                        <Button   @click="visible = true" ><span style="font-size: 0.8rem;">ส่งอนุมัติ</span></Button>
                    </div>
                </div>
          </div>
          
        </template>
    </Card>
        </div>
    </Dialog>
</template>
