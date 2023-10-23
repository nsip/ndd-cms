<template>
    <div v-html="wholeContent()"></div>
</template>

<script setup lang="ts">

import { jsonEntHTML as jsonHTML, jsonEntTEXT as jsonTEXT } from "@/share/EntType";
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

/////////////////////////////////////////////////

const prevEntity = () => {
    return (
        "<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Entity</pre></h4>" +
        nonEmptyHtml("", jsonTEXT.Entity, jsonHTML.Entity)
    );
};

const prevOtherNames = () => {
    const head = "<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Other Names</pre></h4>";
    const n = jsonTEXT.CntOtherName();
    const eles: string[] = [];
    for (let i = 0; i < n; i++) {
        const ele = nonEmptyHtml("", jsonTEXT.OtherNames[i], jsonHTML.OtherNames[i]);
        eles.push(ele);
    }
    const body = eles.join("<br>"); // here, other names' html value is plain text
    if (body.length > 0) {
        return head + body;
    }
    return head;
};

const prevDefinition = () => {
    return ("<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Definition</pre></h4>" +
        nonEmptyHtml("", jsonTEXT.Definition, jsonHTML.Definition)
    );
};

const prevSIF = () => {
    const head = "<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> SIF</pre></h4>";
    const n = jsonTEXT.CntSIF();
    let eles: string[] = [];
    for (let i = 0; i < n; i++) {
        const jt = jsonTEXT.SIF[i];
        const jh = jsonHTML.SIF[i];
        eles[i] = "";
        eles[i] += (jt.XPath != null && jh.XPath != null) ? nonEmptyHtml(">> xpath:", jt.XPath.join(""), jh.XPath.join("")) : "";
        eles[i] += nonEmptyHtml(">> definition:", jt.Definition, jh.Definition);
        eles[i] += nonEmptyHtml(">> commentary:", jt.Commentary, jh.Commentary);
        eles[i] += nonEmptyHtml(">> datestamp:", jt.Datestamp, jh.Datestamp);
    }
    const body = eles.join("<hr style='border-top: 1px dashed;'>");
    if (body.length > 0) {
        return head + body;
    }
    return head;
};

const prevOtherStandards = () => {
    const head = "<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Other Standards</pre></h4>";
    const n = jsonTEXT.CntOtherStd();
    let eles: string[] = [];
    for (let i = 0; i < n; i++) {
        const jt = jsonTEXT.OtherStandards[i];
        const jh = jsonHTML.OtherStandards[i];
        eles[i] = "";
        eles[i] += nonEmptyHtml(">> standard:", jt.Standard, jh.Standard);
        eles[i] += (jt.Link != null && jh.Link != null) ? nonEmptyHtml(">> link:", jt.Link.join(""), jh.Link.join("")) : "";
        eles[i] += (jt.Path != null && jh.Path != null) ? nonEmptyHtml(">> path:", jt.Path.join(""), jh.Path.join("")) : "";
        eles[i] += nonEmptyHtml(">> definition:", jt.Definition, jh.Definition);
        eles[i] += nonEmptyHtml(">> commentary:", jt.Commentary, jh.Commentary);
    }
    const body = eles.join("<hr style='border-top: 1px dashed;'>");
    if (body.length > 0) {
        return head + body;
    }
    return head;
};

const prevLegalDefinition = () => {
    const head =
        "<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Legal Definitions</pre></h4>";
    const n = jsonTEXT.CntLegalDef();
    let eles: string[] = [];
    for (let i = 0; i < n; i++) {
        const jt = jsonTEXT.LegalDefinitions[i];
        const jh = jsonHTML.LegalDefinitions[i];
        eles[i] = "";
        eles[i] += nonEmptyHtml(">> legislationName:", jt.LegislationName, jh.LegislationName);
        eles[i] += nonEmptyHtml(">> citation:", jt.Citation, jh.Citation);
        eles[i] += nonEmptyHtml(">> link:", jt.Link, jh.Link);
        eles[i] += nonEmptyHtml(">> definition:", jt.Definition, jh.Definition);
        eles[i] += nonEmptyHtml(">> commentary:", jt.Commentary, jh.Commentary);
        eles[i] += nonEmptyHtml(">> datestamp:", jt.Datestamp, jh.Datestamp);
    }
    const body = eles.join("<hr style='border-top: 1px dashed;'>");
    if (body.length > 0) {
        return head + body;
    }
    return head;
};

const prevSensitivity = () => {
    const head = "<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Sensitivity</pre></h4>";
    const n = jsonTEXT.CntSensi();
    let eles: string[] = [];
    for (let i = 0; i < n; i++) {
        const jt = jsonTEXT.Sensitivity[i];
        const jh = jsonHTML.Sensitivity[i];
        eles[i] = "";
        eles[i] += nonEmptyHtml(">> locale:", jt.Locale, jh.Locale);
        eles[i] += nonEmptyHtml(">> value:", jt.Value, jh.Value);
        eles[i] += nonEmptyHtml(">> commentary:", jt.Commentary, jh.Commentary);
    }
    const body = eles.join("<hr style='border-top: 1px dashed;'>");
    if (body.length > 0) {
        return head + body;
    }
    return head;
}

const prevCollections = () => {
    const head = "<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Collections</pre></h4>";
    const n = jsonTEXT.CntCol();
    let eles: string[] = [];
    for (let i = 0; i < n; i++) {
        const jt = jsonTEXT.Collections[i];
        const jh = jsonHTML.Collections[i];
        eles[i] = "";
        eles[i] += nonEmptyHtml(">> name:", jt.Name, jh.Name);
        eles[i] += nonEmptyHtml(">> description:", jt.Description, jh.Description);
        eles[i] += nonEmptyHtml(">> standard:", jt.Standard, jh.Standard);
        eles[i] += (jt.Elements != null && jh.Elements != null) ? nonEmptyHtml(">> elements:", jt.Elements.join(""), jh.Elements.join("")) : "";
        eles[i] += (jt.Elements != null && jh.Elements != null) ? nonEmptyHtml(">> business rules:", jt.BusinessRules.join(""), jh.BusinessRules.join("")) : "";
        eles[i] += nonEmptyHtml(">> definition modification:", jt.DefinitionModification, jh.DefinitionModification);
    }
    const body = eles.join("<hr style='border-top: 1px dashed;'>");
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
    const ea = (jt.ExpectedAttributes != null && jh.ExpectedAttributes != null) ? nonEmptyHtml(">> expected attributes:", jt.ExpectedAttributes.join(""), jh.ExpectedAttributes.join("")) : "";
    const sc = (jt.Superclass != null && jh.Superclass != null) ? nonEmptyHtml(">> superclass:", jt.Superclass.join(""), jh.Superclass.join("")) : "";
    const ce = (jt.CrossrefEntities != null && jh.CrossrefEntities != null) ? nonEmptyHtml(">> cross ref entities:", jt.CrossrefEntities.join(""), jh.CrossrefEntities.join("")) : "";
    return ("<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> Meta Data</pre></h4>" + id + type + ea + sc + ce);
};

//////////

const wholeContent = () => {
    return (
        prevEntity() +
        prevOtherNames() +
        prevDefinition() +
        prevSIF() +
        prevOtherStandards() +
        prevLegalDefinition() +
        prevSensitivity() +
        prevCollections() +
        prevMetadata()
    );
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
