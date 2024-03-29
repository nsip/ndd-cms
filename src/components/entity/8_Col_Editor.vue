<template>
    <TextLine text="name:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title"/>
    <input type="text" class="content" ref="taN" v-model="name" placeholder="name" />

    <TextLine text="description:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title"/>
    <QuillEditor theme="snow" toolbar="essential" placeholder="description" @ready="onReadyDes" @textChange="textChangeDes(idx || 0)" />

    <TextLine text="standard:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title"/>
    <input type="text"  class="content" ref="taS" v-model="standard" placeholder="standard" />

    <TextLine text="elements:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title"/>
    <textarea class="content" ref="taE" v-model="elements" placeholder="elements"></textarea>

    <TextLine text="business rules:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title"/>
    <QuillEditor theme="snow" toolbar="essential" placeholder="business rules" @ready="onReadyBR" @textChange="textChangeBR(idx || 0)" />

    <TextLine text="definition modification:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title"/>
    <QuillEditor theme="snow" toolbar="essential" placeholder="definition modification" @ready="onReadyDM" @textChange="textChangeDM(idx || 0)" />
</template>

<script setup lang="ts">

import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEnt } from "@/share/EntType";
import TextLine from "@/components/TextLine.vue";
import { fitTextarea } from "@/share/util";

const name = ref("");
const standard = ref("");
const elements = ref("");

const taN = ref<HTMLTextAreaElement | null>(null); // fetch element
const taS = ref<HTMLTextAreaElement | null>(null); // fetch element
const taE = ref<HTMLTextAreaElement | null>(null); // fetch element

let quillDes: Quill;
let quillBR: Quill;
let quillDM: Quill;

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const props = defineProps({
    idx: Number,
})

onMounted(async () => {
    const col = jsonEnt.Collections[props.idx || 0];
    if (col != undefined && col != null) {

        // textarea
        name.value = col.Name;
        standard.value = col.Standard;
        elements.value = col.Elements != null ? col.Elements.join("\n") : "";

        // quill
        quillDes.root.innerHTML = col.Description;
        quillBR.root.innerHTML = col.BusinessRules != null ? col.BusinessRules.join("\n") : "";
        quillDM.root.innerHTML = col.DefinitionModification;
    }
    mounted = true;
});

watchEffect(() => {
    const idx = props.idx;
    const n = name.value;
    const s = standard.value;
    const e = elements.value;
    if (mounted) {
        jsonEnt.SetCol(idx || 0, n, "**", s, e, "**", "**");
        fitTextarea(taN.value!, n);
        fitTextarea(taS.value!, s);
        fitTextarea(taE.value!, e);
    }
});

const onReadyDes = (quill: Quill) => {
    quillDes = quill;
};
const onReadyBR = (quill: Quill) => {
    quillBR = quill;
};
const onReadyDM = (quill: Quill) => {
    quillDM = quill;
};

const textChangeDes = (idx: number) => {
    const html = quillDes.root.innerHTML;
    jsonEnt.SetCol(idx, "**", html, "**", "**", "**", "**");
};
const textChangeBR = (idx: number) => {
    const html = quillBR.root.innerHTML;
    jsonEnt.SetCol(idx, "**", "**", "**", "**", html, "**");
};
const textChangeDM = (idx: number) => {
    const html = quillDM.root.innerHTML;
    jsonEnt.SetCol(idx, "**", "**", "**", "**", "**", html);
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sub-title {
    font-weight: bold;
}
</style>
