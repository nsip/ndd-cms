<template>
    <div v-html="wholeContent()"></div>
</template>

<script setup lang="ts">

import { jsonEnt } from "@/share/EntType";
import { padStartSpaceP, isHTMLStr, hasSomeValue, isSomeValue } from "@/share/util";

const field_title_html = (label: string) => {
    return `<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre>  ${label}  </pre></h4>`
}

const field_subtitle_html = (label: string) => {
    label = `>> ${label}:`
    return `<h4 style='margin-left:10px; font-style:italic'><pre> ${label} </pre></h4>`
}

const field_value_html = (value: any) => {
    if (!isHTMLStr(`${value}`)) {
        if (Array.isArray(value) && value.length > 0) {
            const elems: string[] = [];
            value.forEach(e => { elems.push(padStartSpaceP(`<p>${e}</p>`, 8)) })
            return elems.join("")
        } else if (value.length > 0) {
            return padStartSpaceP(`<p>${value}</p>`, 8)
        } else {
            return ""
        }
    } else {
        let rt = ""
        if (Array.isArray(value) && value.length > 0) {
            const elems: string[] = [];
            value.forEach(e => { elems.push(e) })
            rt = elems.join("")
        } else if (value.length > 0) {
            rt = value
        } else {
            rt = ""
        }
        return isSomeValue(rt) ? rt : ""
    }
}

const field_sep_line = () => {
    return "<hr style='border-top: 1px dashed;'>"
}

/////////////////////////////////////////////////

const prevEntity = () => {
    return field_title_html('Entity') + field_value_html(jsonEnt.Entity);
};

const prevOtherNames = () => {
    return field_title_html('Other Names') + field_value_html(jsonEnt.OtherNames);
};

const prevDefinition = () => {
    return field_title_html('Definition') + field_value_html(jsonEnt.Definition);
};

const prevSIF = () => {
    let rt = field_title_html('SIF');
    const n = jsonEnt.CntSIF();
    let elems: string[] = [];
    for (let i = 0; i < n; i++) {
        const sub_obj = jsonEnt.SIF[i];
        let sub_str = "";
        sub_str += hasSomeValue(sub_obj, "XPath") ? field_subtitle_html('xpath') + field_value_html(sub_obj.XPath) : ""
        sub_str += hasSomeValue(sub_obj, "Definition") ? field_subtitle_html('definition') + field_value_html(sub_obj.Definition) : ""
        sub_str += hasSomeValue(sub_obj, "Commentary") ? field_subtitle_html('commentary') + field_value_html(sub_obj.Commentary) : ""
        sub_str += hasSomeValue(sub_obj, "Datestamp") ? field_subtitle_html('datestamp') + field_value_html(sub_obj.Datestamp) : ""
        elems.push(sub_str);
    }
    rt += elems.join(field_sep_line());
    return rt
};

const prevOtherStandards = () => {
    let rt = field_title_html('Other Standards');
    const n = jsonEnt.CntOtherStd();
    let elems: string[] = [];
    for (let i = 0; i < n; i++) {
        const sub_obj = jsonEnt.OtherStandards[i];
        let sub_str = "";
        sub_str += hasSomeValue(sub_obj, "Standard") ? field_subtitle_html('standard') + field_value_html(sub_obj.Standard) : ""
        sub_str += hasSomeValue(sub_obj, "Link") ? field_subtitle_html('link') + field_value_html(sub_obj.Link) : ""
        sub_str += hasSomeValue(sub_obj, "Path") ? field_subtitle_html('path') + field_value_html(sub_obj.Path) : ""
        sub_str += hasSomeValue(sub_obj, "Definition") ? field_subtitle_html('definition') + field_value_html(sub_obj.Definition) : ""
        sub_str += hasSomeValue(sub_obj, "Commentary") ? field_subtitle_html('commentary') + field_value_html(sub_obj.Commentary) : ""
        elems.push(sub_str);
    }
    rt += elems.join(field_sep_line());
    return rt
};

const prevLegalDefinition = () => {
    let rt = field_title_html('Legal Definitions');
    const n = jsonEnt.CntLegalDef();
    let elems: string[] = [];
    for (let i = 0; i < n; i++) {
        const sub_obj = jsonEnt.LegalDefinitions[i];
        let sub_str = "";
        sub_str += hasSomeValue(sub_obj, "LegislationName") ? field_subtitle_html('legislationName') + field_value_html(sub_obj.LegislationName) : ""
        sub_str += hasSomeValue(sub_obj, "Citation") ? field_subtitle_html('citation') + field_value_html(sub_obj.Citation) : ""
        sub_str += hasSomeValue(sub_obj, "Link") ? field_subtitle_html('link') + field_value_html(sub_obj.Link) : ""
        sub_str += hasSomeValue(sub_obj, "Definition") ? field_subtitle_html('definition') + field_value_html(sub_obj.Definition) : ""
        sub_str += hasSomeValue(sub_obj, "Commentary") ? field_subtitle_html('commentary') + field_value_html(sub_obj.Commentary) : ""
        sub_str += hasSomeValue(sub_obj, "Datestamp") ? field_subtitle_html('datestamp') + field_value_html(sub_obj.Datestamp) : ""
        elems.push(sub_str);
    }
    rt += elems.join(field_sep_line());
    return rt
};

const prevSensitivity = () => {
    let rt = field_title_html('Sensitivity');
    const n = jsonEnt.CntSensi();
    let elems: string[] = [];
    for (let i = 0; i < n; i++) {
        const sub_obj = jsonEnt.Sensitivity[i];
        let sub_str = "";
        sub_str += hasSomeValue(sub_obj, "Locale") ? field_subtitle_html('locale') + field_value_html(sub_obj.Locale) : ""
        sub_str += hasSomeValue(sub_obj, "Value") ? field_subtitle_html('value') + field_value_html(sub_obj.Value) : ""
        sub_str += hasSomeValue(sub_obj, "Commentary") ? field_subtitle_html('commentary') + field_value_html(sub_obj.Commentary) : ""
        elems.push(sub_str);
    }
    rt += elems.join(field_sep_line());
    return rt
}

const prevCollections = () => {
    let rt = field_title_html('Collections');
    const n = jsonEnt.CntCol();
    let elems: string[] = [];
    for (let i = 0; i < n; i++) {
        const sub_obj = jsonEnt.Collections[i];
        let sub_str = "";
        sub_str += hasSomeValue(sub_obj, "Name") ? field_subtitle_html('name') + field_value_html(sub_obj.Name) : ""
        sub_str += hasSomeValue(sub_obj, "Description") ? field_subtitle_html('description') + field_value_html(sub_obj.Description) : ""
        sub_str += hasSomeValue(sub_obj, "Standard") ? field_subtitle_html('standard') + field_value_html(sub_obj.Standard) : ""
        sub_str += hasSomeValue(sub_obj, "Elements") ? field_subtitle_html('elements') + field_value_html(sub_obj.Elements) : ""
        sub_str += hasSomeValue(sub_obj, "BusinessRules") ? field_subtitle_html('business rules') + field_value_html(sub_obj.BusinessRules) : ""
        sub_str += hasSomeValue(sub_obj, "DefinitionModification") ? field_subtitle_html('definition modification') + field_value_html(sub_obj.DefinitionModification) : ""
        elems.push(sub_str);
    }
    rt += elems.join(field_sep_line());
    return rt
};

const prevMetadata = () => {
    let rt = field_title_html('Meta Data');
    const sub_obj = jsonEnt.Metadata;
    let sub_str = "";
    sub_str += hasSomeValue(sub_obj, "Identifier") ? field_subtitle_html('identifier') + field_value_html(sub_obj.Identifier) : ""
    sub_str += hasSomeValue(sub_obj, "Type") ? field_subtitle_html('type') + field_value_html(sub_obj.Type) : ""
    sub_str += hasSomeValue(sub_obj, "ExpectedAttributes") ? field_subtitle_html('expected attributes') + field_value_html(sub_obj.ExpectedAttributes) : ""
    sub_str += hasSomeValue(sub_obj, "Superclass") ? field_subtitle_html('superclass') + field_value_html(sub_obj.Superclass) : ""
    sub_str += hasSomeValue(sub_obj, "CrossrefEntities") ? field_subtitle_html('cross ref entities') + field_value_html(sub_obj.CrossrefEntities) : ""
    return rt + sub_str
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
