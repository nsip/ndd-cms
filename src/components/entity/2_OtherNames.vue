<template>
    <div class="com">
        <textarea class="content" ref="taON" v-model="other_names" placeholder="entity's other names (new line, new one name)" wrap="off" ></textarea>
    </div>
</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { fitTextarea } from "@/share/util";

const other_names = ref(""); // text area content (left)
const taON = ref<HTMLTextAreaElement | null>(null); // fetch element
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

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
<style scoped></style>
