<template>
    <div class="com">
        <textarea class="content" ref="taV" v-model="values" placeholder="entity's values (new line, new one value)" wrap="off" ></textarea>
    </div>
</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { fitTextarea } from "@/share/util";

const values = ref(""); // text area content (left)
const taV = ref<HTMLTextAreaElement | null>(null); // fetch element
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {
    values.value = jsonEnt.Values != null ? jsonEnt.Values.join("\n") : "";
    fitTextarea(taV.value!, values.value);
    mounted = true;
});

watchEffect(() => {
    const str4arr = values.value
    if (mounted) {
        // update data
        jsonEnt.SetValues(str4arr);
        fitTextarea(taV.value!, str4arr);
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
