export const padStartSpaceP = (s: string, n: number) => {
    let spaces = ""
    for (let i = 0; i < n; i++) {
        spaces += "&nbsp;"
    }
    return s.replace('<p>', '<p>' + spaces)
}

export const isHTMLStr = (s: string) => {
    const htmlRegex = /<[a-z][\s\S]*>/i;
    return htmlRegex.test(s);
}

const pad2 = (n: number) => {
    return n < 10 ? "0" + n : n;
};

export const timestamp = () => {
    const date = new Date();
    return (
        date.getFullYear().toString() +
        "-" +
        pad2(date.getMonth() + 1) +
        "-" +
        pad2(date.getDate()) +
        " " +
        pad2(date.getHours()) +
        ":" +
        pad2(date.getMinutes()) +
        ":" +
        pad2(date.getSeconds())
    );
};

const DefaultSymbol = '**';

// if val is '**', return defaultVal; otherwise, return val (without tail space)
export const validStr = (val: string, defaultVal: string) => {
    return val != DefaultSymbol ? val.trimEnd() : defaultVal;
};

export const validStrHTMLArr = (val: string, defaultVal: string[]) => {

    if (val == DefaultSymbol) {
        return defaultVal
    }

    const arr = val.split(/<\/p>|<\/h1>|<\/h2>|<\/h3>|<\/h4>|<\/h5>|<\/h6>/);

    // add close tag
    for (let i = 0; i < arr.length; i++) {
        const s = arr[i];
        const re = /^(<p>|<h1>|<h2>|<h3>|<h4>|<h5>|<h6>)/;
        if (s.match(re)) {
            if (s[2] == ">") {
                arr[i] += "</p>";
            } else if (s[3] == ">") {
                arr[i] += "</" + s.slice(1, 4);
            }
        }
    }

    // filter empty html line
    const rt: string[] = [];
    for (let i = 0; i < arr.length; i++) {
        const s = arr[i];
        if (s == "" || s == "<p><br></p>" || s.match(/^<h\d><br><\/h\d>$/g)) {
            continue;
        }
        rt.push(s);
    }
    return rt;
};

export const validStrTEXTArr = (val: string, defaultVal: string[]) => {

    if (val == DefaultSymbol) {
        return defaultVal
    }

    // filter empty text line
    const rt: string[] = [];
    val.split("\n").forEach((element) => {
        if (element.length > 0) {
            rt.push(element);
        }
    });
    return rt;
};

// return (ons.match(/\n/g) || []).length

export const html2plain = (html: string) => {
    // Create a new div element
    const tempElem = document.createElement("div");

    // Set the HTML content with the given value
    tempElem.innerHTML = html;

    // Retrieve the text property of the element
    return tempElem.textContent || tempElem.innerText || "";
};

export const htmls2plain = (htmls: string[]) => {
    const plains: string[] = [];
    if (htmls == null || htmls.length == 0) {
        return plains;
    }
    htmls.forEach((val) => {
        plains.push(html2plain(val));
    });
    return plains;
};

export const fitTextarea = (ta: HTMLTextAreaElement, str: string) => {
    if (ta != null) {
        const numberOfLineBreaks = (str.match(/\n/g) || []).length;
        const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
        ta.style.height = newHeight + "px";
    }
}

export const isSomeValue = (v: any) => {
    if (v == undefined || v == null) {
        return false
    }
    if (Array.isArray(v)) {
        return v.length > 0
    }
    switch (typeof v) {
        case "string":
            return isHTMLStr(v) ? html2plain(v).trim().length > 0 : v.trim().length > 0
        case "object":
            return Object.keys(v).length > 0
        default:
            return true
    }
}

export const hasSomeValue = (obj: any, field: string) => {
    return obj.hasOwnProperty(field) ? isSomeValue(obj[field]) : false
}

export const oriName = (name: string) => {
    if (name.includes('(') && name.endsWith(')')) {
        const o = name.lastIndexOf('(')
        const c = name.lastIndexOf(')')
        const v = name.slice(o + 1, c)
        if (!isNaN(Number(v))) {
            return name.slice(0, o)
        }
    }
    return name
}