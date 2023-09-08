const Users = require("../models/user.model");
const Patients = require("../models/patient.model");
const Regions = require("../models/region.model");
const exportExel = require("../utils/exelExport");
const exportJson = require("../utils/jsonExport");

const exportExelRegion = async (req, res) => {
  try {
    const region = await Regions.find().populate("nurses").lean();
    const regionData = region.map((elem) => {
      let nurses = "";

      elem.nurses.forEach((element, index, arr) => {
        if (index == arr.length - 1) {
          nurses += `${index + 1}. ${element.surname} ${element.firstname} ${
            element.lastname
          }`;
        } else {
          nurses += `${index + 1}. ${element.surname} ${element.firstname} ${
            element.lastname
          }\n`;
        }
      });
      return { title: elem.title, nurses };
    });
    const urlFile = await exportExel(regionData, "mahalla");
    res.redirect(urlFile);
  } catch (error) {
    console.log(error);
  }
};

const exportJsonRegion = async (req, res) => {
  try {
    const region = await Regions.find().populate("nurses").lean();
    const regionData = region.map((elem) => {
      return { title: elem.title, nurses: elem.nurses };
    });
    const urlFile = await exportJson(regionData, "mahalla");
    res.redirect(urlFile);
  } catch (error) {
    console.log(error);
  }
};

const exportExelNurse = async (req, res) => {
  try {
    const nurse = await Users.find().populate("region").lean();
    const nurseData = nurse.map((elem) => {
      let region = `${elem.region.title}`;

      return { 
        surname: elem.surname, 
        firstname: elem.firstname, 
        lastname: elem.lastname, 
        passportSeriaNumber: elem.passportSeriaNumber, 
        phone: elem.phone, 
        role: elem.role, 
        job: elem.job, 
        region 
      };
    });
    const urlFile = await exportExel(nurseData, "mahalla");
    res.redirect(urlFile);
  } catch (error) {
    console.log(error);
  }
};

const exportJsonNurse = async (req, res) => {
  try {
    const nurse = await Users.find().populate("region").lean();
    const nurseData = nurse.map((elem) => {
      return { 
        surname: elem.surname, 
        firstname: elem.firstname, 
        lastname: elem.lastname, 
        passportSeriaNumber: elem.passportSeriaNumber, 
        phone: elem.phone, 
        role: elem.role, 
        job: elem.job, 
        region: elem.region
      };
    });
    const urlFile = await exportJson(nurseData, "mahalla");
    res.redirect(urlFile);
  } catch (error) {
    console.log(error);
  }
};

const exportExelPatient = async (req, res) => {
  try {
    const nurse = await Users.find().populate("region").lean();
    const nurseData = nurse.map((elem) => {
      let region = `${elem.region.title}`;

      return { 
        surname: elem.surname, 
        firstname: elem.firstname, 
        lastname: elem.lastname, 
        passportSeriaNumber: elem.passportSeriaNumber, 
        phone: elem.phone, 
        role: elem.role, 
        job: elem.job, 
        region 
      };
    });
    const urlFile = await exportExel(nurseData, "mahalla");
    res.redirect(urlFile);
  } catch (error) {
    console.log(error);
  }
};

const exportJsonPatient = async (req, res) => {
  try {
    const nurse = await Users.find().populate("region").lean();
    const nurseData = nurse.map((elem) => {
      return { 
        surname: elem.surname, 
        firstname: elem.firstname, 
        lastname: elem.lastname, 
        passportSeriaNumber: elem.passportSeriaNumber, 
        phone: elem.phone, 
        role: elem.role, 
        job: elem.job, 
        region: elem.region
      };
    });
    const urlFile = await exportJson(nurseData, "mahalla");
    res.redirect(urlFile);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  exportExelRegion,
  exportJsonRegion,
  exportExelNurse,
  exportJsonNurse,
  exportExelPatient,
  exportJsonPatient,
};
