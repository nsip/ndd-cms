import { validStr, validStrTEXTArr } from "@/share/util";

// identical to db 'collections'
export class ColType {

    Entity = "";
    Definition: defType[] = [new defType()];
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

    AddDef() {
        this.Definition.push(new defType());
    }

    RmDefLast() {
        this.Definition.splice(-1);
    }

    SetDefinition(
        i: number,
        text: string,
        scope: string
    ) {
        if (this.CntDef() == 0) {
            return
        }
        const ele = this.Definition[i];
        ele.Text = validStr(text, ele.Text);
        ele.Scope = validStr(scope, ele.Scope);
    }

    CntDef() {
        return this.Definition.length;
    }

    IsDefEmpty(i: number) {
        const ele = this.Definition[i];
        if (ele == undefined) {
            return true;
        }
        return ele.Text.trim().length == 0 && ele.Scope.trim().length == 0;
    }

    IsLastDefEmpty() {
        const n = this.CntDef();
        return n == 0 || this.IsDefEmpty(n - 1);
    }

    AssignDef(def: defType[]) {
        this.Definition = def != null ? def : EmptyDef();
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

class defType {
    Text = "";
    Scope = "";
}

class metaType {
    Type = "";
}

const EmptyStrArr = (): string[] => { return [] }
const EmptyDef = (): defType[] => { return [] }

export const jsonCol = reactive(new ColType());
