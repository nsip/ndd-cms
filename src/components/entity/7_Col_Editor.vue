<template>

    <TextLine text="name:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <select v-if="options_c?.length > 0" v-model="name" class="dropdown-list">
        <option value="">--- empty ---</option>
        <option v-for="(item, idx) in options_c" :key="idx" :value="item"> {{ item }}</option>
    </select>

    <TextLine text="description:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="description" @ready="onReadyDes" @textChange="textChangeDes(idx || 0)" />

    <TextLine text="standard:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <input type="text" class="content" ref="taS" v-model="standard" placeholder="standard" />

    <TextLine text="element name:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <input type="text" class="content" ref="taEN" v-model="elemname" placeholder="element name" />

    <TextLine text="elements:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <textarea class="content" ref="taE" v-model="elements" placeholder="elements" wrap="off"></textarea>

    <TextLine text="values:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="values" @ready="onReadyVal" @textChange="textChangeVal(idx || 0)" />

    <TextLine text="business rules:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="business rules" @ready="onReadyBR" @textChange="textChangeBR(idx || 0)" />

    <TextLine text="definition modification:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="definition modification" @ready="onReadyDM" @textChange="textChangeDM(idx || 0)" />

</template>

<script setup lang="ts">

import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEnt } from "@/share/EntType";
import TextLine from "@/components/TextLine.vue";
import { fitTextarea } from "@/share/util";
import { getListItem } from "@/share/share"

const options_c = ref();

const name = ref("");
const standard = ref("");
const elements = ref("");
const elemname = ref("");

const taN = ref<HTMLTextAreaElement | null>(null); // fetch element
const taS = ref<HTMLTextAreaElement | null>(null); // fetch element
const taE = ref<HTMLTextAreaElement | null>(null); // fetch element
const taEN = ref<HTMLTextAreaElement | null>(null); // fetch element

let quillDes: Quill;
let quillBR: Quill;
let quillDM: Quill;
let quillVal: Quill;

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const props = defineProps({
    idx: Number,
})

onMounted(async () => {

    options_c.value = ((await getListItem('collection')).data as string[]).sort((a, b) => a.localeCompare(b));

    const col = jsonEnt.Collections[props.idx || 0];
    if (col != undefined && col != null) {

        // textarea
        name.value = col.Name;
        standard.value = col.Standard;
        elements.value = col.Elements != null ? col.Elements.join("\n") : "";
        elemname.value = col.ElementName;

        // quill
        quillDes.root.innerHTML = col.Description;
        quillBR.root.innerHTML = col.BusinessRules != null ? col.BusinessRules.join("\n") : "";
        quillDM.root.innerHTML = col.DefinitionModification;
        quillVal.root.innerHTML = col.Values;
    }
    mounted = true;
});

watchEffect(() => {

    const idx = props.idx;

    const n = name.value;
    const s = standard.value;
    const e = elements.value;
    const en = elemname.value;

    if (mounted) {

        jsonEnt.SetCol(idx || 0, n, "**", s, e, "**", "**", en, "**");

        fitTextarea(taN.value!, n);
        fitTextarea(taS.value!, s);
        fitTextarea(taE.value!, e);
        fitTextarea(taEN.value!, en);
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
const onReadyVal = (quill: Quill) => {
    quillVal = quill;
}

const textChangeDes = (idx: number) => {
    const html = quillDes.root.innerHTML;
    jsonEnt.SetCol(idx, "**", html, "**", "**", "**", "**", "**", "**");
};

const textChangeBR = (idx: number) => {
    const html = quillBR.root.innerHTML;
    jsonEnt.SetCol(idx, "**", "**", "**", "**", html, "**", "**", "**");
};

const textChangeDM = (idx: number) => {
    const html = quillDM.root.innerHTML;
    jsonEnt.SetCol(idx, "**", "**", "**", "**", "**", html, "**", "**");
};

const textChangeVal = (idx: number) => {
    const html = quillVal.root.innerHTML;
    jsonEnt.SetCol(idx, "**", "**", "**", "**", "**", "**", "**", html);
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sub-title {
    font-weight: bold;
}

.lbl {
    margin-top: 20px;
    margin-left: 20px;
    font-weight: bold;
}

.dropdown-list {
    position: relative;
    left: 3%;
    padding: 5px 5px 5px 5px;
}
</style>
