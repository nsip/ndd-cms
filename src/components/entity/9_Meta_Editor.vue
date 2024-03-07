<template>
    <TextLine text="type:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taTP" v-model="type" placeholder="type, e.g. 'Element', 'Object', 'Abstract Element'"></textarea>

    <TextLine text="expected attributes:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taEA" v-model="attributes" placeholder="expected attributes" :disabled="disTaEA" :title="tipTaEA"></textarea>

    <TextLine text="superclasses:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taSC" v-model="superclasses" placeholder="super class" :disabled="disTaSC" :title="tipTaSC"></textarea>

    <TextLine text="is attribute of:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taAO" v-model="isattrof" placeholder="is attribute of" :disabled="disTaAO" :title="tipTaAO"></textarea>

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
const isattrof = ref("");
const refentities = ref("");

const taTP = ref<HTMLTextAreaElement | null>(null);
const taEA = ref<HTMLTextAreaElement | null>(null);
const taSC = ref<HTMLTextAreaElement | null>(null);
const taAO = ref<HTMLTextAreaElement | null>(null);
const taRE = ref<HTMLTextAreaElement | null>(null);

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const disTaEA = computed(() => jsonEnt.Entity.includes('=>'));
const disTaSC = computed(() => jsonEnt.Entity.includes('=>'));
const disTaAO = computed(() => jsonEnt.Entity.includes('=>'));
const disTaRE = computed(() => jsonEnt.Entity.includes('=>'));

const tipTaEA = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [ExpectedAttributes] cannot be edited' : '');
const tipTaSC = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [SuperClass] cannot be edited' : '');
const tipTaAO = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [IsAttributeOf] cannot be edited' : '');
const tipTaRE = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [CrossRefEntities] cannot be edited' : '');

onMounted(async () => {
    const meta = jsonEnt.Metadata;

    // textarea
    type.value = meta.Type;
    attributes.value = meta.ExpectedAttributes != null ? meta.ExpectedAttributes.join("\n") : "";
    superclasses.value = meta.SuperClass;
    isattrof.value = meta.IsAttributeOf != null ? meta.IsAttributeOf.join("\n") : "";
    refentities.value = meta.CrossRefEntities != null ? meta.CrossRefEntities.join("\n") : "";

    mounted = true;
});

watchEffect(() => {

    const tp = type.value;
    const ea = attributes.value;
    const sc = superclasses.value;
    const ao = isattrof.value;
    const re = refentities.value;

    if (mounted) {
        jsonEnt.SetMeta(tp, ea, sc, ao, re);
        fitTextarea(taEA.value!, ea);
        fitTextarea(taSC.value!, sc);
        fitTextarea(taAO.value!, ao);
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
