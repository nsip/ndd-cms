<template>
    <div class="com">
        <span class="label">Meta Data:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <span class="hint2"></span>
        <div v-if="visEditor" class="meta-edit">
            <EditorMeta />
        </div>
    </div>
</template>

<script setup lang="ts">

import EditorMeta from "@/components/collection/4_Meta_Editor.vue";

const icon = ref("chevron-down");
const visEditor = ref(false);
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {
    await new Promise((f) => setTimeout(f, 500)); // textarea needs to wait, quill in 'onReady'
    mounted = true;
});

const onToggleVisible = () => {
    visEditor.value = !visEditor.value;
    icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.meta-edit {
    margin-top: -2%;
}
</style>
