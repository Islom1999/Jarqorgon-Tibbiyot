const fs = require('fs');

//                (malumot,turi) fayl title => statistika, bemorlar, xodimlar, mahallalar 
const exportJson = (data, title) => {
    const fileUrl = `/json-export/${title}-${Date.now()}.jsonx`
    
    fs.writeFileSync(`./public${fileUrl}`, JSON.stringify(data, undefined, 4), (err) => {
        if(err) throw err;
        console.log('ishladi')
    });

    return fileUrl
}

// exportJson([], 'salom') 

module.exports = exportJson;

