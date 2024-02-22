<template>
    <div class="com">
        <span class="label">Other Standards:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <button class="less-editor" @click="onMoreLessClick('-')">
            <font-awesome-icon icon="circle-minus" />
        </button>
        <button class="more-editor" @click="onMoreLessClick('+')">
            <font-awesome-icon icon="circle-plus" />
        </button>
        <span class="hint2">list of OtherStandard [standard, link(list), path(list), definition, commentary]</span>
        <div v-if="visEditor">
            <div v-for="(n, i) in nEditor" :key="i">
                <TextLine :text="i.toString()" textAlign="center" textColor="gray" lineColor="black" lineHeight="1.5px" />
                <EditorOtherStd :idx="i" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { notify } from "@kyvg/vue3-notification";
import { jsonEnt } from "@/share/EntType";
import { itemName, itemType } from "@/share/share";
import TextLine from "@/components/TextLine.vue";
import EditorOtherStd from "@/components/entity/5_OtherStd_Editor.vue";

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
    if (itemName.value?.length > 0 && itemType.value?.length > 0) {
        if (jsonEnt.OtherStandards.length > 0) {
            nEditor.value = jsonEnt.OtherStandards.length;
        } else {
            jsonEnt.AddOtherStd();
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
                if (jsonEnt.IsLastOtherStdEmpty()) {
                    notify({
                        title: "Note",
                        text: "please use available editor(s). if hidden, unfold it",
                        type: "warn"
                    })
                    break;
                }

                // add new OtherStandard element in json
                jsonEnt.AddOtherStd();
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

                // remove last OtherStandard element in json
                jsonEnt.RmOtherStdLast();
                nEditor.value--;
            }
            break;

        default:
    }
    // console.log('editor count:', nEditor.value)
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
