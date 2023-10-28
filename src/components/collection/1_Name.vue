<template>
    <div class="com">
        <span class="label">Collection:</span>
        <input class="content" type="text" v-model="collection" :readonly="Mode == 'edit'" placeholder="collection name"
            ref="colInput" />
    </div>
</template>

<script setup lang="ts">
import { jsonCol } from "@/share/ColType";
import { Mode } from "@/share/share";

const collection = ref("");
const colInput = ref();
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {
    collection.value = jsonCol.Entity;
    colInput.value.focus();
    mounted = true
});

watchEffect(() => {
    const name = collection.value;
    if (mounted) {
        jsonCol.SetName(name);
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
    margin-top: 10px;
}

.content {
    position: relative;
    margin-left: 1%;
    width: 88%;
    padding-left: 1%;
    font-weight: bold;
    text-align: center;
}
</style>
