<template>

    <div class="com">

        <TextLine text="type:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
        <div class="area-rb-selection">
            <span v-for="choice in choicesType" class="rb-each">
                <input v-model="type" type="radio" name="type" :value="choice" @change="select_type" :disabled="disRbType" />
                <label>{{ choice }}</label>
            </span>
        </div>

        <TextLine text="super class:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
        <div class="area-dropdown-list">
            <select v-model="superClass" :title="tipSelSC" @change="switchSC" class="dropdown-list" :disabled="disSelSC">
                <option value="">--- EMPTY ---</option>
                <option v-for="(item, idx) in options_SC" :key="idx" :value="item"> {{ item }}</option>
            </select>
        </div>

        <button class="less-editor" title="remove the last selection" @click="onMoreLessClick('-ao')"> <font-awesome-icon icon="circle-minus" /> </button>
        <button class="more-editor" title="add more selection" @click="onMoreLessClick('+ao')"> <font-awesome-icon icon="circle-plus" /> </button>
        <TextLine text="is attribute of:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
        <div v-for="i in isAttrOf_one.length" :key="i" class="area-dropdown-list">
            <select :id="'select-ao' + (i - 1)" v-model="isAttrOf_one[i - 1]" :title="tipSelAO" @change="switchAO($event, i - 1)" class="dropdown-list" :disabled="disSelAO">
                <option value="">--- EMPTY ---</option>
                <option v-for="(item, idx) in options_AO" :key="idx" :value="item"> {{ item }}</option>
            </select>
        </div>

        <button class="less-editor" title="remove the last selection" @click="onMoreLessClick('-re')"> <font-awesome-icon icon="circle-minus" /> </button>
        <button class="more-editor" title="add more selection" @click="onMoreLessClick('+re')"> <font-awesome-icon icon="circle-plus" /> </button>
        <TextLine text="cross reference entities:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
        <div v-for="i in refEntities_one.length" :key="i" class="area-dropdown-list">
            <select :id="'select-re' + (i - 1)" v-model="refEntities_one[i - 1]" :title="tipSelRE" @change="switchRE($event, i - 1)" class="dropdown-list" :disabled="disSelRE">
                <option value="">--- EMPTY ---</option>
                <option v-for="(item, idx) in options_RE" :key="idx" :value="item"> {{ item }}</option>
            </select>
        </div>

        <TextLine text="timeframe:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" class="sub-title" />
        <div class="area-rb-selection area-rb-selection-tf">
            <span v-for="choice in choicesTimeframe" class="rb-each">
                <input v-model="timeframe" type="radio" name="timeframe" :value="choice" @change="select_timeframe" :disabled="disRbTF" />
                <label>{{ choice }}</label>
            </span>
        </div>

    </div>

</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { fitTextarea, UnionArrays } from "@/share/util";
import { getListItemType, itemCat, getListItem } from "@/share/share"
import TextLine from "@/components/TextLine.vue";

const type = ref("");          // meta Type value
const superClass = ref("");    // meta SuperClass value
const isAttrOf = ref("");      // meta IsAttributeOf value
const refEntities = ref("");   // meta CrossRefEntities value
const timeframe = ref("");     // meta Timeframe value

const isAttrOf_one = ref<string[]>([]);    // one element value list for multiple dropdown lists
const refEntities_one = ref<string[]>([]); // one element value list for multiple dropdown lists

let mounted = false; // flag: let 'watchEffect' after 'onMounted'

const disRbType = computed(() => jsonEnt.Entity.includes('=>'));
const disSelSC = computed(() => jsonEnt.Entity.includes('=>'));
const disSelAO = computed(() => jsonEnt.Entity.includes('=>'));
const disSelRE = computed(() => jsonEnt.Entity.includes('=>'));
const disRbTF = computed(() => jsonEnt.Entity.includes('=>'));

const tipSelSC = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [SuperClass] cannot be edited' : '');
const tipSelAO = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [IsAttributeOf] cannot be edited' : '');
const tipSelRE = computed(() => jsonEnt.Entity.includes('=>') ? 'If entity name is on changing stage, [CrossRefEntities] cannot be edited' : '');

const choicesType = ref();
const choicesTimeframe = ref();

const options_e = ref();
const options_a = ref();
const options_o = ref();
const options_c = ref();
const options_ae = ref();
const options_aeo = ref();

const options_SC = computed(() => {
    switch (type.value) {
        case "Abstract Element":
            return options_a.value;
        case "Element":
            return options_ae.value;
        case "Object":
            return options_o.value;
        default:
            return options_aeo.value;
    }
});

const options_AO = computed(() => {
    return options_o.value;
});

const options_RE = computed(() => {
    return options_aeo.value;
});

const switchSC = () => {
    // superClass.value = ""
}

const switchAO = (event: Event, idx: number) => {

    const current = (event.target as HTMLSelectElement).value;
    const selected = isAttrOf_one.value;

    let sel_prev: string[] = [];
    const p = selected.indexOf(current);
    if (p != -1) {
        const h = selected.slice(0, p);
        const t = selected.slice(p + 1);
        sel_prev = [...h, ...t];
    }

    if (sel_prev.length >= 1 && sel_prev.includes(current)) {
        alert(`'${current}' already selected`)

        // firefox cannot auto select by its v-model value, so manually change it
        const select_ao: HTMLSelectElement = document.getElementById("select-ao" + idx) as HTMLSelectElement;
        select_ao.selectedIndex = 0;

        isAttrOf_one.value[idx] = "" //  firefox cannot auto select menu option only by this.
    }
}

const switchRE = (event: Event, idx: number) => {

    const current = (event.target as HTMLSelectElement).value;
    const selected = refEntities_one.value;

    let sel_prev: string[] = [];
    const p = selected.indexOf(current);
    if (p != -1) {
        const h = selected.slice(0, p);
        const t = selected.slice(p + 1);
        sel_prev = [...h, ...t];
    }

    if (sel_prev.length >= 1 && sel_prev.includes(current)) {
        alert(`'${current}' already selected`)

        // firefox cannot auto select by its v-model value, so manually change it
        const select_re: HTMLSelectElement = document.getElementById("select-re" + idx) as HTMLSelectElement;
        select_re.selectedIndex = 0;

        refEntities_one.value[idx] = "" // firefox cannot auto select menu option only by this.
    }
}

onMounted(async () => {

    // 'Type' radio button choices
    choicesType.value = (await getListItemType(itemCat.value)).data as string[];

    // 'Timeframe' radio button choices
    choicesTimeframe.value = ["Current", "Historical", "Prospective"] // (await getListItemType(itemCat.value)).data as string[];

    // dropdown list
    options_a.value = ((await getListItem('abstract')).data as string[]).sort((a, b) => a.localeCompare(b));
    options_e.value = ((await getListItem('element')).data as string[]).sort((a, b) => a.localeCompare(b));
    options_o.value = ((await getListItem('object')).data as string[]).sort((a, b) => a.localeCompare(b));
    options_c.value = ((await getListItem('collection')).data as string[]).sort((a, b) => a.localeCompare(b));
    options_ae.value = (UnionArrays(options_a.value, options_e.value) as string[]).sort((a, b) => a.localeCompare(b));;
    options_aeo.value = (UnionArrays(options_a.value, options_e.value, options_o.value) as string[]).sort((a, b) => a.localeCompare(b));

    /////////////////////////////////////////////////////////////////

    // *** init model variables *** //
    //
    const meta = jsonEnt.Metadata;

    type.value = meta.Type;
    if (type.value.length == 0) {
        type.value = "Element"
    }

    superClass.value = meta.SuperClass;

    isAttrOf_one.value = meta.IsAttributeOf;
    if (isAttrOf_one.value.length == 0) {
        isAttrOf_one.value.push("")
    }

    refEntities_one.value = meta.CrossRefEntities;
    if (refEntities_one.value.length == 0) {
        refEntities_one.value.push("")
    }

    timeframe.value = meta.Timeframe;
    if (timeframe.value.length == 0) {
        timeframe.value = "Current"
    }

    mounted = true;
});

watchEffect(() => {

    isAttrOf.value = isAttrOf_one.value.join("\n")
    refEntities.value = refEntities_one.value.join("\n");

    const tp = type.value;
    const sc = superClass.value;
    const ao = isAttrOf.value;
    const re = refEntities.value;
    const tf = timeframe.value;

    if (mounted) {
        jsonEnt.SetMeta(tp, sc, ao, re, tf);
    }
});

const select_type = () => {
    superClass.value = ""
};

const select_timeframe = () => { }

const onMoreLessClick = (type: string) => {
    switch (type) {
        case "+ao":
            {
                const len = isAttrOf_one.value.length
                if (len == 0 || (len > 0 && isAttrOf_one.value[len - 1].length > 0)) {
                    isAttrOf_one.value.push("")
                }
            }
            break;

        case "-ao":
            {
                const len = isAttrOf_one.value.length
                if (len > 1) {
                    isAttrOf_one.value.pop();
                } else {
                    alert("select 'EMPTY' if want to remove the last one")
                }
            }
            break;

        case "+re":
            {
                const len = refEntities_one.value.length
                if (len == 0 || (len > 0 && refEntities_one.value[len - 1].length > 0)) {
                    refEntities_one.value.push("");
                }
            }
            break;

        case "-re":
            {
                const len = refEntities_one.value.length
                if (len > 1) {
                    refEntities_one.value.pop();
                } else {
                    alert("select 'EMPTY' if want to remove the last one")
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
    font-weight: normal;
}

.lbl-ex {
    position: relative;
    left: 5%;
    margin-top: 20px;
}

#type-lbl {
    margin-right: 50px;
}

.area-rb-selection {
    position: relative;
    left: 19vh;
}

.area-rb-selection-tf {
    margin-bottom: 1vh;
}

.rb-each {
    margin-right: 12px;
    font-weight: bold;
    font-style: italic;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}

.dropdown-list {
    position: relative;
    padding: 5px 5px 5px 5px;
}

.area-dropdown-list {
    position: relative;
    left: 19vh;
}

.sub-title {
    font-weight: bold;
}
</style>
