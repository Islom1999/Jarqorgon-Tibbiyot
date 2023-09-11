const { DateTime } = require('luxon');

const filtering = (status, region, week, month, year, dateStart, dateEnd) => {
    let filtering
    
    let date_bosh 
    let date_oxiri 

    if(week && !month && !year && !(dateStart || dateEnd)) {
      const [years, weekNumber] = week.split('-W'); 
      date_bosh  = new Date(years, 0, 3 + (weekNumber - 1) * 7);
      date_oxiri  = new Date(years, 0, 3 + (weekNumber - 1) * 7 + 6);
    }else if(!week && month && !year && !(dateStart || dateEnd)) { 
      date_bosh = new Date(month);
      date_oxiri  = new Date(`${date_bosh.getFullYear()}-${date_bosh.getMonth() + 2 < 10 ? "0" + (date_bosh.getMonth()+2) : date_bosh.getMonth()+2 }`);
    }else if(!week && !month && year && !(dateStart || dateEnd)) {
      date_bosh = new Date(year);
      date_oxiri = new Date(`${+date_bosh.getFullYear() + 1}`); 
    }else if(!week && !month && !year && (dateStart && dateEnd)) { 
      date_bosh  = new Date(dateStart);
      date_oxiri  = new Date(dateEnd);
    }else{
      const hozirgiVaqt = new Date(); 
      const yil = hozirgiVaqt.getFullYear();
      const weeks = Math.floor(( (+hozirgiVaqt - new Date(yil, 0, 1)) / 86400000 + 1) / 7) + 1; 
     
      const formattedDate = `${yil}-W${weeks < 10 ? '0' + weeks : weeks}`;
      const [years, weekNumber] = formattedDate.split("-W");
      
      date_bosh  = new Date(years, 0, 3 + (weekNumber - 1) * 7);
      date_oxiri  = new Date(years, 0, 3 + (weekNumber - 1) * 7 + 6 + 10);
    }

    if(!status && !region) {
      filtering = {
        dateEnd: { $gte: date_bosh, $lte: date_oxiri },
      }
    }
    if(status && !region) {
      filtering = {
        dateEnd: { $gte: date_bosh, $lte: date_oxiri },
        status
      }
    }
    if(!status && region) {
      filtering = {
        dateEnd: { $gte: date_bosh, $lte: date_oxiri },   
        address:region
      }
    }
    if(status && region) {
      filtering = {
        dateEnd: { $gte: date_bosh, $lte: date_oxiri },
        status,
        address:region
      }
    }

    // console.log(filtering)
  
    return filtering
  }
  
  module.exports = filtering