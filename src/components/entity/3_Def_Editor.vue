<template>   
    <TextLine text="scope:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <input type="text" class="content" ref="taScope" v-model="scope" placeholder="definition scope" />

    <TextLine text="text:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="definition content text" @ready="onReadyDef" @textChange="textChangeDef(idx || 0)" />
</template>

<script setup lang="ts">

import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEnt } from "@/share/EntType";
import TextLine from "@/components/TextLine.vue";
import { fitTextarea } from "@/share/util";

const scope = ref("");
const taScope = ref<HTMLTextAreaElement | null>(null); // fetch element
let quillDef: Quill;
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const props = defineProps({
    idx: Number,
})

onMounted(async () => {
    const def = jsonEnt.Definition[props.idx || 0];
    if (def != undefined && def != null) {
        // quill
        quillDef.root.innerHTML = def.Text;
        // textarea
        scope.value = def.Scope;
    }
    mounted = true;
});

const onReadyDef = (quill: Quill) => {
    quillDef = quill;
};

const textChangeDef = (idx: number) => {
    const html = quillDef.root.innerHTML;
    jsonEnt.SetDefinition(idx || 0, html, "**")
};

watchEffect(() => {
    const idx = props.idx;
    const sc = scope.value;
    if (mounted) {
        jsonEnt.SetDefinition(idx || 0, "**", sc);
        fitTextarea(taScope.value!, sc);
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
