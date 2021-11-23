const validateJustText = function(text){
    return /\d/.test(text)
}

const validateFirstCharIsNotNumber = function (text){
const firstChar = String(text).substring(0,1)
    return validateJustText(firstChar)
}

const validadeOnlyTextAndUnderscore = function(text){
    return /^[a-zA-Z_]*$/.test(text)
}

exports.validadeOnlyTextAndUnderscore = validadeOnlyTextAndUnderscore