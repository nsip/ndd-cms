<template>
    <a class="float" id="check" @click="SaveJSON()">
        <font-awesome-icon icon="check" class="floating" />
    </a>
    <a class="float" id="right-from-bracket" @click="ToVIEW()">
        <font-awesome-icon icon="right-from-bracket" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { notify } from "@kyvg/vue3-notification";
import { jsonEnt } from "@/share/EntType";
import { jsonCol } from "@/share/ColType";
import { postDataToDic } from "@/share/share";
import { URL_VIEW } from "@/share/ip";
// import FileSaver from 'file-saver';

// npm install file-saver --save
// npm install @types/file-saver --save-dev

const ToVIEW = async () => { location.replace(`${URL_VIEW}`) };

const SaveJSON = async () => {

    // const htmlValData = jsonHTML.GenJSON(true)
    // const textValData = jsonTEXT.GenJSON(false)

    // var blobHTML = new Blob([htmlValData], { type: "text/plain;charset=utf-8" });
    // FileSaver.saveAs(blobHTML, "dd_html_" + jsonTEXT.Entity + ".json");

    // var blobTEXT = new Blob([textValData], { type: "text/plain;charset=utf-8" });
    // FileSaver.saveAs(blobTEXT, "dd_txt_" + jsonTEXT.Entity + ".json");

    //////////////////////////////////////////////////

    let js = jsonEnt.GenJSON()
    let item = JSON.parse(js).Entity
    if (item.length == 0) {
        js = jsonCol.GenJSON()
        item = JSON.parse(js).Entity
    }

    //////////////////////////////////////////////////

    {
        const de = await postDataToDic(js)
        if (de.error != null) {
            notify({
                title: "Error: Post Candidate to Dictionary",
                text: de.error,
                type: "error"
            })
            return
        }
    }

    notify({
        title: "Submitted",
        text: `[${item}] has been uploaded, redirecting to main page`,
        type: "success"
    })

    await new Promise((f) => setTimeout(f, 1000));

    ToVIEW();
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    right: 40px;
    bottom: 0px;
    background-color: #bbb;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

.float:hover {
    cursor: pointer;
}

.floating {
    margin-top: 22px;
    color: white;
}

#check {
    bottom: 110px;
}

#check:hover {
    background-color: rgb(119, 238, 155);
}

#right-from-bracket {
    bottom: 40px;
}

#right-from-bracket:hover {
    background-color: rgb(15, 169, 246);
}
</style>
