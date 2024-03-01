<template>
    <TextLine text="type:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taTP" v-model="type" placeholder="type"></textarea>
</template>

<script setup lang="ts">

import { jsonCol } from "@/share/ColType";
import TextLine from "@/components/TextLine.vue";

const type = ref("");
const taTP = ref<HTMLTextAreaElement | null>(null);
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {
    const meta = jsonCol.Metadata;
    // textarea
    type.value = meta.Type;
    mounted = true
});

watchEffect(() => {
    const typ = type.value;
    if (mounted) {
        jsonCol.SetMeta(typ);
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    padding-left: 1%;
    padding-top: 1.5%;
    resize: none;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    width: 98%;
    min-height: 8px;
    line-height: 8px;
}
</style>
