import { validStr, validStrHTMLArr, validStrTEXTArr, oriName } from "@/share/util";

export class EntType {

    Entity = "";
    OtherNames: string[] = [];
    Values = "";
    Definition: defType[] = [new defType()];
    SIF: sifType[] = [new sifType()];
    OtherStandards: otherStdType[] = [new otherStdType()];
    LegalDefinitions: legalDefType[] = [new legalDefType()];
    Sensitivity: sensiType[] = [new sensiType()];
    Collections: colType[] = [new colType()];
    Metadata: metaType = new metaType();

    //
    // Name ---------------------------------------------------------
    //

    SetName(name: string) {
        if (name.includes(')=>')) { // changing name 
            this.Entity = validStr(name, this.Entity);
        } else {
            this.Entity = oriName(validStr(name, this.Entity));
        }
    }

    //
    // Other Names --------------------------------------------------
    //

    SetOtherNames(onStr: string) {
        this.OtherNames = validStrTEXTArr(onStr, this.OtherNames);
    }

    AssignOtherNames(on: string[]) {
        this.OtherNames = on != null ? on : EmptyStrArr();
        this.OtherNames = this.OtherNames.map(on => oriName(on));
    }

    CntOtherName() {
        return this.OtherNames.length;
    }

    //
    // Values ---------------------------------------------------
    //

    SetValues(vStr: string) {
        this.Values = validStr(vStr, this.Values);
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
    // SIF ----------------------------------------------------------
    //

    AddSIF() {
        this.SIF.push(new sifType());
    }

    RmSIFLast() {
        this.SIF.splice(-1);
    }

    SetSIF(
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
        ele.XPath = validStrTEXTArr(xpathStr, ele.XPath);
        ele.Definition = validStr(definition, ele.Definition);
        ele.Commentary = validStr(commentary, ele.Commentary);
        ele.Datestamp = validStr(datestamp, ele.Datestamp);
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

    AssignSIF(sif: sifType[]) {
        this.SIF = sif != null ? sif : EmptySIF();
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
        ele.Link = validStrTEXTArr(linkStr, ele.Link);
        ele.Path = validStrTEXTArr(pathStr, ele.Path);
        ele.Definition = validStr(definition, ele.Definition);
        ele.Commentary = validStr(commentary, ele.Commentary);
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

    AssignOtherStd(os: otherStdType[]) {
        this.OtherStandards = os != null ? os : EmptyOS();
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
        datestamp: string,
        jurisdiction: string,
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
        ele.Jurisdiction = validStr(jurisdiction, ele.Jurisdiction);
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
            ele.Jurisdiction.trim().length == 0 &&
            ele.Link.length == 0
        );
    }

    IsLastLegalDefEmpty() {
        const n = this.CntLegalDef();
        return n == 0 || this.IsLegalDefEmpty(n - 1);
    }

    AssignLegalDef(ld: legalDefType[]) {
        this.LegalDefinitions = ld != null ? ld : EmptyLD();
    }

    //
    // Sensitivity --------------------------------------------------
    //

    AddSensi() {
        this.Sensitivity.push(new sensiType());
    }

    RmSensiLast() {
        this.Sensitivity.splice(-1);
    }

    SetSensi(
        i: number,
        locale: string,
        value: string,
        commentary: string,
    ) {
        if (this.CntSensi() == 0) {
            return
        }
        const ele = this.Sensitivity[i];
        ele.Locale = validStr(locale, ele.Locale);
        ele.Value = validStr(value, ele.Value);
        ele.Commentary = validStr(commentary, ele.Commentary);
    }

    CntSensi() {
        return this.Sensitivity.length;
    }

    IsSensiEmpty(i: number) {
        const ele = this.Sensitivity[i];
        if (ele == undefined) {
            return true;
        }
        return (
            ele.Locale.trim().length == 0 &&
            ele.Value.trim().length == 0 &&
            ele.Commentary.trim().length == 0
        );
    }

    IsLastSensiEmpty() {
        const n = this.CntSensi();
        return n == 0 || this.IsSensiEmpty(n - 1);
    }

    AssignSensi(sensi: sensiType[]) {
        this.Sensitivity = sensi != null ? sensi : EmptySensi();
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
        i: number,
        name: string,
        description: string,
        standard: string,
        elementStr: string,
        bizruleStr: string,
        defmod: string,
        elemname: string,
        values: string
    ) {
        if (this.CntCol() == 0) {
            return
        }
        const ele = this.Collections[i];
        ele.Name = validStr(name, ele.Name);
        ele.Description = validStr(description, ele.Description);
        ele.Standard = validStr(standard, ele.Standard);
        ele.Elements = validStrTEXTArr(elementStr, ele.Elements);
        ele.BusinessRules = validStrHTMLArr(bizruleStr, ele.BusinessRules);
        ele.DefinitionModification = validStr(defmod, ele.DefinitionModification);
        ele.ElementName = validStr(elemname, ele.ElementName);
        ele.Values = validStr(values, ele.Values);
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
            ele.BusinessRules.length == 0 &&
            ele.ElementName.trim().length == 0 &&
            ele.Values.length == 0
        );
    }

    IsLastColEmpty() {
        const n = this.CntCol();
        return n == 0 || this.IsColEmpty(n - 1);
    }

    AssignCol(col: colType[]) {
        this.Collections = col != null ? col : EmptyCol();
    }

    //
    // Meta Data ----------------------------------------------------
    //

    SetMeta(
        type: string,
        superClass: string,
        isAttributeOf: string,
        crossRef: string,
        timeframe: string,
    ) {
        this.Metadata.Type = validStr(type, this.Metadata.Type);
        this.Metadata.SuperClass = validStr(superClass, this.Metadata.SuperClass);
        this.Metadata.IsAttributeOf = validStrTEXTArr(isAttributeOf, this.Metadata.IsAttributeOf);
        this.Metadata.CrossRefEntities = validStrTEXTArr(crossRef, this.Metadata.CrossRefEntities);
        this.Metadata.Timeframe = validStr(timeframe, this.Metadata.Timeframe);
    }

    AssignMeta(meta: metaType) {
        this.Metadata = meta != null ? meta : new metaType();
        this.Metadata.SuperClass = oriName(this.Metadata.SuperClass);
        this.Metadata.IsAttributeOf = this.Metadata.IsAttributeOf.map(obj => oriName(obj));
        this.Metadata.CrossRefEntities = this.Metadata.CrossRefEntities.map(cre => oriName(cre));
    }

    ////

    GenJSON() {
        return JSON.stringify(this, null, 2);
    }

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
}

class defType {
    Text = "";
    Scope = "";
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
    Jurisdiction = "";
}

class sensiType {
    Locale = "";
    Value = "";
    Commentary = "";
}

class colType {
    Name = "";
    Description = "";
    Standard = "";
    Elements: string[] = [];
    BusinessRules: string[] = [];
    DefinitionModification = "";
    ElementName = "";
    Values = "";
}

class metaType {
    Type = "";
    SuperClass = "";
    IsAttributeOf: string[] = [];
    CrossRefEntities: string[] = [];
    Timeframe = "";
}

const EmptyStrArr = (): string[] => { return [] }
const EmptyDef = (): defType[] => { return [] }
const EmptySIF = (): sifType[] => { return [] }
const EmptyOS = (): otherStdType[] => { return [] }
const EmptyLD = (): legalDefType[] => { return [] }
const EmptySensi = (): sensiType[] => { return [] }
const EmptyCol = (): colType[] => { return [] }

export const jsonEnt = reactive(new EntType());
