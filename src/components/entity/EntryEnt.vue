<template>

    <div class="wrapper">
        <button class="scroll-button prev" id="scrollLeftBtn" @click="prev_click">&lt;</button>
        <div class="tab" id="tabs-container">
            <button v-for="(template, idx) in components" class="tab-links" :id="'tab-' + idx" @click="showTabContent" :hidden="!visTab(idx)"> {{ template.tab }}</button>
        </div>
        <button class="scroll-button next" id="scrollRightBtn" @click="next_click">&gt;</button>
    </div>

    <div id="entry-ent">
        <template v-for="template in components" class="tab-content">
            <component :is="template.com" v-if="visCom(template.tab)"> </component>
        </template>
    </div>

</template>

<script setup lang="ts">

import EntName from "@/components/entity/1_Name.vue";
import EntDef from "@/components/entity/2_Def.vue";
import EntSIF from "@/components/entity/3_SIF.vue";
import EntOtherStd from "@/components/entity/4_OtherStd.vue";
import EntLegalDef from "@/components/entity/5_LegalDef.vue";
import EntSensi from "@/components/entity/6_Sensi.vue"
import EntCol from "@/components/entity/7_Col.vue";
import EntMeta from "@/components/entity/8_Meta.vue";

const components = [
    { tab: "Entity", com: EntName },
    { tab: "Definition", com: EntDef },
    { tab: "SIF", com: EntSIF },
    { tab: "OtherStandards", com: EntOtherStd },
    { tab: "LegalDefinitions", com: EntLegalDef },
    { tab: "Sensitivity", com: EntSensi },
    { tab: "Collections", com: EntCol },
    { tab: "MetaData", com: EntMeta },
];

const curSelTab = ref(components[0].tab)

const curSelTabIdx = computed(() => {
    let idx = 0;
    components.forEach((e, i) => { if (e.tab == curSelTab.value) { idx = i } })
    return idx
});

const visTab = (idx: number) => {
    return idx >= startIndex.value;
}

const visCom = (tab: string) => {
    return curSelTab.value == tab;
}

const startIndex = ref(0);

onMounted(async () => {
    await setSameWidth();
    await setDefaultTab("tab-0");
})

const showTabContent = async (evt: MouseEvent) => {

    const tabTxt = (evt.target! as HTMLElement).textContent
    curSelTab.value = tabTxt!;

    // tab menu effect
    const tab_links = document.getElementsByClassName("tab-links");
    for (let i = 0; i < tab_links.length; i++) {
        tab_links[i].className = tab_links[i].className.replace(" active", "");
    }
    (evt.currentTarget! as HTMLElement).className += " active";
}

const setDefaultTab = async (id: string) => {
    const iid = window.setInterval(() => { document.getElementById(id)!.click(); }, 50)
    window.setTimeout(() => { window.clearInterval(iid) }, 1000)
}

const setSameWidth = async () => {

    const container = document.getElementById('tabs-container');
    const tabs = container?.querySelectorAll('.tab-links');

    let maxWidth = 0;
    tabs?.forEach(e => {
        const width = (e as HTMLElement).offsetWidth;
        if (width > maxWidth) {
            maxWidth = width;
        }
    })

    tabs?.forEach(e => {
        (e as HTMLElement).style.width = maxWidth + 'px';
    })
}

const next_click = async () => {
    if (startIndex.value < 7) {
        startIndex.value++;
        if (startIndex.value > curSelTabIdx.value) {
            console.log(`should set: tab-${startIndex.value}`)
        }
    }
}

const prev_click = async () => {
    if (startIndex.value > 0) {
        startIndex.value--;
        if (startIndex.value > curSelTabIdx.value) {
            console.log(`should set: tab-${startIndex.value}`)
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
    display: flex;
    /* justify-content: space-between; */
    background-color: #f1f1f1;
}

/* right most element keep right alignment */
.wrapper div:nth-child(n) {
    margin-right: auto;
}

/* Style the tab */
.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    height: 4vh;
}

/* Style the buttons inside the tab */
.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
    font-size: 14px;
    height: 100%;
    font-style: italic;
    font-weight: bold;
    text-align: center;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
    background-color: #ccc;
}

/* Style the tab content */
.tab-content {
    padding: 1px 1px;
    border: 1px solid #ccc;
    border-top: none;
}

#entry-ent {
    height: 87vh;
    overflow-y: scroll;
    scrollbar-width: none;
}

.scroll-button {
    position: relative;
    top: 0;
    bottom: 0;
    width: 40px;
    background-color: #e4eef3;
    border: none;
    cursor: pointer;
    outline: none;
}

.prev {
    width: 2.5vh;
    flex-shrink: 0;
    left: 0;
}

.next {
    width: 2.5vh;
    flex-shrink: 0;
    float: right;
}
</style>
