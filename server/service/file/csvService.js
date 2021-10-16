const fs = require('fs')
const path = require('path')

exports.createCsvFromMatrix = function(matrix){
    const nameFile = generateRamdomNameFile()
    const filePath = createCsvFile(nameFile)
    const delimiter = ';'

    const numberRows = matrix.length
    const numberColumns = matrix[0].length

    for (let r=0; r < numberRows; r++){
        for(let c=0; c < numberColumns; c++){
            if (matrix[r][c] != null){
                const data = JSON.stringify(matrix[r][c])
                addDataAtFile(filePath, data)
            }
            // const data = matrix[r][c]
            if (c < numberColumns-1)
                addDelimiterAtFile(filePath, delimiter)
        }
        if (r < numberRows-1)
            addBreakLineAtFile(filePath)
    }

    return nameFile
}

function createCsvFile(nameFile){
    const csvPath = String(path.join(__dirname,'../csvFiles/'))
    const filePath = csvPath+nameFile
    fs.writeFileSync(filePath,'')
    return filePath
}

function addDataAtFile(filePath, data){
    fs.appendFileSync(filePath,data,function(err){
        if (err) throw err
    })
}

function addDelimiterAtFile(filePath, delimiter){
    fs.appendFileSync(filePath,delimiter,function(err){
        if (err) throw err
    })
}

function addBreakLineAtFile(filePath){
    fs.appendFileSync(filePath,'\n',function(err){
        if (err) throw err
    })
}

function generateRamdomNameFile(){
    return 'teste.csv'
}