<template>
    <TextLine text="identifier:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taID" v-model="identifier" placeholder="identifier"></textarea>

    <TextLine text="type:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taTP" v-model="type" placeholder="type"></textarea>

    <TextLine text="expected attributes:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taEA" v-model="attributes" placeholder="expected attributes"></textarea>

    <TextLine text="superclasses:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taSC" v-model="superclasses" placeholder="superclasses"></textarea>

    <TextLine text="cross ref entities:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taRE" v-model="refentities" placeholder="cross ref entities"></textarea>
</template>

<script setup lang="ts">

import { jsonEntHTML as jsonHTML, jsonEntTEXT as jsonTEXT } from "@/share/EntType";
import TextLine from "@/components/TextLine.vue";

const identifier = ref("");
const type = ref("");
const attributes = ref("");
const superclasses = ref("");
const refentities = ref("");

const taID = ref<HTMLTextAreaElement | null>(null);
const taTP = ref<HTMLTextAreaElement | null>(null);
const taEA = ref<HTMLTextAreaElement | null>(null);
const taSC = ref<HTMLTextAreaElement | null>(null);
const taRE = ref<HTMLTextAreaElement | null>(null);

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {
    const meta = jsonHTML.Metadata;

    // textarea
    identifier.value = meta.Identifier;
    type.value = meta.Type;
    attributes.value = meta.ExpectedAttributes != null ? meta.ExpectedAttributes.join("\n") : "";
    superclasses.value = meta.Superclass != null ? meta.Superclass.join("\n") : "";
    refentities.value = meta.CrossrefEntities != null ? meta.CrossrefEntities.join("\n") : "";

    mounted = true;
});

watchEffect(() => {

    const id = identifier.value;
    const t = type.value;
    const a = attributes.value;
    const sc = superclasses.value;
    const re = refentities.value;

    if (mounted) {
        jsonHTML.SetMeta("html", id, t, a, sc, re);
        jsonTEXT.SetMeta("", id, t, a, sc, re);
        if (taEA.value != null) {
            const numberOfLineBreaks = (a.match(/\n/g) || []).length;
            const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
            taEA.value!.style.height = newHeight + "px";
        }
        if (taSC.value != null) {
            const numberOfLineBreaks = (sc.match(/\n/g) || []).length;
            const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
            taSC.value!.style.height = newHeight + "px";
        }
        if (taRE.value != null) {
            const numberOfLineBreaks = (re.match(/\n/g) || []).length;
            const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
            taRE.value!.style.height = newHeight + "px";
        }
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    padding-left: 1%;
    resize: vertical;
    display: block;
    overflow: hidden;
    width: 98%;
    min-height: 15px;
    line-height: 20px;
}
</style>
