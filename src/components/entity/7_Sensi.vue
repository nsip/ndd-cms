<template>
    <div class="com">
        <button class="less-editor" @click="onMoreLessClick('-')">
            <font-awesome-icon icon="circle-minus" />
        </button>
        <button class="more-editor" @click="onMoreLessClick('+')">
            <font-awesome-icon icon="circle-plus" />
        </button>
        <div v-for="(n, i) in nEditor" :key="i">
            <br>
            <TextLine :text="i.toString()" textAlign="center" textColor="gray" lineColor="black" lineHeight="3px" />
            <EditorSensi :idx="i" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { notify } from "@kyvg/vue3-notification";
import { jsonEnt } from "@/share/EntType";
import { itemName, itemCat } from "@/share/share";
import TextLine from "@/components/TextLine.vue";
import EditorSensi from "@/components/entity/7_Sensi_Editor.vue";

const nEditor = ref(0);
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {

    // add new item
    if (itemName.value === null) {
        nEditor.value = 1
    }

    // edit existing item
    if (itemName.value?.length > 0 && itemCat.value?.length > 0) {
        if (jsonEnt.Sensitivity.length > 0) {
            nEditor.value = jsonEnt.Sensitivity.length;
        } else {
            jsonEnt.AddSensi()
            nEditor.value = 1
        }
    }

    mounted = true;
});

const onMoreLessClick = (type: string) => {
    switch (type) {
        case "+":
            {
                if (jsonEnt.IsLastSensiEmpty()) {
                    notify({
                        title: "Note",
                        text: "please use available editor(s). if hidden, unfold it",
                        type: "warn"
                    })
                    break;
                }

                // add new Sensitivity element in json
                jsonEnt.AddSensi();
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

                // remove last Sensitivity element in json
                jsonEnt.RmSensiLast();
                nEditor.value--;
            }
            break;

        default:
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
