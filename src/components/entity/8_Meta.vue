<template>
    <div :class="'com meta-edit block-bg-odd'">
        <EditorMeta />
    </div>
</template>

<script setup lang="ts">

import EditorMeta from "@/components/entity/8_Meta_Editor.vue";

// let mounted = false; // flag: let 'watchEffect' after 'onMounted'

// onMounted(async () => {
//     await new Promise((f) => setTimeout(f, 500)); // textarea needs to wait, quill in 'onReady'
//     mounted = true;
// });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.meta-edit {
    margin-top: -1%;
}
</style>
