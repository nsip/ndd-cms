<template>
    <div class="com">
        <span class="label">Legal Definitions:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <button class="less-editor" @click="onMoreLessClick('-')">
            <font-awesome-icon icon="circle-minus" />
        </button>
        <button class="more-editor" @click="onMoreLessClick('+')">
            <font-awesome-icon icon="circle-plus" />
        </button>
        <span class="hint2">list of [legislationName, citation, link, definition, commentary, datestamp]</span>
        <div v-if="visEditor">
            <div v-for="(n, i) in nEditor" :key="i">
                <TextLine :text="i.toString()" textAlign="center" textColor="gray" lineColor="black" lineHeight="1.5px" />
                <EditorLegDef :idx="i" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { notify } from "@kyvg/vue3-notification";
import { jsonEnt } from "@/share/EntType";
import { itemName, itemKind } from "@/share/share";
import TextLine from "@/components/TextLine.vue";
import EditorLegDef from "@/components/entity/6_LegalDef_Editor.vue";

const icon = ref("chevron-down");
const visEditor = ref(false);
const nEditor = ref(0);
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {

    // add new item
    if (itemName.value === null) {
        nEditor.value = 1
    }

    // edit existing item
    if (itemName.value?.length > 0 && itemKind.value?.length > 0) {
        if (jsonEnt.LegalDefinitions.length > 0) {
            nEditor.value = jsonEnt.LegalDefinitions.length;
        } else {
            jsonEnt.AddLegalDef();
            nEditor.value = 1
        }
    }

    mounted = true;
});

const onToggleVisible = () => {
    visEditor.value = !visEditor.value;
    icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
};

const onMoreLessClick = (type: string) => {
    switch (type) {
        case "+":
            {
                if (jsonEnt.IsLastLegalDefEmpty()) {
                    notify({
                        title: "Note",
                        text: "please use available editor(s). if hidden, unfold it",
                        type: "warn"
                    })
                    break;
                }

                // add new LegalDefinition element in json
                jsonEnt.AddLegalDef();

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

                // remove last LegalDefinition element in json
                jsonEnt.RmLegalDefLast();

                nEditor.value--;
            }
            break;
        default:
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
