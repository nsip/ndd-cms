<template>
    <div class="com">
        <span class="label">Url:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <div v-if="visEditor">
            <textarea class="content" ref="taURL" v-model="urls" placeholder="collection urls"></textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
import { jsonCol } from "@/share/ColType";
import { fitTextarea } from "@/share/util";

const icon = ref("chevron-down");
const visEditor = ref(false);
const urls = ref("");
const taURL = ref<HTMLTextAreaElement | null>(null); // fetch element
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const onToggleVisible = () => {
    visEditor.value = !visEditor.value;
    icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
};

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
