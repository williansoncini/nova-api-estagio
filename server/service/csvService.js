const fs = require('fs')
const path = require('path')

exports.createCsvFromMatrix = function(matrix){
    const filePath = createCsvFile()
    const delimiter = ';'

    const numberRows = matrix.length
    const numberColumns = matrix[0].length

    for (let r=0; r < numberRows; r++){
        for(let c=0; c < numberColumns; c++){
            const data = JSON.stringify(matrix[r][c])
            addDataAtFile(filePath, data)
            if (c < numberColumns-1)
                addDelimiterAtFile(filePath, delimiter)
        }
        if (r < numberRows-1)
            addBreakLineAtFile(filePath)
    }
}

function createCsvFile(){
    const csvPath = String(path.join(__dirname,'../csvFiles/'))
    const filePath = csvPath+'teste123.csv'
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

