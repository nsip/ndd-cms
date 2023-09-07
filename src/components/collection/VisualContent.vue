<template>
    <div v-html="wholeContent()"></div>
</template>

<script setup lang="ts">

import { jsonColHTML as jsonHTML, jsonColTEXT as jsonTEXT } from "@/share/ColType";
import { addSpacesAtStartP } from "@/share/util";

const nonEmptyHtml = (label4: string, text: string, html: string) => {
    if (text == undefined || text.trim().length == 0) {
        return "";
    }
    html = html.replaceAll("<p><br></p>", "");
    html = html.replaceAll(/<h\d><br><\/h\d>/g, "");
    if (label4 == undefined || label4.length == 0) {
        return addSpacesAtStartP(html, 2);
    }
    return "<h4 style='margin-left:10px; font-style:italic'>" + label4 + "</h4>" + addSpacesAtStartP(html, 2);
};

const prevCollection = () => {
    return (
        "<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Collection</pre></h4>" +
        nonEmptyHtml("", jsonTEXT.Entity, jsonHTML.Entity)
    );
};

const prevDefinition = () => {
    return ("<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Definition</pre></h4>" +
        nonEmptyHtml("", jsonTEXT.Definition, jsonHTML.Definition)
    );
};

const prevURLs = () => {
    const head = "<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Url</pre></h4>";
    const n = jsonTEXT.CntUrl()
    const eles: string[] = [];
    for (let i = 0; i < n; i++) {
        const ele = nonEmptyHtml("", jsonTEXT.URL[i], jsonHTML.URL[i]);
        eles.push(ele);
    }
    const body = eles.join("<br>"); // here, other names' html value is plain text
    if (body.length > 0) {
        return head + body;
    }
    return head;
};

const prevMetadata = () => {
    const jt = jsonTEXT.Metadata;
    const jh = jsonHTML.Metadata;
    const id = nonEmptyHtml(">> identifier:", jt.Identifier, jh.Identifier);
    const type = nonEmptyHtml(">> type:", jt.Type, jh.Type);
    return ("<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Meta Data</pre></h4>" + id + type);
};

const prevEntities = () => {
    const head = "<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Entities</pre></h4>";
    const n = jsonTEXT.CntEntities();
    const eles: string[] = [];
    for (let i = 0; i < n; i++) {
        const ele = nonEmptyHtml("", jsonTEXT.Entities[i], jsonHTML.Entities[i]);
        eles.push(ele);
    }
    const body = eles.join("<br>"); // here, other names' html value is plain text
    if (body.length > 0) {
        return head + body;
    }
    return head;
};

// //////////

const wholeContent = () => {
    return (
        prevCollection() +
        prevDefinition() +
        prevURLs() +
        prevMetadata() +
        prevEntities()
    );
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
