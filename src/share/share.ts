import { fetchBodyJsonStr, fetchNoBody, mEmpty, fetchErr } from "@/share/fetch";
import { URL_SIGN } from "@/share/ip"
import { EntType } from "@/share/EntType";
import { ColType } from "@/share/ColType";

export const Mode = ref(""); // 'new' or 'edit'
export const loginUser = ref("");
export const loginAuth = ref("");
export const loginToken = ref("");
export const itemName = ref("");
export const itemType = ref("");

//////////////////////////////////////////////////////////////////////////////////////

const onExpired = async () => {
    alert("session expired, redirecting to sign page")
    location.replace(`${URL_SIGN}`)
}

//////////////////////////////////////////////////////////////////////////////////////

export const getPing = async () => {
    const rt = await fetchNoBody(`/api/system/ver`, "GET", mEmpty, "");
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
};

// fill loginUser
export const getSelfName = async () => {
    const rt = await fetchNoBody("api/user/auth/uname", "GET", mEmpty, loginAuth.value);
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
};

export const postDataToDic = async (data: string) => {
    const rt = await fetchBodyJsonStr("api/dictionary/auth/upsert", "POST", mEmpty, data, loginAuth.value);
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
};

export const getItemContent = async (name: string, type: string, phase: string) => {
    const mParam = new Map<string, any>([
        ["name", name],
        ["phase", phase],
    ]);
    const rt = await fetchNoBody("api/dictionary/pub/one", "GET", mParam, loginAuth.value);
    const err = await fetchErr(rt, onExpired)
    switch (type) {
        case "entity":
            return {
                'data': err == null ? (rt as any[])[0] as string : null,
                'error': err
            };
        case "collection":
            return {
                'data': err == null ? (rt as any[])[0] as string : null,
                'error': err
            };
        default:
            return {
                'data': null,
                'error': "[type] can only be 'entity' or 'collection'"
            };
    }
};
