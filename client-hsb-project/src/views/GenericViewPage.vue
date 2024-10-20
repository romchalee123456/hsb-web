<script setup>
import { onMounted, defineProps, toRefs, defineEmits, ref } from 'vue';
import InputText from 'primevue/inputtext';

const props = defineProps({
    list: Array,
    title: String,
    addBottonVisible: {
        Type: Boolean,
        default: true
    }
    
});

const { list, addBottonVisible } = toRefs(props);

const search = ref('');

const emit = defineEmits(['buttonAdd', 'onRowDbClick', 'search']);

const handleClickAdd = () => {
    emit('buttonAdd');
};
const onRowDblClick = (event) => {
    emit('onRowDbClick', event);
};

const searchData = () => {
    emit('search', search.value);
};

onMounted(async () => {});
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">{{ props.title }}</div>
        <Toolbar>
            <template #start> </template>

            <template #center>
                <IconField v-if="true">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText placeholder="Search" v-model="search" v-if="true" class="w-[750px]" />

                </IconField>
            </template>

            <template #end>
                <Button label="ค้นหา" raised @Click="searchData" v-if="true" class="mr-2" />
                <Button severity="info" label="เพิ่มข้อมูล" v-if="addBottonVisible" @Click="handleClickAdd" />
            </template>
        </Toolbar>

        <div class="card">
            <DataTable :value="list" tableStyle="min-width: 50rem" paginator :rows="5" @row-dblclick="onRowDblClick" stripedRows :scrollable="true" selectionMode="single" :rowsPerPageOptions="[5, 10, 20, 50]">
                <slot name="Column"></slot>
            </DataTable>
        </div>
    </div>
</template>
<style></style>
