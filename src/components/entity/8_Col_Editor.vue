<template>
    <TextLine text="name:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taN" v-model="name" placeholder="name"></textarea>

    <TextLine text="description:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="description" @ready="onReadyDes" @textChange="textChangeDes(idx || 0)" />

    <TextLine text="standard:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taS" v-model="standard" placeholder="standard"></textarea>

    <TextLine text="elements:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taE" v-model="elements" placeholder="elements"></textarea>

    <TextLine text="business rules:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="business rules" @ready="onReadyBR" @textChange="textChangeBR(idx || 0)" />

    <TextLine text="definition modification:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="definition modification" @ready="onReadyDM" @textChange="textChangeDM(idx || 0)" />
</template>

<script setup lang="ts">

import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEntHTML as jsonHTML, jsonEntTEXT as jsonTEXT } from "@/share/EntType";
import TextLine from "@/components/TextLine.vue";

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
    const col = jsonHTML.Collections[props.idx || 0];
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
    const text = quillDes.getText(0, 100000);
    jsonHTML.SetCol("html", idx, "**", html, "**", "**", "**", "**");
    jsonTEXT.SetCol("", idx, "**", text, "**", "**", "**", "**");
};
const textChangeBR = (idx: number) => {
    const html = quillBR.root.innerHTML;
    const text = quillBR.getText(0, 100000);
    jsonHTML.SetCol("html", idx, "**", "**", "**", "**", html, "**");
    jsonTEXT.SetCol("", idx, "**", "**", "**", "**", text, "**");
};
const textChangeDM = (idx: number) => {
    const html = quillDM.root.innerHTML;
    const text = quillDM.getText(0, 100000);
    jsonHTML.SetCol("html", idx, "**", "**", "**", "**", "**", html);
    jsonTEXT.SetCol("", idx, "**", "**", "**", "**", "**", text);
};

watchEffect(() => {

    const idx = props.idx;
    const n = name.value;
    const s = standard.value;
    const e = elements.value;

    if (mounted) {
        jsonHTML.SetCol("html", idx || 0, n, "**", s, e, "**", "**");
        jsonTEXT.SetCol("", idx || 0, n, "**", s, e, "**", "**");
        if (taN.value != null) {
            const numberOfLineBreaks = (n.match(/\n/g) || []).length;
            const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
            taN.value!.style.height = newHeight + "px";
        }
        if (taS.value != null) {
            const numberOfLineBreaks = (s.match(/\n/g) || []).length;
            const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
            taS.value!.style.height = newHeight + "px";
        }
        if (taE.value != null) {
            const numberOfLineBreaks = (e.match(/\n/g) || []).length;
            const newHeight = 10 + numberOfLineBreaks * 20 + 20 + 2;
            taE.value!.style.height = newHeight + "px";
        }
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    text-align: center;
}

.content {
    margin-top: 1%;
    margin-left: 0px;
    padding-left: 1%;
    resize: vertical;
    display: block;
    overflow: hidden;
    width: 98%;
    min-height: 15px;
    line-height: 20px;
    white-space: nowrap;
}
</style>
