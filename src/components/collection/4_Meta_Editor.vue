<template>
    <div class="com">
        <TextLine text="type:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
        <span class="type-input" v-for="choice in choices">
            <input v-model="type" type="radio" name="type" :value="choice" @change="select" />
            <label>{{ choice }}</label>
        </span>
    </div>
</template>

<script setup lang="ts">

import { jsonCol } from "@/share/ColType";
import { getListItemType, itemCat } from "@/share/share"
import TextLine from "@/components/TextLine.vue";

const type = ref("");
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const choices = ref();

onMounted(async () => {
    const meta = jsonCol.Metadata;

    // textarea
    type.value = meta.Type;

    // 'Type' radio button choices
    choices.value = (await getListItemType(itemCat.value)).data as string[];

    mounted = true
});

watchEffect(() => {
    const typ = type.value;
    if (mounted) {
        jsonCol.SetMeta(typ);
    }
});

const select = () => { };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.type-input {
    margin-left: 20px;
    font-weight: normal;
}

.sub-title {
    font-weight: bold;
}
</style>
