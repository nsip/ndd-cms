<template>

    <div class="tab">
        <button class="tab-links-preview" id="tab-default-preview" @click="showTabContent"> {{ choices[0] }}</button>
        <button class="tab-links-preview" @click="showTabContent"> {{ choices[1] }}</button>
    </div>

    <div v-if="mTabShown.get(choices[0])" class="tab-content">
        <EntVisualContent v-if="props.Cat == 'entity'" />
        <ColVisualContent v-if="props.Cat == 'collection'" />
    </div>

    <div v-if="mTabShown.get(choices[1])" class="tab-content">
        <pre>{{ genJSON() }}</pre>
    </div>

</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { jsonCol } from "@/share/ColType";
import EntVisualContent from "@/components/entity/VisualContent.vue";
import ColVisualContent from "@/components/collection/VisualContent.vue";

const props = defineProps({
    Cat: String,
})

const choices = reactive([
    "Preview",
    "JSON",
]);

const genJSON = () => {
    return (props.Cat == 'entity' ? jsonEnt : jsonCol).GenJSON()
};

// tab content shown flag, key is tab-text
const mTabShown = ref(new Map([
    [choices[0], false],
    [choices[1], false],
]));

onMounted(async () => {
    await setDefaultTab("tab-default-preview")
})

const showTabContent = async (evt: MouseEvent) => {

    const id = (evt.target! as HTMLElement).textContent
    console.log(id)

    mTabShown.value.forEach((flag, tab) => {
        mTabShown.value.set(tab, tab == id ? true : false)
    });

    let tab_links = document.getElementsByClassName("tab-links-preview");
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
    font-size: 17px;
    height: 100%;
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
</style>
