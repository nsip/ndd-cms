export const addSpacesAtStartP = (p: string, n: number) => {
    let spaces = ""
    for (let i = 0; i < n; i++) {
        spaces += "&nbsp;"
    }
    return p.replace('<p>', '<p>' + spaces)
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

export const cvtHtml2Plain = (html: string) => {
    // Create a new div element
    const tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || "";
};

export const cvtArrayHtml2Plain = (htmls: string[]) => {
    const plains: string[] = [];
    if (htmls == null || htmls.length == 0) {
        return plains;
    }
    htmls.forEach((val) => {
        plains.push(cvtHtml2Plain(val));
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