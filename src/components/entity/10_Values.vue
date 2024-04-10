<template>
    <QuillEditor theme="snow" toolbar="essential" placeholder="values text" @ready="onReadyVal" @textChange="textChangeVal" />
</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
 import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

let quillVal: Quill;

onMounted(async () => {
    const val = jsonEnt.Values
    if (val != undefined && val != null && val.length > 0) {
        quillVal.root.innerHTML = val
    }
});

const onReadyVal = (quill: Quill) => {
    quillVal = quill;
};

const textChangeVal = () => {
    const html = quillVal.root.innerHTML;
    jsonEnt.SetValues(html)
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
