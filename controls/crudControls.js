const Users = require("../models/user.model");
const Patients = require("../models/patient.model");
const Regions = require("../models/region.model");

const createNurse = async (req, res) => {
  try {
    const regionId = req.body.region;

    const users = new Users({ ...req.body });
    users.save();

    await Regions.findByIdAndUpdate(regionId, { $push: { nurses: users._id } });

    res.redirect("/nurse");
  } catch (error) {
    console.log(error);
  }
};
const updateNurse = async (req, res) => {
  try {
    if (req.body.region) {
      const nurseId = req.params.id;
      const regionId = req.body.region;
      await Regions.findOneAndUpdate(
        { nurses: { $in: nurseId } },
        { $pull: { nurses: nurseId } }
      );
      await Regions.findByIdAndUpdate(regionId, { $push: { nurses: nurseId } });
    }

    await Users.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/nurse");
  } catch (error) {
    console.log(error);
  }
};
const deleteNurse = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);

    const nurseId = req.params.id;
    await Regions.findOneAndUpdate(
      { nurses: { $in: nurseId } },
      { $pull: { nurses: nurseId } }
    );

    res.redirect("/nurse");
  } catch (error) {
    console.log(error);
  }
};

const createRegion = async (req, res) => {
  try {
    // const usersId = req.body.nurses

    // const region = new Regions({... req.body})
    // region.save()

    // await Users.findByIdAndUpdate(regionId, { $push: { nurses: users._id } })

    await Regions.create(req.body);
    console.log(req.body);

    res.redirect("/region");
  } catch (error) {
    console.log(error);
  }
};
const updateRegion = async (req, res) => {
  try {
    await Regions.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/region");
  } catch (error) {
    console.log(error);
  }
};
const deleteRegion = async (req, res) => {
  try {
    await Regions.findByIdAndDelete(req.params.id);
    res.redirect("/region");
  } catch (error) {
    console.log(error);
  }
};

const createPatient = async (req, res) => {
  try {
    const { weeks } = req.body;
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate() - +weeks * 7);

    let dateEnd = new Date(dateStart);
      for (let i = 0; i < 9; i++) {
        dateEnd.setMonth(dateEnd.getMonth() + 1);
      }
    dateEnd.setDate(dateEnd.getDate() + 9);

    await Patients.create({ ...req.body, dateStart, dateEnd });
    res.redirect("/patient");
  } catch (error) {
    console.log(error);
  }
};
const updatePatient = async (req, res) => {
  try {
    const week = req.body.weeks;
    const boy = req.body.boy;
    const girl = req.body.girl;

    if (boy || girl) {
      await Patients.findByIdAndUpdate(req.params.id, {
        ...req.body,
        children: {
          boy: {
            count: +boy,
          },
          girl: {
            count: +girl,
          },
        },
      });
    }

    if (week) {
      const dateStart = new Date();

      dateStart.setDate(dateStart.getDate() - +week * 7);

      let dateEnd = new Date(dateStart);
      for (let i = 0; i < 9; i++) {
        dateEnd.setMonth(dateEnd.getMonth() + 1);
      }
      dateEnd.setDate(dateEnd.getDate() + 9);

    await Patients.findByIdAndUpdate(req.params.id, { dateStart, dateEnd });
    } else {
      await Patients.findByIdAndUpdate(req.params.id, req.body);
    }

    res.redirect("/patient");
  } catch (error) {
    console.log(error);
  }
};
const deletePatient = async (req, res) => {
  try {
    await Patients.findByIdAndDelete(req.params.id);
    res.redirect("/patient");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNurse,
  updateNurse,
  deleteNurse,
  createRegion,
  updateRegion,
  deleteRegion,
  createPatient,
  updatePatient,
  deletePatient,
};
