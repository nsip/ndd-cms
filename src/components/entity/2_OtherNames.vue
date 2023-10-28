<template>
    <div class="com">
        <span class="label">Other Names:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <div v-if="visEditor">
            <textarea class="content" ref="taON" v-model="other_names" placeholder="entity's other names"></textarea>
        </div>
    </div>
</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { fitTextarea } from "@/share/util";

const icon = ref("chevron-down");
const visEditor = ref(false);
const other_names = ref(""); // text area content (left)
const taON = ref<HTMLTextAreaElement | null>(null); // fetch element
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const onToggleVisible = () => {
    visEditor.value = !visEditor.value;
    icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
};

onMounted(async () => {
    other_names.value = jsonEnt.OtherNames != null ? jsonEnt.OtherNames.join("\n") : "";
    mounted = true;
});

watchEffect(() => {
    const str4arr = other_names.value
    if (mounted) {
        // update data
        jsonEnt.SetOtherNames(str4arr);
        fitTextarea(taON.value!, str4arr);
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
