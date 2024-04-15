<template>
    <div :class="'com block-bg-even'">
        <TextLine text="entity name:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
        <input class="content" type="text" v-model="entity" :readonly="Mode == 'edit'" placeholder="entity name" ref="entInput" />

        <TextLine text="other names:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
        <textarea class="content" ref="taON" v-model="other_names" placeholder="entity other names (new line, new one name)" wrap="off"></textarea>
    </div>
</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { Mode } from "@/share/share";
import { fitTextarea } from "@/share/util";
import TextLine from "@/components/TextLine.vue";

const entity = ref("");
const entInput = ref(); // for UI focus
const other_names = ref(""); // text area content (left)
const taON = ref<HTMLTextAreaElement | null>(null); // fetch element
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {
    entity.value = jsonEnt.Entity;
    entInput.value.focus();
    other_names.value = jsonEnt.OtherNames != null ? jsonEnt.OtherNames.join("\n") : "";
    fitTextarea(taON.value!, other_names.value);
    mounted = true
});

watchEffect(() => {
    const name = entity.value;
    const str4arr = other_names.value
    if (mounted) {
        // update data
        jsonEnt.SetName(name);
        jsonEnt.SetOtherNames(str4arr);
        fitTextarea(taON.value!, str4arr);
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sub-title {
    font-weight: bold;
}
</style>
