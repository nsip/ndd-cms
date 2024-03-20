<template>
    <div class="lbl_type">
        <label>preview:</label>
        <span class="type-input" v-for="choice in choices">
            <input v-model="mode" type="radio" name="prev-mode" :value="choice" @change="select" />
            <label>{{ choice }}</label>
        </span>
    </div>
    <hr />
    <pre v-if="mode == 'json'">{{ genJSON() }}</pre>
    <EntVisualContent v-if="mode == 'preview' && props.Cat == 'entity'" />
    <ColVisualContent v-if="mode == 'preview' && props.Cat == 'collection'" />
</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { jsonCol } from "@/share/ColType";
import EntVisualContent from "@/components/entity/VisualContent.vue";
import ColVisualContent from "@/components/collection/VisualContent.vue";

const props = defineProps({
    Cat: String,
})

const choices = reactive([
    "json",
    "preview"
]);

const mode = ref(choices[0]);

const select = () => { };

const genJSON = () => {
    if (mode.value == "json") {
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
