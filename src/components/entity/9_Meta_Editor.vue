<template>
    <TextLine text="type:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taTP" v-model="type" placeholder="type, e.g. 'Element', 'Object', 'Abstract Element'"></textarea>

    <TextLine text="expected attributes:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taEA" v-model="attributes" placeholder="expected attributes" :disabled="disTaEA" :title="tipTaEA"></textarea>

    <TextLine text="superclasses:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taSC" v-model="superclasses" placeholder="super class" :disabled="disTaSC" :title="tipTaSC"></textarea>

    <TextLine text="default parent:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taDP" v-model="defaultparent" placeholder="default parent" :disabled="disTaDP" :title="tipTaDP"></textarea>

    <TextLine text="cross ref entities:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taRE" v-model="refentities" placeholder="cross ref entities" :disabled="disTaRE" :title="tipTaRE"></textarea>
</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import TextLine from "@/components/TextLine.vue";
import { fitTextarea } from "@/share/util";

const type = ref("");
const attributes = ref("");
const superclasses = ref("");
const defaultparent = ref("");
const refentities = ref("");

const taTP = ref<HTMLTextAreaElement | null>(null);
const taEA = ref<HTMLTextAreaElement | null>(null);
const taSC = ref<HTMLTextAreaElement | null>(null);
const taDP = ref<HTMLTextAreaElement | null>(null);
const taRE = ref<HTMLTextAreaElement | null>(null);

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const disTaEA = computed(() => false);
const disTaSC = computed(() => jsonEnt.Entity.includes('=>'));
const disTaDP = computed(() => false);
const disTaRE = computed(() => false);

const tipTaEA = computed(() => false ? 'If entity name is on changing stage, [Expected Attributes] cannot be edited now' : '');
const tipTaSC = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [Super Class] cannot be edited now' : '');
const tipTaDP = computed(() => false ? 'If entity name is on changing stage, [Default Parent] cannot be edited now' : '');
const tipTaRE = computed(() => false ? 'If entity name is on changing stage, [Cross Ref Entities] cannot be edited now' : '');

onMounted(async () => {
    const meta = jsonEnt.Metadata;

    // textarea
    type.value = meta.Type;
    attributes.value = meta.ExpectedAttributes != null ? meta.ExpectedAttributes.join("\n") : "";
    superclasses.value = meta.SuperClass;
    defaultparent.value = meta.DefaultParent;
    refentities.value = meta.CrossRefEntities != null ? meta.CrossRefEntities.join("\n") : "";

    mounted = true;
});

watchEffect(() => {

    const tp = type.value;
    const ea = attributes.value;
    const sc = superclasses.value;
    const dp = defaultparent.value;
    const re = refentities.value;

    if (mounted) {
        jsonEnt.SetMeta(tp, ea, sc, dp, re);
        fitTextarea(taEA.value!, ea);
        fitTextarea(taSC.value!, sc);
        fitTextarea(taDP.value!, dp);
        fitTextarea(taRE.value!, re);
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
