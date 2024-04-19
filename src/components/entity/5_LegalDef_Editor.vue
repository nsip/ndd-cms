<template>
    <TextLine text="legislationName:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <input type="text" class="content" ref="taLN" v-model="legname" placeholder="legislation name" />

    <TextLine text="citation:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="citation" @ready="onReadyCit" @textChange="textChangeCit(idx || 0)" />

    <TextLine text="link:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <textarea class="content" ref="taLK" v-model="link" placeholder="link" wrap="off"></textarea>

    <TextLine text="definition:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="definition" @ready="onReadyDef" @textChange="textChangeDef(idx || 0)" />

    <TextLine text="commentary:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="commentary" @ready="onReadyCmt" @textChange="textChangeCmt(idx || 0)" />

    <TextLine text="datestamp:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <input type="text" class="content" ref="taDS" v-model="datestamp" placeholder="datestamp" />

    <br>
</template>

<script setup lang="ts">
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEnt } from "@/share/EntType";
import TextLine from "@/components/TextLine.vue";
import { fitTextarea } from "@/share/util";


const legname = ref("");
const link = ref("");
const datestamp = ref("");

const taLN = ref<HTMLTextAreaElement | null>(null); // fetch element
const taLK = ref<HTMLTextAreaElement | null>(null); // fetch element
const taDS = ref<HTMLTextAreaElement | null>(null); // fetch element

let quillCit: Quill;
let quillDef: Quill;
let quillCmt: Quill;

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const props = defineProps({
    idx: Number,
})

onMounted(async () => {
    const ld = jsonEnt.LegalDefinitions[props.idx || 0];
    if (ld != undefined && ld != null) {

        // textarea
        legname.value = ld.LegislationName;
        link.value = ld.Link;
        datestamp.value = ld.Datestamp;

        // quill
        quillCit.root.innerHTML = ld.Citation;
        quillDef.root.innerHTML = ld.Definition;
        quillCmt.root.innerHTML = ld.Commentary;
    }
    mounted = true;
});

const onReadyCit = (quill: Quill) => {
    quillCit = quill;
};
const onReadyDef = (quill: Quill) => {
    quillDef = quill;
};
const onReadyCmt = (quill: Quill) => {
    quillCmt = quill;
};

const textChangeCit = (idx: number) => {
    const html = quillCit.root.innerHTML;
    jsonEnt.SetLegalDef(idx, "**", html, "**", "**", "**", "**");
};
const textChangeDef = (idx: number) => {
    const html = quillDef.root.innerHTML;
    jsonEnt.SetLegalDef(idx, "**", "**", "**", html, "**", "**");
};
const textChangeCmt = (idx: number) => {
    const html = quillCmt.root.innerHTML;
    jsonEnt.SetLegalDef(idx, "**", "**", "**", "**", html, "**");
};

watchEffect(() => {
    const idx = props.idx;
    const ln = legname.value;
    const lk = link.value;
    const ds = datestamp.value;
    if (mounted) {
        jsonEnt.SetLegalDef(idx || 0, ln, "**", lk, "**", "**", ds);
        fitTextarea(taLN.value!, ln);
        fitTextarea(taLK.value!, lk);
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
