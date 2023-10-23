<template>
    <div class="com">
        <span class="label">Entities:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <div v-if="visEditor">
            <textarea class="content" ref="taE" v-model="entities" :readonly="Mode == 'edit'" placeholder="collection entities"></textarea>
        </div>
    </div>
</template>

<script setup lang="ts">

import { jsonColHTML, jsonColTEXT } from "@/share/ColType";
import { Mode } from "@/share/share";
import { fitTextarea } from "@/share/util";

const icon = ref("chevron-down");
const visEditor = ref(false);
const entities = ref("");
const taE = ref<HTMLTextAreaElement | null>(null); // fetch element
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const onToggleVisible = () => {
    visEditor.value = !visEditor.value;
    icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
};

onMounted(async () => {
    entities.value = jsonColTEXT.Entities != null ? jsonColTEXT.Entities.join("\n") : "";
    mounted = true;
});

watchEffect(() => {
    const e = entities.value;
    if (mounted) {
        jsonColTEXT.SetEntities(e);
        jsonColHTML.SetEntities(e);
        fitTextarea(taE.value!, e);
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
    margin-left: 5px;
}

.content {
    margin-left: 0px;
    padding-left: 1%;
    resize: vertical;
    display: block;
    overflow: hidden;
    width: 98%;
    min-height: 15px;
    line-height: 20px;
}
</style>
