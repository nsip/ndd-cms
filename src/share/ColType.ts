import { validStr, validStrTEXTArr } from "@/share/util";

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

    //
    // Definition ---------------------------------------------------
    //

    SetDefinition(definition: string) {
        this.Definition = validStr(definition, this.Definition);
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

    AssignUrls(urls: string[]) {
        this.URL = urls != null ? urls : EmptyStrArr();
    }

    //
    // Meta Data ---------------------------------------------------
    //

    SetMeta(id: string, type: string) {
        this.Metadata.Identifier = validStr(id, this.Metadata.Identifier);
        this.Metadata.Type = validStr(type, this.Metadata.Type);
    }

    AssignMeta(meta: metaType) {
        this.Metadata = meta != null ? meta : new metaType();
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

    AssignEntities(entities: string[]) {
        this.Entities = entities != null ? entities : EmptyStrArr();
    }

    ////

    // GenJSON(htmlVal: boolean) {
    //     let json = JSON.stringify(this, null, 2);
    //     if (htmlVal) {
    //         json = json.replaceAll("<p><br></p>", "");
    //         json = json.replaceAll(/<p>\s*<\/p>/g, "");
    //         json = json.replaceAll(/<h\d><br><\/h\d>/g, "");
    //         json = json.replaceAll(/<h\d>\s*<\/h\d>/g, "");
    //     } else {
    //         json = json.replaceAll(/"\s*\\n"/g, '""');
    //     }
    //     json = json.replaceAll(/\[\s*""\s*\]/g, "[]");
    //     return json;
    // }

    GenJSON() {
        return JSON.stringify(this, null, 2);
    }
}

class metaType {
    Identifier = "";
    Type = "";
}

const EmptyStrArr = (): string[] => {
    return []
}

export const jsonCol = reactive(new ColType());
