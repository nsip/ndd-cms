<template>
    <TextLine text="locale:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" v-model="locale" placeholder="locale"></textarea>

    <TextLine text="value:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" v-model="val" placeholder="value"></textarea>

    <TextLine text="commentary:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="commentary" @ready="onReadyC" @textChange="textChangeC(idx || 0)" />
</template>

<script setup lang="ts">

import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEnt } from "@/share/EntType";
import TextLine from "@/components/TextLine.vue";

const locale = ref("");
const val = ref("");
let quillC: Quill;

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const props = defineProps({
    idx: Number,
})

onMounted(async () => {

    const sensi = jsonEnt.Sensitivity[props.idx || 0];

    if (sensi != undefined && sensi != null) {

        // textarea
        locale.value = sensi.Locale;
        val.value = sensi.Value;

        // quill
        quillC.root.innerHTML = sensi.Commentary;
    }

    mounted = true;
});

const onReadyC = (quill: Quill) => {
    quillC = quill;
};

const textChangeC = (idx: number) => {
    const html = quillC.root.innerHTML;
    const text = quillC.getText(0, 100000);
    jsonEnt.SetSensi(idx, "**", "**", html);
};

watchEffect(() => {

    const idx = props.idx;
    const l = locale.value;
    const v = val.value;

    if (mounted) {
        jsonEnt.SetSensi(idx || 0, l, v, "**");
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
