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
            <TextLine v-if="nEditor > 1" :text="i.toString()" textAlign="center" textColor="gray" lineColor="black" lineHeight="2px" />
            <EditorDef :idx="i" />
        </div>

        <TextLine text="Values:" textAlign="left" textColor="black" lineColor="black" lineHeight="4px" class="sub-title" />
        <QuillEditor theme="snow" toolbar="essential" placeholder="values text" @ready="onReadyVal" @textChange="textChangeVal" />

    </div>
</template>

<script setup lang="ts">

import { notify } from "@kyvg/vue3-notification";
import { jsonEnt } from "@/share/EntType";
import { itemName, itemCat } from "@/share/share";
import TextLine from "@/components/TextLine.vue";
import EditorDef from "@/components/entity/2_Def_Editor.vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

const nEditor = ref(0);
let quillVal: Quill;
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {

    // add new item
    if (itemName.value === null) {
        nEditor.value = 1
    }

    // edit existing item
    if (itemName.value?.length > 0 && itemCat.value?.length > 0) {
        if (jsonEnt.Definition.length > 0) {
            nEditor.value = jsonEnt.Definition.length;
        } else {
            // add a new empty Definition element in json if empty Definition array loaded
            jsonEnt.AddDef();
            nEditor.value = 1
        }
    }

    const val = jsonEnt.Values
    if (val != undefined && val != null && val.length > 0) {
        quillVal.root.innerHTML = val
    }

    mounted = true;
});

const onMoreLessClick = (type: string) => {
    switch (type) {
        case "+":
            {
                if (jsonEnt.IsLastDefEmpty()) {
                    notify({
                        title: "Note",
                        text: "use current blank editor(s). if hidden, unfold it",
                        type: "warn"
                    })
                    break;
                }
                // add new Definition element in json
                jsonEnt.AddDef();
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
                // remove last Definition element in json
                jsonEnt.RmDefLast();
                nEditor.value--;
            }
            break;

        default:
    }
    // console.log('editor count:', nEditor.value)
};

const onReadyVal = (quill: Quill) => {
    quillVal = quill;
};

const textChangeVal = () => {
    const html = quillVal.root.innerHTML;
    jsonEnt.SetValues(html)
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sub-title {
    font-weight: bold;
}
</style>