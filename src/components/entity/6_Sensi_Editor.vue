<template>
    <TextLine text="locale:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <input type="text" class="content" v-model="locale" placeholder="locale" />

    <TextLine text="value:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
    <input type="text" class="content" v-model="val" placeholder="value" />

    <TextLine text="commentary:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" class="sub-title" />
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
.sub-title {
    font-weight: bold;
}
</style>
