<template>

    <div class="lbl">
        <label id="type-lbl">Type:</label>
        <span class="type-input" v-for="choice in choices">
            <input v-model="type" type="radio" name="type" :value="choice" @change="select" />
            <label>{{ choice }}</label>
        </span>
    </div>

    <!-- TODO: dropdown -->
    <div class="lbl">
        <label> Super Class: </label>
        <!-- <input type="text" class="content" v-model="superClass" placeholder="super class" :disabled="disTaSC" :title="tipTaSC" /> -->
        <select v-if="drop_list_ae?.length > 0" ref="scSelect" :disabled="disTaSC" :title="tipTaSC" @change="switchSC($event)">
            <option value="-1" class="firstOpt">--- super class ({{ drop_list_ae?.length }} items)  ---</option>
            <option v-for="(item, idx) in drop_list_ae" :key="idx"> {{ item }}</option>
        </select>
    </div>

    <!-- TODO: dropdown -->
    <div class="lbl">
        <label> Is Attribute Of: </label>
        <textarea class="content" ref="taAO" v-model="isAttrOf" placeholder="is attribute of" :disabled="disTaAO" :title="tipTaAO" wrap="off"></textarea>
    </div>

    <!-- TODO: dropdown -->
    <div class="lbl">
        <label> Cross Reference Entities: </label>
        <textarea class="content" ref="taRE" v-model="refEntities" placeholder="cross reference entities" :disabled="disTaRE" :title="tipTaRE" wrap="off"></textarea>
    </div>

</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { fitTextarea, UnionArrays } from "@/share/util";
import { getListItemType, itemCat, getListItem } from "@/share/share"

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

const drop_list_e = ref();
const drop_list_a = ref();
const drop_list_o = ref();
const drop_list_c = ref();
const drop_list_ae = ref();
const drop_list_aeo = ref();

const scSelect = ref(null);
const switchSC = (event: any) => {
    if (event.target.value != "-1") {
        alert(event.target.value)

        // const select = scSelect.value as HTMLSelectElement | null;
        // if (select != null) {
        //     select.selectedIndex = 0;
        // }
    }
}


onMounted(async () => {

    const meta = jsonEnt.Metadata;

    // textarea
    type.value = meta.Type;
    superClass.value = meta.SuperClass;
    isAttrOf.value = meta.IsAttributeOf != null ? meta.IsAttributeOf.join("\n") : "";
    refEntities.value = meta.CrossRefEntities != null ? meta.CrossRefEntities.join("\n") : "";

    // 'Type' radio button choices
    choices.value = (await getListItemType(itemCat.value)).data as string[];

    // dropdown list
    drop_list_a.value = ((await getListItem('abstract')).data as string[]).sort((a, b) => a.localeCompare(b));
    drop_list_e.value = ((await getListItem('element')).data as string[]).sort((a, b) => a.localeCompare(b));
    drop_list_o.value = ((await getListItem('object')).data as string[]).sort((a, b) => a.localeCompare(b));
    drop_list_c.value = ((await getListItem('collection')).data as string[]).sort((a, b) => a.localeCompare(b));
    drop_list_ae.value = (UnionArrays(drop_list_a.value, drop_list_e.value) as string[]).sort((a, b) => a.localeCompare(b));;
    drop_list_aeo.value = (UnionArrays(drop_list_a.value, drop_list_e.value, drop_list_o.value) as string[]).sort((a, b) => a.localeCompare(b));

    // set original textarea height
    fitTextarea(taAO.value!, isAttrOf.value);
    fitTextarea(taRE.value!, refEntities.value);

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
