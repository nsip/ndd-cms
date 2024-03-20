<template>
    <div class="com">
        <input class="content" type="text" v-model="entity" :readonly="Mode == 'edit'" placeholder="entity name" ref="entInput" />
    </div>
</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { Mode } from "@/share/share";

const entity = ref("");
const entInput = ref();
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {
    entity.value = jsonEnt.Entity;
    entInput.value.focus();
    mounted = true
});

watchEffect(() => {
    const name = entity.value;
    if (mounted) {
        jsonEnt.SetName(name);
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
