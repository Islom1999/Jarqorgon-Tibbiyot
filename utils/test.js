const fs = require('fs');
const xlsx = require('xlsx');

const data = [
  {
    name: "islom",
    surname: "karimov",
    phone: [
        {
            title: 'Contact1'
        },
        {
            title: 'Contact2'
        },
    ],
  },
  {
    name: "islom",
    surname: "karimov",
    phone: [
        {
            title: 'Contact1'
        },
        {
            title: 'Contact2'
        },
    ],
  },
];

// Excel faylini yaratish
const ws = xlsx.utils.json_to_sheet(data);

// Workbook yaratish va worksheet ni ulash
const wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, "Malumotlar"); // "Malumotlar" nomli worksheet yaratiladi

// Excel faylini saqlash
const excelFilePath = 'malumotlar.xlsx';
xlsx.writeFile(wb, excelFilePath, { bookType: 'xlsx', type: 'file' });

console.log(`Ma'lumotlar "malumotlar.xlsx" fayliga yozildi.`);
