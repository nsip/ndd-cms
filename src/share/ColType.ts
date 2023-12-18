import { validStr, validStrTEXTArr } from "@/share/util";

// identical to db 'collections'
export class ColType {
    
    Entity = "";
    Definition = "";
    URL: string[] = [];
    Metadata: metaType = new metaType();

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

    SetMeta(type: string) {
        this.Metadata.Type = validStr(type, this.Metadata.Type);
    }

    AssignMeta(meta: metaType) {
        this.Metadata = meta != null ? meta : new metaType();
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
    Type = "";
}

const EmptyStrArr = (): string[] => {
    return []
}

export const jsonCol = reactive(new ColType());
