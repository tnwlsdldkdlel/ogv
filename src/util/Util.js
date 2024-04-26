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