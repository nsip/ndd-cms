<template>

    <div class="wrapper">
        <button class="scroll-button prev" id="scrollLeftBtn" @click="prev_click">&lt;</button>
        <div class="tab" id="tabs-container">
            <button class="tab-links" id="tab-default" @click="showTabContent" :hidden="!visTab(0)"> {{ choices[0] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visTab(1)"> {{ choices[1] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visTab(2)"> {{ choices[2] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visTab(3)"> {{ choices[3] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visTab(4)"> {{ choices[4] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visTab(5)"> {{ choices[5] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visTab(6)"> {{ choices[6] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visTab(7)"> {{ choices[7] }}</button>
        </div>
        <button class="scroll-button next" id="scrollRightBtn" @click="next_click">&gt;</button>
    </div>

    <div id="entry-ent">
        <div v-if="visContent(0)" class="tab-content">
            <EntName />
        </div>
        <div v-if="visContent(1)" class="tab-content">
            <EntDef />
        </div>
        <div v-if="visContent(2)" class="tab-content">
            <EntSIF />
        </div>
        <div v-if="visContent(3)" class="tab-content">
            <EntOtherStd />
        </div>
        <div v-if="visContent(4)" class="tab-content">
            <EntLegalDef />
        </div>
        <div v-if="visContent(5)" class="tab-content">
            <EntSensi />
        </div>
        <div v-if="visContent(6)" class="tab-content">
            <EntCol />
        </div>
        <div v-if="visContent(7)" class="tab-content">
            <EntMeta />
        </div>
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

const choices = [
    "Entity",
    "Definition",
    "SIF",
    "OtherStandards",
    "LegalDefinitions",
    "Sensitivity",
    "Collections",
    "MetaData"
]

const curSelTab = ref(choices[0])

// TODO: 
const visTab = (idx: number) => {
    return idx >= startIndex.value;
}

const visContent = (idx: number) => {
    return curSelTab.value == choices[idx];
}

const startIndex = ref(0);

onMounted(async () => {
    await setSameWidth();
    await setDefaultTab("tab-default");
})

const showTabContent = async (evt: MouseEvent) => {

    const id = (evt.target! as HTMLElement).textContent
    console.log(id)

    curSelTab.value = id!;

    const tab_links = document.getElementsByClassName("tab-links");
    for (let i = 0; i < tab_links.length; i++) {
        tab_links[i].className = tab_links[i].className.replace(" active", "");
    }
    (evt.currentTarget! as HTMLElement).className += " active";
}

const setDefaultTab = async (id: string) => {
    const iid = window.setInterval(() => {
        document.getElementById(id)!.click();
    }, 50)
    window.setTimeout(() => {
        window.clearInterval(iid)
    }, 1000)
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

const prev_click = async () => {
    if (startIndex.value < 8) {
        startIndex.value++;
    }
}

const next_click = async () => {
    if (startIndex.value > 0) {
        startIndex.value--;
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
