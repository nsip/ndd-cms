<template>
    <div v-html="wholeContent()"></div>
</template>

<script setup lang="ts">

import { jsonCol } from "@/share/ColType";
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
    let sub_str = "";
    sub_str += hasSomeValue(sub_obj, "Type") ? field_subtitle_html('type') + field_value_html(sub_obj.Type) : ""
    return rt + sub_str
};

// //////////

const wholeContent = () => {
    return (
        prevCollection() +
        prevDefinition() +
        prevURLs() +
        prevMetadata()
    );
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
