<template>

    <div class="tab">
        <button class="tab-links" id="tab-default" @click="showTabContent"> {{ choices[0] }}</button>
        <button class="tab-links" @click="showTabContent"> {{ choices[1] }}</button>
        <button class="tab-links" @click="showTabContent"> {{ choices[2] }}</button>
        <button class="tab-links" @click="showTabContent"> {{ choices[3] }}</button>
        <button class="tab-links" @click="showTabContent"> {{ choices[4] }}</button>
        <button class="tab-links" @click="showTabContent"> {{ choices[5] }}</button>
        <button class="tab-links" @click="showTabContent"> {{ choices[6] }}</button>
        <button class="tab-links" @click="showTabContent"> {{ choices[7] }}</button>
        <button class="tab-links" @click="showTabContent"> {{ choices[8] }}</button>
    </div>

    <div id="entry-ent">
        <div v-if="mTabShown.get(choices[0])" class="tab-content">
            <EntName />
        </div>
        <div v-if="mTabShown.get(choices[1])" class="tab-content">
            <EntOtherNames />
        </div>
        <div v-if="mTabShown.get(choices[2])" class="tab-content">
            <EntDef />
        </div>
        <div v-if="mTabShown.get(choices[3])" class="tab-content">
            <EntSIF />
        </div>
        <div v-if="mTabShown.get(choices[4])" class="tab-content">
            <EntOtherStd />
        </div>
        <div v-if="mTabShown.get(choices[5])" class="tab-content">
            <EntLegalDef />
        </div>
        <div v-if="mTabShown.get(choices[6])" class="tab-content">
            <EntSensi />
        </div>
        <div v-if="mTabShown.get(choices[7])" class="tab-content">
            <EntCol />
        </div>
        <div v-if="mTabShown.get(choices[8])" class="tab-content">
            <EntMeta />
        </div>
    </div>

</template>

<script setup lang="ts">

import EntName from "@/components/entity/1_Name.vue";
import EntOtherNames from "@/components/entity/2_OtherNames.vue";
import EntDef from "@/components/entity/3_Def.vue";
import EntSIF from "@/components/entity/4_SIF.vue";
import EntOtherStd from "@/components/entity/5_OtherStd.vue";
import EntLegalDef from "@/components/entity/6_LegalDef.vue";
import EntSensi from "@/components/entity/7_Sensi.vue"
import EntCol from "@/components/entity/8_Col.vue";
import EntMeta from "@/components/entity/9_Meta.vue";

const choices = [
    "Entity",
    "OtherNames",
    "Definition",
    "SIF",
    "OtherStandards",
    "LegalDefinitions",
    "Sensitivity",
    "Collections",
    "MetaData",
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
    [choices[8], false],
]));

onMounted(async () => {
    await setDefaultTab("tab-default")
})

const showTabContent = async (evt: MouseEvent) => {

    const id = (evt.target! as HTMLElement).textContent
    console.log(id)

    mTabShown.value.forEach((flag, tab) => {
        mTabShown.value.set(tab, tab == id ? true : false)
    });

    let tab_links = document.getElementsByClassName("tab-links");
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

#entry-ent {
    height: 87vh;
    overflow-y: scroll;
    scrollbar-width: none;
}
</style>
