import { cvtHtml2Plain, cvtArrayHtml2Plain, validStr, validStrHTMLArr, validStrTEXTArr } from "@/share/util";

// identical to db 'collections'
export class ColType {
    Entity = "";
    Definition = "";
    URL: string[] = [];
    Metadata: metaType = new metaType();
    Entities: string[] = [];

    //
    // Name ---------------------------------------------------------
    //

    SetName(name: string) {
        this.Entity = validStr(name, this.Entity);
    }

    AssignName(TYPE: string, name: string) {
        switch (TYPE) {
            case "html":
                this.Entity = name;
                break;
            default:
                this.Entity = cvtHtml2Plain(name);
        }
    }

    //
    // Definition ---------------------------------------------------
    //

    SetDefinition(definition: string) {
        this.Definition = validStr(definition, this.Definition);
    }

    AssignDefinition(TYPE: string, definition: string) {
        switch (TYPE) {
            case "html":
                this.Definition = definition;
                break;
            default:
                this.Definition = cvtHtml2Plain(definition);
        }
    }

    //
    // Url ---------------------------------------------------
    //

    SetUrl(urlStr: string) {
        this.URL = validStrTEXTArr(urlStr, this.URL);
    }

    CntUrl() {
        return this.URL.length;
    }

    AssignUrls(TYPE: string, urls: string[]) {
        switch (TYPE) {
            case "html":
                this.URL = urls != null ? urls : EmptyStrArr();
                break;
            default:
                this.URL = urls != null ? cvtArrayHtml2Plain(urls) : EmptyStrArr();
        }
    }

    //
    // Meta Data ---------------------------------------------------
    //

    SetMeta(id: string, type: string) {
        this.Metadata.Identifier = validStr(id, this.Metadata.Identifier);
        this.Metadata.Type = validStr(type, this.Metadata.Type);
    }

    AssignMeta(TYPE: string, meta: metaType) {
        switch (TYPE) {
            case "html":
                this.Metadata = meta != null ? meta : new metaType();
                break;
            default:
                this.Metadata = meta != null ? this.PlainMeta(meta) : new metaType();
        }
    }

    PlainMeta(meta: metaType) {
        const m = new metaType();
        m.Identifier = cvtHtml2Plain(meta.Identifier);
        m.Type = cvtHtml2Plain(meta.Type);
        return m;
    }

    //
    // Entities ---------------------------------------------------
    //

    SetEntities(entitiesStr: string) {
        this.Entities = validStrTEXTArr(entitiesStr, this.Entities);
    }

    CntEntities() {
        return this.Entities.length;
    }

    AssignEntities(TYPE: string, entities: string[]) {
        switch (TYPE) {
            case "html":
                this.Entities = entities != null ? entities : EmptyStrArr();
                break;
            default:
                this.Entities = entities != null ? cvtArrayHtml2Plain(entities) : EmptyStrArr();
        }
    }

    ////

    GenJSON(htmlVal: boolean) {
        let json = JSON.stringify(this, null, 2);
        if (htmlVal) {
            json = json.replaceAll("<p><br></p>", "");
            json = json.replaceAll(/<p>\s*<\/p>/g, "");
            json = json.replaceAll(/<h\d><br><\/h\d>/g, "");
            json = json.replaceAll(/<h\d>\s*<\/h\d>/g, "");
        } else {
            json = json.replaceAll(/"\s*\\n"/g, '""');
        }
        json = json.replaceAll(/\[\s*""\s*\]/g, "[]");
        return json;
    }
}

class metaType {
    Identifier = "";
    Type = "";
}

const EmptyStrArr = (): string[] => {
    return []
}

export const jsonColHTML = reactive(new ColType());
export const jsonColTEXT = reactive(new ColType());
