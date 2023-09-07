<template>
    <div class="lbl_type">
        <label>Preview:</label>
        <input class="selection" type="radio" name="type" value="text" checked @click="select('text')" />
        <label>plain text json</label>
        <input class="selection" type="radio" name="type" value="html" @click="select('html')" />
        <label>html value json</label>
        <input class="selection" type="radio" name="type" value="preview" @click="select('preview')" />
        <label>effect</label>
    </div>
    <hr />
    <pre v-if="selMode == 'text' || selMode == 'html'">{{ genJSON(selMode) }}</pre>
    <EntVisualContent v-if="selMode == 'preview' && Kind == 'entity'" />
    <ColVisualContent v-if="selMode == 'preview' && Kind == 'collection'" />
</template>

<script setup lang="ts">

import { jsonEntHTML, jsonEntTEXT } from "@/share/EntType";
import { jsonColHTML, jsonColTEXT } from "@/share/ColType";
import EntVisualContent from "@/components/entity/VisualContent.vue";
import ColVisualContent from "@/components/collection/VisualContent.vue";

const props = defineProps({
    Kind: String,
})

const selMode = ref("text"); // default (checked) json type

const text = props.Kind == 'entity' ? jsonEntTEXT : jsonColTEXT;
const html = props.Kind == 'entity' ? jsonEntHTML : jsonColHTML;

const genJSON = (Mode: string) => {
    switch (Mode) {
        case "text":
            return text.GenJSON(false);
        case "html":
            return html.GenJSON(true);
        default:
            return "";
    }
};

const select = (Mode: string) => {
    selMode.value = Mode;
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lbl_type {
    margin-top: 10px;
    margin-left: 10px;
    font-weight: bold;
}

.selection {
    margin-left: 15px;
}
</style>
