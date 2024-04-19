<template>
    <TextLine text="list of xpath:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
    <textarea class="content" ref="taXP" v-model="xpath" placeholder="list of xpath" wrap="off" ></textarea>

    <TextLine text="definition:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="definition" @ready="onReadyDef" @textChange="textChangeDef(idx || 0)" />

    <TextLine text="commentary:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="commentary" @ready="onReadyCmt" @textChange="textChangeCmt(idx || 0)" />

    <TextLine text="datestamp:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
    <input type="text" class="content" ref="taDS" v-model="datestamp" placeholder="datestamp"  wrap="off" />

    <br>
</template>

<script setup lang="ts">

import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEnt } from "@/share/EntType";
import TextLine from "@/components/TextLine.vue";
import { fitTextarea } from "@/share/util";

const xpath = ref("");
const datestamp = ref("");

const taXP = ref<HTMLTextAreaElement | null>(null); // fetch element
const taDS = ref<HTMLTextAreaElement | null>(null); // fetch element

let quillDef: Quill;
let quillCmt: Quill;

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const props = defineProps({
    idx: Number,
})

onMounted(async () => {
    const sif = jsonEnt.SIF[props.idx || 0];
    if (sif != undefined && sif != null) {

        // textarea
        xpath.value = sif.XPath != null ? sif.XPath.join("\n") : "";
        datestamp.value = sif.Datestamp;

        // quill
        quillDef.root.innerHTML = sif.Definition;
        quillCmt.root.innerHTML = sif.Commentary;
    }
    mounted = true;
});

const onReadyDef = (quill: Quill) => {
    quillDef = quill;
};

const onReadyCmt = (quill: Quill) => {
    quillCmt = quill;
};

const textChangeDef = (idx: number) => {
    const html = quillDef.root.innerHTML;
    jsonEnt.SetSIF(idx, "**", html, "**", "**");
};

const textChangeCmt = (idx: number) => {
    const html = quillCmt.root.innerHTML;
    jsonEnt.SetSIF(idx, "**", "**", html, "**");
};

watchEffect(() => {

    const idx = props.idx;
    const xp = xpath.value;
    const ds = datestamp.value;

    if (mounted) {
        jsonEnt.SetSIF(idx || 0, xp, "**", "**", ds);
        fitTextarea(taXP.value!, xp);
        fitTextarea(taDS.value!, ds);
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sub-title {
    font-weight: bold;
}
</style>
