<template>
    <div v-html="wholeContent()"></div>
</template>

<script setup lang="ts">

import { jsonCol } from "@/share/ColType";
import { addSpacesAtStartP, isHTMLStr } from "@/share/util";

const field_title_html = (label: string) => {
    return `<h4 style='font-size:large; font-style:italic; background-color: darkgray'><pre> ${label} </pre></h4>`
}

const field_subtitle_html = (label: string) => {
    label = `>> ${label}:`
    return `<h4 style='margin-left:10px; font-style:italic'> + ${label} + </h4>`
}

const field_value_html = (value: any) => {
    const htmlFlag = isHTMLStr(`${value}`)
    if (!htmlFlag) {
        if (Array.isArray(value) && value.length > 0) {
            const elems: string[] = [];
            value.forEach(e => { elems.push(e) })
            return `<p> ${elems.join("<br>")} <p>`
        } else if (value.length > 0) {
            return `<p> ${value} <p>`
        } else {
            return ""
        }
    } else {
        if (Array.isArray(value) && value.length > 0) {
            const elems: string[] = [];
            value.forEach(e => { elems.push(e) })
            return elems.join("<br>")
        } else if (value.length > 0) {
            return value
        } else {
            return ""
        }
    }
}

const field_sep_line = () => {
    return "<hr style='border-top: 1px dashed;'>"
}

/////////////////////////////////////////////////

const prevCollection = () => {
    return field_title_html('Collection') + field_value_html(jsonCol.Entity);
};

const prevDefinition = () => {
    return field_title_html('Definition') + field_value_html(jsonCol.Definition);
};

const prevURLs = () => {
    return field_title_html('Url') + field_value_html(jsonCol.URL);
};

const prevMetadata = () => {
    let rt = field_title_html('Meta Data');
    const sub_obj = jsonCol.Metadata;
    let sub_str = field_subtitle_html('identifier') + field_value_html(sub_obj.Identifier)
    sub_str += field_subtitle_html('type') + field_value_html(sub_obj.Type)
    return rt + sub_str
};

const prevEntities = () => {
    return field_title_html('Entities') + field_value_html(jsonCol.Entities);
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
<style scoped></style>
