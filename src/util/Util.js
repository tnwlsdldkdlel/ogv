export const getNum = (param, defaultValue) => {
    if (!param) {
        return defaultValue;
    }

    return parseInt(param);
};

export const getString = (param, defaultValue) => {
    if (!param) {
        return defaultValue;
    }

    return param;
}

export const stringToHtml = (str) => {
    const dom = document.createElement("div");
    dom.innerHTML = str;
    return dom;
}

export const today = () => {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜

    if (month / 10 < 1) {
        month = 0 + "" + month
    }

    if (date / 10 < 1) {
        date = 0 + "" + date
    }


    return year + '-' + month + '-' + date
}

export const dateFormat = (prevDate) => {
    let newDate = new Date(prevDate);
    let year = newDate.getFullYear(); // 년도
    let month = newDate.getMonth() + 1;  // 월
    let date = newDate.getDate();  // 날짜

    if (month / 10 < 1) {
        month = 0 + "" + month
    }

    if (date / 10 < 1) {
        date = 0 + "" + date
    }

    return year + '-' + month + '-' + date
}

export const isEmptyObj = (obj) => {
    const keys = Object.keys(obj);
    var result = {};

    keys.forEach(key => {
        result[key] = isEmpty(obj[key]);
    })

    var count = 0;
    const resultKeys = Object.keys(result);
    resultKeys.forEach(key => {
        if (resultKeys[key]) {
            count++;
        }
    })

    if (count > 0) {
        return result;
    } else {
        return false;
    }
}

export const isEmpty = (value) => {
    if (typeof value === "string") {
        if (value === "") {
            return true
        }
    } else if (typeof value === "object") {
        if (value.length === 0) {
            return true
        }
    }

    return false
}

export const converObjToFormData = (obj) => {
    const keys = Object.keys(obj);
    const formData = new FormData();

    keys.forEach(key => {
        ;
        formData.append(key, obj[key]);
    })

    return formData;
}