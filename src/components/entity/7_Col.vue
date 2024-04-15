<template>
    <div class="com">
        <button class="less-editor" @click="onMoreLessClick('-')">
            <font-awesome-icon icon="circle-minus" />
        </button>
        <button class="more-editor" @click="onMoreLessClick('+')">
            <font-awesome-icon icon="circle-plus" />
        </button>
        <br>
        <br>
        <div v-for="(n, i) in nEditor" :key="i" :class="i % 2 == 1 ? 'block-bg-odd' : 'block-bg-even'">
            <h6 class="block-index">{{ i }}</h6>
            <br>
            <EditorCol :idx="i" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { notify } from "@kyvg/vue3-notification";
import { jsonEnt } from "@/share/EntType";
import { itemName, itemCat } from "@/share/share";
import EditorCol from "@/components/entity/7_Col_Editor.vue";

const nEditor = ref(0);
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {

    // add new item
    if (itemName.value === null) {
        nEditor.value = 1
    }

    // edit existing item
    if (itemName.value?.length > 0 && itemCat.value?.length > 0) {
        if (jsonEnt.Collections.length > 0) {
            nEditor.value = jsonEnt.Collections.length;
        } else {
            jsonEnt.AddCol()
            nEditor.value = 1
        }
    }

    mounted = true;
});

const onMoreLessClick = (type: string) => {
    switch (type) {
        case "+":
            {
                if (jsonEnt.IsLastColEmpty()) {
                    notify({
                        title: "Note",
                        text: "use current blank editor(s). if hidden, unfold it",
                        type: "warn"
                    })
                    break;
                }

                // add new Collection element in json
                jsonEnt.AddCol();
                nEditor.value++;
            }
            break;

        case "-":
            {
                if (nEditor.value <= 1) {
                    notify({
                        title: "Note",
                        text: "no more editor group to remove",
                        type: "warn"
                    })
                    break;
                }

                // remove last Collection element in json
                jsonEnt.RmColLast();
                nEditor.value--;
            }
            break;

        default:
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
