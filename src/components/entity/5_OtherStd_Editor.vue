<template>
    <TextLine text="standard:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <input type="text" class="content" ref="taS" v-model="std" placeholder="standard" />

    <TextLine text="link list:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taL" v-model="links" placeholder="link list"></textarea>

    <TextLine text="path list:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taP" v-model="paths" placeholder="path list"></textarea>

    <TextLine text="definition:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="definition" @ready="onReadyDef" @textChange="textChangeDef(idx || 0)" />

    <TextLine text="commentary:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="commentary" @ready="onReadyCmt" @textChange="textChangeCmt(idx || 0)" />
</template>

<script setup lang="ts">

import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEnt } from "@/share/EntType";
import TextLine from "@/components/TextLine.vue";
import { fitTextarea } from "@/share/util";

const std = ref("");
const links = ref("");
const paths = ref("");

const taS = ref<HTMLTextAreaElement | null>(null); // fetch element
const taL = ref<HTMLTextAreaElement | null>(null); // fetch element
const taP = ref<HTMLTextAreaElement | null>(null); // fetch element

let quillDef: Quill;
let quillCmt: Quill;

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const props = defineProps({
    idx: Number,
})

onMounted(async () => {
    const os = jsonEnt.OtherStandards[props.idx || 0];
    if (os != undefined && os != null) {

        // textarea
        std.value = os.Standard;
        links.value = os.Link != null ? os.Link.join("\n") : "";
        paths.value = os.Path != null ? os.Path.join("\n") : "";

        // quill
        quillDef.root.innerHTML = os.Definition;
        quillCmt.root.innerHTML = os.Commentary;
    }
    mounted = true
});

const onReadyDef = (quill: Quill) => {
    quillDef = quill;
};

const textChangeDef = (idx: number) => {
    const html = quillDef.root.innerHTML;
    jsonEnt.SetOtherStd(idx, "**", "**", "**", html, "**");
};

const onReadyCmt = (quill: Quill) => {
    quillCmt = quill;
};

const textChangeCmt = (idx: number) => {
    const html = quillCmt.root.innerHTML;
    jsonEnt.SetOtherStd(idx, "**", "**", "**", "**", html);
};

watchEffect(() => {

    const idx = props.idx;
    const s = std.value;
    const l = links.value;
    const p = paths.value;

    if (mounted) {
        jsonEnt.SetOtherStd(idx || 0, s, l, p, "**", "**");
        fitTextarea(taS.value!, s);
        fitTextarea(taL.value!, l);
        fitTextarea(taP.value!, p);
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    text-align: center;
}
</style>
