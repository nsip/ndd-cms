<template>
    <div class="lbl_type">
        <label>preview:</label>
        <input class="selection" type="radio" name="type" value="json" checked @click="select('json')" />
        <label>json</label>
        <input class="selection" type="radio" name="type" value="preview" @click="select('preview')" />
        <label>effect</label>
    </div>
    <hr />
    <pre v-if="selMode == 'json'">{{ genJSON() }}</pre>
    <EntVisualContent v-if="selMode == 'preview' && props.Cat == 'entity'" />
    <ColVisualContent v-if="selMode == 'preview' && props.Cat == 'collection'" />
</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { jsonCol } from "@/share/ColType";
import EntVisualContent from "@/components/entity/VisualContent.vue";
import ColVisualContent from "@/components/collection/VisualContent.vue";

const props = defineProps({
    Cat: String,
})

const selMode = ref("json"); // default (checked) json type

const select = (mode: string) => { selMode.value = mode; };

const genJSON = () => {
    if (selMode.value == "json") {
        return (props.Cat == 'entity' ? jsonEnt : jsonCol).GenJSON()
    }
    return ""
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
