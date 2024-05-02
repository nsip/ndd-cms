<template>
    <div class="com">
        <TextLine text="type:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
        <div class="area-rb-selection">
            <span v-for="choice in choicesType" class="rb-each">
                <input v-model="type" type="radio" name="type" :value="choice" @change="select" />
                <label>{{ choice }}</label>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">

import { jsonCol } from "@/share/ColType";
import { getListItemType, itemCat } from "@/share/share"
import TextLine from "@/components/TextLine.vue";

const type = ref("");
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const choicesType = ref();

onMounted(async () => {
    const meta = jsonCol.Metadata;

    // textarea
    type.value = meta.Type;

    // 'Type' radio button choices
    choicesType.value = (await getListItemType(itemCat.value)).data as string[];

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
.sub-title {
    font-weight: bold;
}

.area-rb-selection {
    position: relative;
    left: 10vh;
}

.rb-each {
    margin-right: 12px;
    font-weight: bold;
    font-style: italic;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}
</style>
