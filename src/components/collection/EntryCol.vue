<template>

    <div class="area-tabs">
        <div class="tab" id="tabs-container">
            <button v-for="(template, idx) in components" class="tab-links" :id="'tab-' + idx" @click="showTabContent" :hidden="!visTab(idx)"> {{ template.tab }}</button>
        </div>
    </div>

    <div id="entry-col">
        <template v-for="template in components" class="tab-content">
            <component :is="template.com" v-if="visCom(template.tab)"> </component>
        </template>
    </div>

</template>

<script setup lang="ts">

import ColName from "@/components/collection/1_Name.vue";
import ColDef from "@/components/collection/2_Def.vue";
import ColUrl from "@/components/collection/3_Url.vue";
import ColMeta from "@/components/collection/4_Meta.vue";

const components = [
    { tab: "Collection", com: ColName },
    { tab: "Definition", com: ColDef },
    { tab: "URL", com: ColUrl },
    { tab: "MetaData", com: ColMeta },
];

const startIndex = ref(0);
const curSelTab = ref(components[0].tab)
const visTab = (idx: number) => { return idx >= startIndex.value; }
const visCom = (tab: string) => { return curSelTab.value == tab; }

onMounted(async () => {
    await setSameWidth();
    await setDefaultTab("tab-0")
})

const showTabContent = async (evt: MouseEvent) => {

    // current selected tab text assignment
    curSelTab.value = (evt.target! as HTMLElement).textContent!;

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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.area-tabs {
    display: flex;
    /* justify-content: space-between; */
    background-color: #f1f1f1;
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
    padding: 11px;
    transition: 0.3s;
    font-size: 16px;
    height: 100%;
    font-style: italic;
    font-weight: bold;
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

#entry-col {
    height: 87vh;
    overflow-y: scroll;
    scrollbar-width: none;
}
</style>
