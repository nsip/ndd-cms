<template>
    <div class="com">
        <span class="label">Definition:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <span class="hint1"></span>
        <div v-if="visEditor">
            <!-- essential, minimal, full, and "" -->
            <QuillEditor theme="snow" toolbar="essential" placeholder="collection definition" @ready="onReady" @textChange="textChange" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonCol } from "@/share/ColType";

const icon = ref("chevron-down");
const visEditor = ref(false);
let quillDef: Quill;

const onReady = (quill: Quill) => {
    quillDef = quill;

    // fill existing html text into quill, format could change by quill
    quillDef.root.innerHTML = jsonCol.Definition;
};

const textChange = () => {
    jsonCol.SetDefinition(quillDef.root.innerHTML); // quillDef.getText(0, 100000)
};

const onToggleVisible = () => {
    visEditor.value = !visEditor.value;
    icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
