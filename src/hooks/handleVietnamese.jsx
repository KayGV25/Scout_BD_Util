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
    ắ: "aws",
    ằ: "awf",
    ẳ: "awr",
    ẵ: "awx",
    ặ: "awj",
    ấ: "aas",
    ầ: "aaf",
    ẩ: "aar",
    ẫ: "aax",
    ậ: "aaj",
    á: "as",
    à: "af",
    ả: "ar",
    ã: "ax",
    ạ: "aj",
    ă: "aw",
    â: "aa",
    đ: "dd",
    ế: "ees",
    ề: "eef",
    ể: "eer",
    ễ: "eex",
    ệ: "eej",
    é: "es",
    è: "ef",
    ẻ: "er",
    ẽ: "ex",
    ẹ: "ej",
    ê: "ee",
    í: "is",
    ì: "if",
    ỉ: "ir",
    ĩ: "ix",
    ị: "ij",
    ố: "oos",
    ồ: "oof",
    ổ: "oor",
    ỗ: "oox",
    ộ: "ooj",
    ớ: "ows",
    ờ: "owf",
    ở: "owr",
    ỡ: "owx",
    ợ: "owj",
    ó: "os",
    ò: "of",
    ỏ: "or",
    õ: "ox",
    ọ: "oj",
    ô: "oo",
    ơ: "ow",
    ứ: "uws",
    ừ: "uwf",
    ử: "uwr",
    ữ: "uwx",
    ự: "uwj",
    ú: "us",
    ù: "uf",
    ủ: "ur",
    ũ: "ux",
    ụ: "uj",
    ư: "uw",
    ý: "ys",
    ỳ: "yf",
    ỷ: "yr",
    ỹ: "yx",
    ỵ: "yj",
  };

  const TONE_MARKS = {
    "́": "s", // Acute accent
    "̀": "f", // Grave accent
    "̉": "r", // Hook above
    "̃": "x", // Tilde
    "̣": "j"  // Dot below
};

function handleVietNamese(text){
    text = handleVietNameseNormal(text);
    text = text.replaceAll("ch", "_");

    return text;
}

function handleVietNameseNormal(text){
    Object.entries(VN_TELEX).forEach(([vietnameseChar, telexChar]) => {
        text = text.replaceAll(vietnameseChar, telexChar);
    });

    Object.entries(TONE_MARKS).forEach(([toneMark, telexTone]) => {
        text = text.replaceAll(toneMark, telexTone);
    });

    return text;
}

export {
    handleVietNamese,
    handleVietNameseNormal
}


export default 0;