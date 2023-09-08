const XLSX = require('xlsx');

//                (malumot,turi) fayl title => statistika, bemorlar, xodimlar, mahallalar 
const exportExel = (data, title) => {
    const fileUrl = `/exel-export/${title}-${Date.now()}.xlsx`

    // Ma'lumotlarni Excel uchun formatga o'tkazish
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Yangi workbook yaratish
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Malumotlar');
    
    // XLSX faylini saqlash
    XLSX.writeFile(wb, `./public${fileUrl}`, { bookType: 'xlsx', type: 'buffer' });

    return fileUrl
}

// exportExel([], 'salom')

module.exports = exportExel;

