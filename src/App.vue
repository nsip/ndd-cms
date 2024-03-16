<template>
    <MainTitle v-if="display" />
    <div v-if="display" id="container">
        <div id="left">
            <EntryEnt v-if="itemCat == 'entity'" />
            <EntryCol v-if="itemCat == 'collection'" />
        </div>
        <div id="right">
            <Preview :Cat="itemCat" />
        </div>
    </div>
    <BtnCMS v-if="display" />
    <notifications position="top center" :speed="2000" :duration="6000" :closeOnClick="false" />
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import { notify } from "@kyvg/vue3-notification";
import { Mode, loginAuth, loginToken, loginUser, getSelfName, itemName, itemCat, itemPhase, getItemContent } from "@/share/share";
import { jsonEnt } from "@/share/EntType";
import { jsonCol } from "@/share/ColType";
import MainTitle from "@/components/MainTitle.vue";
import Preview from "@/components/PreviewArea.vue";
import BtnCMS from "@/components/BtnCMS.vue";
import EntryEnt from "@/components/entity/EntryEnt.vue";
import EntryCol from "@/components/collection/EntryCol.vue";

const { cookies } = useCookies();
const display = ref(false)
let mounted = false; // flag: let 'watchEffect' after 'onMounted'

onMounted(async () => {

    // *** from url string. (no longer used) ***
    // // ref: https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/

    // const pName = window.location.href.indexOf("name=");
    // const pCat = window.location.href.indexOf("cat=");
    // const pAuth = window.location.href.indexOf("auth=");
    // // alert(`${pName} : ${pCat} : ${pAuth}`)

    // const name = pName >= 0 ? decodeURI(window.location.href.substring(pName + 5, pCat - 1)) : "";
    // const cat = pCat >= 0 ? decodeURI(window.location.href.substring(pCat + 5, pAuth - 1)) : "";
    // const auth = pAuth >= 0 ? decodeURI(window.location.href.substring(pAuth + 5)) : "";

    // loginToken.value = auth;
    // loginAuth.value = "Bearer " + auth;
    // itemName.value = name;
    // itemCat.value = cat;

    // *** from cookie ***
    // console.log(`${window.location.hostname} + ---> + ${cookies.keys()}`)

    const token = cookies.get("token");
    loginToken.value = token;
    loginAuth.value = "Bearer " + token;
    itemCat.value = cookies.get("cat");
    itemName.value = cookies.get("name");
    itemPhase.value = cookies.get('phase');

    console.log("[App.vue] Token:", window.location.hostname, " -- ", cookies.get("token"))
    console.log("[App.vue] item category:", itemCat.value)
    console.log("[App.vue] item name:", itemName.value)
    console.log("[App.vue] item phase:", itemPhase.value)

    if (loginToken.value.length < 128) {

        notify({
            title: "Error",
            text: "Invalid Auth Info",
            type: "error"
        })
        return

    } else {

        {
            const de = await getSelfName();
            if (de.error != null) {
                notify({
                    title: "Error: Cannot Get Self User Name",
                    text: de.error,
                    type: "error"
                })
                return
            }
            loginUser.value = de.data
        }

        await new Promise((f) => setTimeout(f, 500));

        if (itemName.value?.length > 0 && itemCat.value?.length > 0) {

            // console.log(`edit mode: ${itemName.value} : ${itemCat.value} : ${itemPhase.value}`)

            Mode.value = "edit";

            switch (itemCat.value) {
                case "entity":
                    {
                        const de = await getItemContent(itemName.value, itemCat.value, itemPhase.value)
                        if (de.error != null) {
                            notify({
                                title: "Error: Get Entity Item Content",
                                text: de.error,
                                type: "error"
                            })
                            return
                        }
                        const entity = JSON.parse(de.data!);

                        jsonEnt.SetName(entity.Entity);
                        jsonEnt.AssignOtherNames(entity.OtherNames);
                        jsonEnt.AssignDef(entity.Definition);
                        jsonEnt.AssignSIF(entity.SIF);
                        jsonEnt.AssignOtherStd(entity.OtherStandards);
                        jsonEnt.AssignLegalDef(entity.LegalDefinitions);
                        jsonEnt.AssignSensi(entity.Sensitivity);
                        jsonEnt.AssignCol(entity.Collections);
                        jsonEnt.AssignMeta(entity.Metadata);
                    }
                    break;

                case "collection":
                    {
                        const de = await getItemContent(itemName.value, itemCat.value, itemPhase.value)
                        if (de.error != null) {
                            notify({
                                title: "Error: Get Collection Item Content",
                                text: de.error,
                                type: "error"
                            })
                            return
                        }
                        const collection = JSON.parse(de.data!);

                        jsonCol.SetName(collection.Entity);
                        jsonCol.AssignDef(collection.Definition);
                        jsonCol.AssignUrls(collection.URL);
                        jsonCol.AssignMeta(collection.Metadata);
                    }
                    break;

                default:
            }

        } else {

            Mode.value = "new";
            // console.log("new mode");
        }

        // show whole page !!
        display.value = true
    }

    mounted = true;
});

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 10px;
}

/* layout */

#container {
    height: 100%;
    width: 100%;
    display: flex;
    /* margin-top: -10px; */
}

#left {
    width: 50%;
    margin-right: 0.4%;
    overflow: scroll;
    scrollbar-width: none;
    /*   display: flex;
flex-direction: column; */
}

#left::-webkit-scrollbar {
    display: none;
}

#right {
    width: 50%;
    margin-left: 0.4%;
    background-color: rgb(220, 220, 220);
    overflow: scroll;
    scrollbar-width: none;
    /*overflow-y: scroll;
background-color: rgb(220, 220, 220); */
}

#right::-webkit-scrollbar {
    display: none;
}

/*  */

.line1 {
    width: 100%;
    text-align: left;
    margin-left: 0;
    margin-top: 10px;
    color: #2c3e50;
}

.line2 {
    width: 90%;
    text-align: left;
    margin-right: 0;
    margin-top: 20px;
    /* border-top: 1px dotted black;
border-bottom: 1px dotted black; */
}

/* components shared !!! */

.com {
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 5px 5px 5px lightgray;
    /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
}

.label {
    font-weight: bold;
    font-size: 16px;
    font-style: italic;
    color: rgb(90, 90, 90);
    margin-left: 1%;
    margin-bottom: 10px;
    display: inline-block;
    /* set span */
}

.hint1 {
    font-weight: normal;
    font-size: 13px;
    font-style: italic;
    color: rgb(120, 120, 120);
    position: absolute;
    left: 140px;
    margin-top: 3px;
    display: inline-block;
    /* set span */
    cursor: pointer;
}

.hint2 {
    font-weight: normal;
    font-size: 13px;
    font-style: italic;
    color: rgb(120, 120, 120);
    margin-left: 2%;
    margin-bottom: 10px;
    display: inline-block;
    /* set span */
    cursor: pointer;
}

.more-editor {
    font-size: medium;
    color: red;
    background-color: white;
    float: right;
    margin-right: 1px;
    margin-bottom: 5px;
    width: 22px;
    border: none;
}

.less-editor {
    font-size: medium;
    color: green;
    background-color: white;
    float: right;
    margin-right: 1px;
    margin-bottom: 5px;
    width: 22px;
    border: none;
}

.hide-editor {
    font-size: medium;
    float: right;
    color: blue;
    background-color: white;
    margin-bottom: 5px;
    width: 22px;
    border: none;
}

.content {
    margin-top: 0.7%;
    margin-left: 3%;
    padding-left: 1%;
    resize: none;
    display: block;
    overflow: hidden;
    width: 91%;
    height: 24px;
    min-height: 24px;
    line-height: 20px;
    text-align: center;
}
</style>
