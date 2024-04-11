<template>

    <div class="lbl">
        <label id="type-lbl">Type:</label>
        <span v-for="choice in choicesType" class="type-input">
            <input v-model="type" type="radio" name="type" :value="choice" @change="select" :disabled="disRbType" />
            <label>{{ choice }}</label>
        </span>
    </div>

    <div class="lbl">
        <label> Super Class: </label>
        <select v-if="options_ae?.length > 0" v-model="superClass" :disabled="disSelSC" :title="tipSelSC" @change="switchSC" class="dropdown-list">
            <option value="">--- empty ---</option>
            <option v-for="(item, idx) in options_ae" :key="idx" :value="item"> {{ item }}</option>
        </select>
    </div>

    <div class="lbl">
        <label> Is Attribute Of: </label>
        <select v-if="options_o?.length > 0" v-model="isAttrOf_oneElem" :disabled="disSelAO" :title="tipSelAO" @change="switchAO" class="dropdown-list">
            <option value="">--- empty ---</option>
            <option v-for="(item, idx) in options_o" :key="idx" :value="item"> {{ item }}</option>
        </select>
        <button class="less-editor-dropdownlist" @click="onMoreLessClick('-ao')">
            <font-awesome-icon icon="circle-minus" />
        </button>
        <button class="more-editor-dropdownlist" @click="onMoreLessClick('+ao')">
            <font-awesome-icon icon="circle-plus" />
        </button>
    </div>
    <div class="lbl-ex"> {{ showIsAttrOf }} </div>

    <div class="lbl">
        <label> Cross Reference Entities: </label>
        <select v-if="options_aeo?.length > 0" v-model="refEntities_oneElem" :disabled="disSelRE" :title="tipSelRE" @change="switchRE" class="dropdown-list">
            <option value="">--- empty ---</option>
            <option v-for="(item, idx) in options_aeo" :key="idx" :value="item"> {{ item }}</option>
        </select>
        <button class="less-editor-dropdownlist" @click="onMoreLessClick('-re')">
            <font-awesome-icon icon="circle-minus" />
        </button>
        <button class="more-editor-dropdownlist" @click="onMoreLessClick('+re')">
            <font-awesome-icon icon="circle-plus" />
        </button>
    </div>
    <div class="lbl-ex"> {{ showRefEntities }} </div>

</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { fitTextarea, UnionArrays } from "@/share/util";
import { getListItemType, itemCat, getListItem } from "@/share/share"

const type = ref("");                // meta Type value
const superClass = ref("");          // meta SuperClass value
const isAttrOf = ref("");            // meta IsAttributeOf value
const isAttrOf_oneElem = ref("");    // one element value for dropdown list
const refEntities = ref("");         // meta CrossRefEntities value
const refEntities_oneElem = ref(""); // one element value for dropdown list

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const disRbType = computed(() => jsonEnt.Entity.includes('=>'));
const disSelSC = computed(() => jsonEnt.Entity.includes('=>'));
const disSelAO = computed(() => jsonEnt.Entity.includes('=>'));
const disSelRE = computed(() => jsonEnt.Entity.includes('=>'));

const tipSelSC = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [SuperClass] cannot be edited' : '');
const tipSelAO = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [IsAttributeOf] cannot be edited' : '');
const tipSelRE = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [CrossRefEntities] cannot be edited' : '');

const choicesType = ref();

const options_e = ref();
const options_a = ref();
const options_o = ref();
const options_c = ref();
const options_ae = ref();
const options_aeo = ref();

const switchSC = () => { }
const switchAO = () => { }
const switchRE = () => { }

onMounted(async () => {

    const meta = jsonEnt.Metadata;

    // init model variables
    type.value = meta.Type;
    superClass.value = meta.SuperClass;
    isAttrOf.value = meta.IsAttributeOf != null ? meta.IsAttributeOf.join("\n") : "";
    refEntities.value = meta.CrossRefEntities != null ? meta.CrossRefEntities.join("\n") : "";

    // 'Type' radio button choices
    choicesType.value = (await getListItemType(itemCat.value)).data as string[];

    // dropdown list
    options_a.value = ((await getListItem('abstract')).data as string[]).sort((a, b) => a.localeCompare(b));
    options_e.value = ((await getListItem('element')).data as string[]).sort((a, b) => a.localeCompare(b));
    options_o.value = ((await getListItem('object')).data as string[]).sort((a, b) => a.localeCompare(b));
    options_c.value = ((await getListItem('collection')).data as string[]).sort((a, b) => a.localeCompare(b));
    options_ae.value = (UnionArrays(options_a.value, options_e.value) as string[]).sort((a, b) => a.localeCompare(b));;
    options_aeo.value = (UnionArrays(options_a.value, options_e.value, options_o.value) as string[]).sort((a, b) => a.localeCompare(b));

    mounted = true;
});

watchEffect(() => {

    const tp = type.value;
    const sc = superClass.value;
    const ao = isAttrOf.value;
    const re = refEntities.value;

    if (mounted) {
        jsonEnt.SetMeta(tp, sc, ao, re);
    }
});

const showIsAttrOf = computed(() => isAttrOf.value.split("\n").filter((p) => p.trim().length > 0).join(", "))
const showRefEntities = computed(() => refEntities.value.split("\n").filter((p) => p.trim().length > 0).join(", "))

const select = () => { };

const onMoreLessClick = (type: string) => {
    switch (type) {
        case "+ao":
            {
                const newElem = isAttrOf_oneElem.value;
                if (newElem.length > 0) {
                    if (!isAttrOf.value.split("\n").includes(newElem)) {
                        isAttrOf.value += "\n" + newElem;
                        isAttrOf_oneElem.value = ""
                    }
                }
            }
            break;

        case "-ao":
            {
                const elems = isAttrOf.value.split("\n");
                if (elems.length >= 1) {
                    isAttrOf.value = elems.slice(0, -1).join("\n");
                    isAttrOf_oneElem.value = ""
                }
            }
            break;

        case "+re":
            {
                const newElem = refEntities_oneElem.value;
                if (newElem.length > 0) {
                    if (!refEntities.value.split("\n").includes(newElem)) {
                        refEntities.value += "\n" + newElem;
                        refEntities_oneElem.value = ""
                    }
                }
            }
            break;

        case "-re":
            {
                const elems = refEntities.value.split("\n");
                if (elems.length >= 1) {
                    refEntities.value = elems.slice(0, -1).join("\n");
                    refEntities_oneElem.value = ""
                }
            }
            break;

        default:
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lbl {
    margin-top: 20px;
    margin-left: 20px;
    font-weight: bold;
}

.lbl-ex {
    position: relative;
    left: 5%;
    margin-top: 20px;
}

#type-lbl {
    margin-right: 50px;
}

.type-input {
    margin-left: 20px;
    font-weight: normal;
}

.dropdown-list {
    position: absolute;
    left: 13%;
}
</style>
