<template>
    <div class="com">
        <textarea class="content" ref="taURL" v-model="urls" placeholder="collection urls (new line, new one url)" wrap="off" ></textarea>
    </div>
</template>

<script setup lang="ts">
import { jsonCol } from "@/share/ColType";
import { fitTextarea } from "@/share/util";

const urls = ref("");
const taURL = ref<HTMLTextAreaElement | null>(null); // fetch element
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {
    urls.value = jsonCol.URL != null ? jsonCol.URL.join("\n") : "";
    mounted = true
});

watchEffect(() => {
    const u = urls.value
    if (mounted) {
        jsonCol.SetUrl(u);
        fitTextarea(taURL.value!, u);
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
    margin-left: 5px;
}
</style>
