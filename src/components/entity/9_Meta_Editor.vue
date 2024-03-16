<template>

    <div class="lbl">
        <label id="type-lbl">Type:</label>
        <span class="type-input" v-for="choice in choices">
            <input v-model="type" type="radio" name="type" :value="choice" @change="select" />
            <label>{{ choice }}</label>
        </span>
    </div>

    <div class="lbl">
        <label> Super Class: </label>
        <input type="text" class="content" v-model="superClass" placeholder="super class" :disabled="disTaSC" :title="tipTaSC" />
    </div>

    <div class="lbl">
        <label> Is Attribute Of: </label>
        <textarea class="content" ref="taAO" v-model="isAttrOf" placeholder="is attribute of" :disabled="disTaAO" :title="tipTaAO"></textarea>
    </div>

    <div class="lbl">
        <label> Cross Reference Entities: </label>
        <textarea class="content" ref="taRE" v-model="refEntities" placeholder="cross reference entities" :disabled="disTaRE" :title="tipTaRE"></textarea>
    </div>

</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { fitTextarea } from "@/share/util";
import { getListItemType, itemCat } from "@/share/share"

const type = ref("");
const superClass = ref("");
const isAttrOf = ref("");
const refEntities = ref("");

const taAO = ref<HTMLTextAreaElement | null>(null);
const taRE = ref<HTMLTextAreaElement | null>(null);

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const disTaSC = computed(() => jsonEnt.Entity.includes('=>'));
const disTaAO = computed(() => jsonEnt.Entity.includes('=>'));
const disTaRE = computed(() => jsonEnt.Entity.includes('=>'));

const tipTaSC = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [SuperClass] cannot be edited' : '');
const tipTaAO = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [IsAttributeOf] cannot be edited' : '');
const tipTaRE = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [CrossRefEntities] cannot be edited' : '');

const choices = ref();

onMounted(async () => {
    const meta = jsonEnt.Metadata;

    // textarea
    type.value = meta.Type;
    superClass.value = meta.SuperClass;
    isAttrOf.value = meta.IsAttributeOf != null ? meta.IsAttributeOf.join("\n") : "";
    refEntities.value = meta.CrossRefEntities != null ? meta.CrossRefEntities.join("\n") : "";

    // 'Type' radio button choices
    choices.value = (await getListItemType(itemCat.value)).data as string[];

    mounted = true;
});

watchEffect(() => {

    const tp = type.value;
    const sc = superClass.value;
    const ao = isAttrOf.value;
    const re = refEntities.value;

    if (mounted) {
        jsonEnt.SetMeta(tp, sc, ao, re);
        fitTextarea(taAO.value!, ao);
        fitTextarea(taRE.value!, re);
    }
});

const select = () => { };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lbl {
    margin-top: 20px;
    margin-left: 20px;
    font-weight: bold;
}

#type-lbl {
    margin-right: 50px;
}

.type-input {
    margin-left: 20px;
    font-weight: normal;
}

</style>
