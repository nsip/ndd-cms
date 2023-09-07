<template>
    <div class="com">
        <span class="label">Other Names:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <div v-if="visEditor">
            <textarea class="content" ref="taON" v-model="othernames" placeholder="entity's other names"></textarea>
        </div>
    </div>
</template>

<script setup lang="ts">

import { jsonEntHTML as jsonHTML, jsonEntTEXT as jsonTEXT } from "@/share/EntType";

const icon = ref("chevron-down");
const visEditor = ref(false);
const othernames = ref(""); // text area content (left)
const taON = ref<HTMLTextAreaElement | null>(null); // fetch element
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const onToggleVisible = () => {
    visEditor.value = !visEditor.value;
    icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
};

onMounted(async () => {
    othernames.value = jsonTEXT.OtherNames != null ? jsonTEXT.OtherNames.join("\n") : "";
    mounted = true;
});

watchEffect(() => {
    const str4arr = othernames.value
    if (mounted) {
        // update data
        jsonTEXT.SetOtherName(str4arr);
        jsonHTML.SetOtherName(str4arr);
        // resize textarea
        if (taON.value != null) {
            const numberOfLineBreaks = (str4arr.match(/\n/g) || []).length;
            const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
            taON.value!.style.height = newHeight + "px";
        }
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
