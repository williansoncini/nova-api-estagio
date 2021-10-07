const path = require('path')
const fs = require('fs');

exports.saveFileAndReturnPath = async function(file){
    const uploadFile = file
    const uploadPath = String(path.join(__dirname,'../upload/')) + uploadFile.name

    await uploadFile.mv(uploadPath, function(err){
        if (err){
            console.log('Erro em uploadfile.mv')
        }
            
    })
    const filePathSync = fs.realpathSync(uploadPath, {encoding:'utf8'})
    return filePathSync
}

exports.deleteFileFromPath = async function(filePath){
    fs.unlinkSync(filePath)
}