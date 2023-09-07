<template>
    <TextLine text="identifier:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taID" v-model="identifier" placeholder="identifier"></textarea>

    <TextLine text="type:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taTP" v-model="type" placeholder="type"></textarea>
</template>

<script setup lang="ts">

import { jsonColHTML, jsonColTEXT } from "@/share/ColType";
import TextLine from "@/components/TextLine.vue";

const identifier = ref("");
const type = ref("");
const taID = ref<HTMLTextAreaElement | null>(null);
const taTP = ref<HTMLTextAreaElement | null>(null);
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {
    const meta = jsonColHTML.Metadata;

    // textarea
    identifier.value = meta.Identifier;
    type.value = meta.Type;

    mounted = true
});

watchEffect(() => {
    const id = identifier.value;
    const typ = type.value;
    if (mounted) {
        jsonColHTML.SetMeta(id, typ);
        jsonColTEXT.SetMeta(id, typ);
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
