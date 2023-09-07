import { cvtHtml2Plain, cvtArrayHtml2Plain, validStr, validStrHTMLArr, validStrTEXTArr, } from "@/share/util";

export class EntType {

    Entity = "";
    OtherNames: string[] = [];
    Definition = "";
    SIF: sifType[] = [new sifType()];
    OtherStandards: otherStdType[] = [new otherStdType()];
    LegalDefinitions: legalDefType[] = [new legalDefType()];
    Collections: colType[] = [new colType()];
    Metadata: metaType = new metaType();

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
    // Other Names --------------------------------------------------
    //

    SetOtherName(nameStr: string) {
        this.OtherNames = validStrTEXTArr(nameStr);
    }
    // SetOtherName(TYPE: string, nameStr: string) {
    //     switch (TYPE) {
    //         case "html":
    //             this.OtherNames = validStrHTMLArr(nameStr);
    //             break;
    //         default:
    //             this.OtherNames = validStrTEXTArr(nameStr);
    //     }
    // }

    CntOtherName() {
        return this.OtherNames.length;
    }

    AssignOtherNames(TYPE: string, names: string[]) {
        switch (TYPE) {
            case "html":
                this.OtherNames = names != null ? names : EmptyStrArr();
                break;
            default:
                this.OtherNames = names != null ? cvtArrayHtml2Plain(names) : EmptyStrArr();
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
    // SIF ----------------------------------------------------------
    //

    AddSIF() {
        this.SIF.push(new sifType());
    }
    RmSIFLast() {
        this.SIF.splice(-1);
    }
    SetSIF(
        TYPE: string,
        i: number,
        xpathStr: string,
        definition: string,
        commentary: string,
        datestamp: string
    ) {
        if (this.CntSIF() == 0) {
            return
        }
        const ele = this.SIF[i];
        ele.Definition = validStr(definition, ele.Definition);
        ele.Commentary = validStr(commentary, ele.Commentary);
        ele.Datestamp = validStr(datestamp, ele.Datestamp);
        switch (TYPE) {
            case "html":
                ele.XPath = validStrHTMLArr(xpathStr);
                break;
            default:
                ele.XPath = validStrTEXTArr(xpathStr);
        }
    }
    CntSIF() {
        return this.SIF.length;
    }
    IsSIFEmpty(i: number) {
        const ele = this.SIF[i];
        if (ele == undefined) {
            return true;
        }
        return (
            ele.XPath.length == 0 &&
            ele.Definition.trim().length == 0 &&
            ele.Commentary.trim().length == 0 &&
            ele.Datestamp.trim().length == 0
        );
    }
    IsLastSIFEmpty() {
        const n = this.CntSIF();
        return n == 0 || this.IsSIFEmpty(n - 1);
    }

    AssignSIF(TYPE: string, sif: sifType[]) {
        switch (TYPE) {
            case "html":
                this.SIF = sif != null ? sif : EmptySIF();
                break;
            default:
                this.SIF = sif != null ? this.PlainSIF(sif) : EmptySIF();
        }
    }

    PlainSIF(SIFs: sifType[]) {
        const sifArray: sifType[] = [];
        SIFs.forEach((val) => {
            const sif = new sifType();
            sif.XPath = cvtArrayHtml2Plain(val.XPath);
            sif.Definition = cvtHtml2Plain(val.Definition);
            sif.Commentary = cvtHtml2Plain(val.Commentary);
            sif.Datestamp = cvtHtml2Plain(val.Datestamp);
            sifArray.push(sif);
        });
        return sifArray;
    }

    //
    // Other Standards ----------------------------------------------
    //

    AddOtherStd() {
        this.OtherStandards.push(new otherStdType());
    }
    RmOtherStdLast() {
        this.OtherStandards.splice(-1);
    }
    SetOtherStd(
        TYPE: string,
        i: number,
        std: string,
        linkStr: string,
        pathStr: string,
        definition: string,
        commentary: string
    ) {
        if (this.CntOtherStd() == 0) {
            return
        }
        const ele = this.OtherStandards[i];
        ele.Standard = validStr(std, ele.Standard);
        ele.Definition = validStr(definition, ele.Definition);
        ele.Commentary = validStr(commentary, ele.Commentary);
        switch (TYPE) {
            case "html":
                ele.Link = validStrHTMLArr(linkStr);
                ele.Path = validStrHTMLArr(pathStr);
                break;
            default:
                ele.Link = validStrTEXTArr(linkStr);
                ele.Path = validStrTEXTArr(pathStr);
        }
    }
    CntOtherStd() {
        return this.OtherStandards.length;
    }
    IsOtherStdEmpty(i: number) {
        const ele = this.OtherStandards[i];
        if (ele == undefined) {
            return true;
        }
        return (
            ele.Standard.trim().length == 0 &&
            ele.Definition.trim().length == 0 &&
            ele.Commentary.trim().length == 0 &&
            ele.Link.length == 0 &&
            ele.Path.length == 0
        );
    }
    IsLastOtherStdEmpty() {
        const n = this.CntOtherStd();
        return n == 0 || this.IsOtherStdEmpty(n - 1);
    }

    AssignOtherStd(TYPE: string, os: otherStdType[]) {
        switch (TYPE) {
            case "html":
                this.OtherStandards = os != null ? os : EmptyOS();
                break;
            default:
                this.OtherStandards = os != null ? this.PlainOtherStd(os) : EmptyOS();
        }
    }

    PlainOtherStd(OSs: otherStdType[]) {
        const osArray: otherStdType[] = [];
        OSs.forEach((val) => {
            const os = new otherStdType();
            os.Standard = cvtHtml2Plain(val.Standard);
            os.Link = cvtArrayHtml2Plain(val.Link);
            os.Path = cvtArrayHtml2Plain(val.Path);
            os.Definition = cvtHtml2Plain(val.Definition);
            os.Commentary = cvtHtml2Plain(val.Commentary);
            osArray.push(os);
        });
        return osArray;
    }

    //
    // Legal Definitions --------------------------------------------
    //

    AddLegalDef() {
        this.LegalDefinitions.push(new legalDefType());
    }
    RmLegalDefLast() {
        this.LegalDefinitions.splice(-1);
    }
    SetLegalDef(
        i: number,
        legislationName: string,
        citation: string,
        linkStr: string,
        definition: string,
        commentary: string,
        datestamp: string
    ) {
        if (this.CntLegalDef() == 0) {
            return
        }
        const ele = this.LegalDefinitions[i];
        ele.LegislationName = validStr(legislationName, ele.LegislationName);
        ele.Citation = validStr(citation, ele.Citation);
        ele.Definition = validStr(definition, ele.Definition);
        ele.Link = validStr(linkStr, ele.Link);
        ele.Commentary = validStr(commentary, ele.Commentary);
        ele.Datestamp = validStr(datestamp, ele.Datestamp);
    }
    CntLegalDef() {
        return this.LegalDefinitions.length;
    }
    IsLegalDefEmpty(i: number) {
        const ele = this.LegalDefinitions[i];
        if (ele == undefined) {
            return true;
        }
        return (
            ele.LegislationName.trim().length == 0 &&
            ele.Definition.trim().length == 0 &&
            ele.Commentary.trim().length == 0 &&
            ele.Citation.trim().length == 0 &&
            ele.Datestamp.trim().length == 0 &&
            ele.Link.length == 0
        );
    }
    IsLastLegalDefEmpty() {
        const n = this.CntLegalDef();
        return n == 0 || this.IsLegalDefEmpty(n - 1);
    }

    AssignLegalDef(TYPE: string, ld: legalDefType[]) {
        switch (TYPE) {
            case "html":
                this.LegalDefinitions = ld != null ? ld : EmptyLD();
                break;
            default:
                this.LegalDefinitions = ld != null ? this.PlainLegalDef(ld) : EmptyLD();
        }
    }

    PlainLegalDef(LDs: legalDefType[]) {
        const ldArray: legalDefType[] = [];
        LDs.forEach((val) => {
            const ld = new legalDefType();
            ld.LegislationName = cvtHtml2Plain(val.LegislationName);
            ld.Citation = cvtHtml2Plain(val.Citation);
            ld.Link = cvtHtml2Plain(val.Link);
            ld.Definition = cvtHtml2Plain(val.Definition);
            ld.Commentary = cvtHtml2Plain(val.Commentary);
            ld.Datestamp = cvtHtml2Plain(val.Datestamp);
            ldArray.push(ld);
        });
        return ldArray;
    }

    //
    // Collections --------------------------------------------------
    //

    AddCol() {
        this.Collections.push(new colType());
    }
    RmColLast() {
        this.Collections.splice(-1);
    }
    SetCol(
        TYPE: string,
        i: number,
        name: string,
        description: string,
        standard: string,
        elementStr: string,
        bizruleStr: string,
        defmod: string
    ) {
        if (this.CntCol() == 0) {
            return
        }
        const ele = this.Collections[i];
        ele.Name = validStr(name, ele.Name);
        ele.Description = validStr(description, ele.Description);
        ele.Standard = validStr(standard, ele.Standard);
        ele.DefinitionModification = validStr(defmod, ele.DefinitionModification);
        switch (TYPE) {
            case "html":
                ele.Elements = validStrHTMLArr(elementStr);
                ele.BusinessRules = validStrHTMLArr(bizruleStr);
                break;
            default:
                ele.Elements = validStrTEXTArr(elementStr);
                ele.BusinessRules = validStrTEXTArr(bizruleStr);
        }
    }
    CntCol() {
        return this.Collections.length;
    }
    IsColEmpty(i: number) {
        const ele = this.Collections[i];
        if (ele == undefined) {
            return true;
        }
        return (
            ele.Standard.trim().length == 0 &&
            ele.Name.trim().length == 0 &&
            ele.Description.trim().length == 0 &&
            ele.DefinitionModification.trim().length == 0 &&
            ele.Elements.length == 0 &&
            ele.BusinessRules.length == 0
        );
    }
    IsLastColEmpty() {
        const n = this.CntCol();
        return n == 0 || this.IsColEmpty(n - 1);
    }

    AssignCol(TYPE: string, col: colType[]) {
        switch (TYPE) {
            case "html":
                this.Collections = col != null ? col : EmptyCol();
                break;
            default:
                this.Collections = col != null ? this.PlainCol(col) : EmptyCol();
        }
    }

    PlainCol(Cols: colType[]) {
        const collections: colType[] = [];
        Cols.forEach((val) => {
            const col = new colType();
            col.Name = cvtHtml2Plain(val.Name);
            col.Description = cvtHtml2Plain(val.Description);
            col.Standard = cvtHtml2Plain(val.Standard);
            col.Elements = cvtArrayHtml2Plain(val.Elements);
            col.BusinessRules = cvtArrayHtml2Plain(val.BusinessRules);
            col.DefinitionModification = cvtHtml2Plain(val.DefinitionModification);
            collections.push(col);
        });
        return collections;
    }

    //
    // Meta Data ----------------------------------------------------
    //

    SetMeta(
        TYPE: string,
        id: string,
        type: string,
        attrStr: string,
        superclass: string,
        crossref: string
    ) {
        this.Metadata.Identifier = validStr(id, this.Metadata.Identifier);
        this.Metadata.Type = validStr(type, this.Metadata.Type);
        switch (TYPE) {
            case "html":
                this.Metadata.Superclass = validStrHTMLArr(superclass);
                this.Metadata.ExpectedAttributes = validStrHTMLArr(attrStr);
                this.Metadata.CrossrefEntities = validStrHTMLArr(crossref);
                break;
            default:
                this.Metadata.Superclass = validStrTEXTArr(superclass);
                this.Metadata.ExpectedAttributes = validStrTEXTArr(attrStr);
                this.Metadata.CrossrefEntities = validStrTEXTArr(crossref);
        }
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
        m.ExpectedAttributes = cvtArrayHtml2Plain(meta.ExpectedAttributes);
        m.Superclass = cvtArrayHtml2Plain(meta.Superclass);
        m.CrossrefEntities = cvtArrayHtml2Plain(meta.CrossrefEntities);
        return m;
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

class sifType {
    XPath: string[] = [];
    Definition = "";
    Commentary = "";
    Datestamp = "";
}

class otherStdType {
    Standard = "";
    Link: string[] = [];
    Path: string[] = [];
    Definition = "";
    Commentary = "";
}

class legalDefType {
    LegislationName = "";
    Citation = "";
    Link = "";
    Definition = "";
    Commentary = "";
    Datestamp = "";
}

class colType {
    Name = "";
    Description = "";
    Standard = "";
    Elements: string[] = [];
    BusinessRules: string[] = [];
    DefinitionModification = "";
}

class metaType {
    Identifier = "";
    Type = "";
    ExpectedAttributes: string[] = [];
    Superclass: string[] = [];
    CrossrefEntities: string[] = [];
}

const EmptyStrArr = (): string[] => { return [] }
const EmptySIF = (): sifType[] => { return [] }
const EmptyOS = (): otherStdType[] => { return [] }
const EmptyLD = (): legalDefType[] => { return [] }
const EmptyCol = (): colType[] => { return [] }

export const jsonEntHTML = reactive(new EntType());
export const jsonEntTEXT = reactive(new EntType());
