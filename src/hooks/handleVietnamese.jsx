export function handleVietNamese(text){
    const VN_TELEX = {
        ươu: "uouw",
        ướu: "uouws",
        ườu: "uouwf",
        ưởu: "uouwr",
        ưỡu: "uouwx",
        ượu: "uouwj",
        ưu: "uuw",
        ứu: "uuws",
        ừu: "uuwf",
        ửu: "uuwr",
        ữu: "uuwx",
        ựu: "uuwj",
        ươ: "uow",
        ướ: "uows",
        ườ: "uowf",
        ượ: "uowj",
        ưở: "uowr",
        ưỡ: "uowx",
        á: "as",
        à: "af",
        ả: "ar",
        ã: "ax",
        ạ: "aj",
        ắ: "aws",
        ằ: "awf",
        ẳ: "awr",
        ẵ: "awx",
        ặ: "awj",
        ă: "aw",
        ấ: "aas",
        ầ: "aaf",
        ẩ: "aar",
        ẫ: "aax",
        ậ: "aaj",
        â: "aa",
        đ: "dd",
        é: "es",
        è: "ef",
        ẻ: "er",
        ẽ: "ex",
        ẹ: "ej",
        ế: "ees",
        ề: "eef",
        ể: "eer",
        ễ: "eex",
        ệ: "eej",
        ê: "ee",
        í: "is",
        ì: "if",
        ỉ: "ir",
        ĩ: "ix",
        ị: "ij",
        ó: "os",
        ò: "of",
        ỏ: "or",
        õ: "ox",
        ọ: "oj",
        ố: "oos",
        ồ: "oof",
        ổ: "oor",
        ỗ: "oox",
        ộ: "ooj",
        ô: "oo",
        ớ: "ows",
        ờ: "owf",
        ở: "owr",
        ỡ: "owx",
        ợ: "owj",
        ơ: "ow",
        ú: "us",
        ù: "uf",
        ủ: "ur",
        ũ: "ux",
        ụ: "uj",
        ứ: "uws",
        ừ: "uwf",
        ử: "uwr",
        ữ: "uwx",
        ự: "uwj",
        ư: "uw",
        ý: "ys",
        ỳ: "yf",
        ỷ: "yr",
        ỹ: "yx",
        ỵ: "yj",
      };

    Object.entries(VN_TELEX).map(entry => {
        text = text.replaceAll(entry[0], entry[1]);
    })
    text = text.replaceAll("ch","_");
    return text;
}

export function handleVietNameseNormal(text){
    const VN_TELEX = {
        ươu: "uouw",
        ướu: "uouws",
        ườu: "uouwf",
        ưởu: "uouwr",
        ưỡu: "uouwx",
        ượu: "uouwj",
        ưu: "uuw",
        ứu: "uuws",
        ừu: "uuwf",
        ửu: "uuwr",
        ữu: "uuwx",
        ựu: "uuwj",
        ươ: "uow",
        ướ: "uows",
        ườ: "uowf",
        ượ: "uowj",
        ưở: "uowr",
        ưỡ: "uowx",
        á: "as",
        à: "af",
        ả: "ar",
        ã: "ax",
        ạ: "aj",
        ắ: "aws",
        ằ: "awf",
        ẳ: "awr",
        ẵ: "awx",
        ặ: "awj",
        ă: "aw",
        ấ: "aas",
        ầ: "aaf",
        ẩ: "aar",
        ẫ: "aax",
        ậ: "aaj",
        â: "aa",
        đ: "dd",
        é: "es",
        è: "ef",
        ẻ: "er",
        ẽ: "ex",
        ẹ: "ej",
        ế: "ees",
        ề: "eef",
        ể: "eer",
        ễ: "eex",
        ệ: "eej",
        ê: "ee",
        í: "is",
        ì: "if",
        ỉ: "ir",
        ĩ: "ix",
        ị: "ij",
        ó: "os",
        ò: "of",
        ỏ: "or",
        õ: "ox",
        ọ: "oj",
        ố: "oos",
        ồ: "oof",
        ổ: "oor",
        ỗ: "oox",
        ộ: "ooj",
        ô: "oo",
        ớ: "ows",
        ờ: "owf",
        ở: "owr",
        ỡ: "owx",
        ợ: "owj",
        ơ: "ow",
        ú: "us",
        ù: "uf",
        ủ: "ur",
        ũ: "ux",
        ụ: "uj",
        ứ: "uws",
        ừ: "uwf",
        ử: "uwr",
        ữ: "uwx",
        ự: "uwj",
        ư: "uw",
        ý: "ys",
        ỳ: "yf",
        ỷ: "yr",
        ỹ: "yx",
        ỵ: "yj",
      };

    Object.entries(VN_TELEX).map(entry => {
        text = text.replaceAll(entry[0], entry[1]);
    })
    return text;
}

export default 0;