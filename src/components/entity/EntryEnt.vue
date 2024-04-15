<template>

    <div class="wrapper">
        <button class="scroll-button prev" id="scrollLeftBtn" @click="prev_click">&lt;</button>
        <div class="tab" id="tabs-container">
            <button class="tab-links" id="tab-default" @click="showTabContent" :hidden="!visible(0)"> {{ choices[0] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visible(1)"> {{ choices[1] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visible(2)"> {{ choices[2] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visible(3)"> {{ choices[3] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visible(4)"> {{ choices[4] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visible(5)"> {{ choices[5] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visible(6)"> {{ choices[6] }}</button>
            <button class="tab-links" @click="showTabContent" :hidden="!visible(7)"> {{ choices[7] }}</button>
        </div>
        <button class="scroll-button next" id="scrollRightBtn" @click="next_click">&gt;</button>
    </div>

    <div id="entry-ent">
        <div v-if="mTabShown.get(choices[0]) && visible(0)" class="tab-content">
            <EntName />
        </div>
        <div v-if="mTabShown.get(choices[1]) && visible(1)" class="tab-content">
            <EntDef />
        </div>
        <div v-if="mTabShown.get(choices[2]) && visible(2)" class="tab-content">
            <EntSIF />
        </div>
        <div v-if="mTabShown.get(choices[3]) && visible(3)" class="tab-content">
            <EntOtherStd />
        </div>
        <div v-if="mTabShown.get(choices[4]) && visible(4)" class="tab-content">
            <EntLegalDef />
        </div>
        <div v-if="mTabShown.get(choices[5]) && visible(5)" class="tab-content">
            <EntSensi />
        </div>
        <div v-if="mTabShown.get(choices[6]) && visible(6)" class="tab-content">
            <EntCol />
        </div>
        <div v-if="mTabShown.get(choices[7]) && visible(7)" class="tab-content">
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

// TODO: 
const visible = (idx: number) => {
    return idx >= startIndex.value;
}

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

// tab content shown flag, key is tab-text
const mTabShown = ref(new Map([
    [choices[0], false],
    [choices[1], false],
    [choices[2], false],
    [choices[3], false],
    [choices[4], false],
    [choices[5], false],
    [choices[6], false],
    [choices[7], false],
]));

const startIndex = ref(0);

onMounted(async () => {
    await setSameWidth();
    await setDefaultTab("tab-default");
})

const showTabContent = async (evt: MouseEvent) => {

    const id = (evt.target! as HTMLElement).textContent
    console.log(id)

    mTabShown.value.forEach((flag, tab) => {
        mTabShown.value.set(tab, tab == id ? true : false)
    });

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
