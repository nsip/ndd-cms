<template>
    <div class="com">

        <div class="area-more-less-btn">
            <button class="less-editor" @click="onMoreLessClick('-')">
                <font-awesome-icon icon="circle-minus" />
            </button>
            <button class="more-editor" @click="onMoreLessClick('+')">
                <font-awesome-icon icon="circle-plus" />
            </button>
        </div>

        <div v-for="(n, i) in nEditor" :key="i" :class="i % 2 == 1 ? 'block-bg-odd' : 'block-bg-even'">
            <h6 class="block-index">{{ i }}</h6>
            <br>
            <EditorSIF :idx="i" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { notify } from "@kyvg/vue3-notification";
import { jsonEnt } from "@/share/EntType";
import { itemName, itemCat } from "@/share/share";
import EditorSIF from "@/components/entity/3_SIF_Editor.vue";

const nEditor = ref(0);
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {

    // add new item
    if (itemName.value === null) {
        nEditor.value = 1
    }

    // edit existing item
    if (itemName.value?.length > 0 && itemCat.value?.length > 0) {
        if (jsonEnt.SIF.length > 0) {
            nEditor.value = jsonEnt.SIF.length;
        } else {
            // add a new empty SIF element in json if empty SIF array loaded
            jsonEnt.AddSIF();
            nEditor.value = 1
        }
    }

    mounted = true;
});

const onMoreLessClick = (type: string) => {
    switch (type) {
        case "+":
            {
                if (jsonEnt.IsLastSIFEmpty()) {
                    notify({
                        title: "Note",
                        text: "use current blank editor(s). if hidden, unfold it",
                        type: "warn"
                    })
                    break;
                }

                // add new SIF element in json
                jsonEnt.AddSIF();
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

                // remove last SIF element in json
                jsonEnt.RmSIFLast();
                nEditor.value--;
            }
            break;

        default:
    }
    // console.log('editor count:', nEditor.value)
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.area-more-less-btn {
    margin-bottom: 2.2vh;
}
</style>
