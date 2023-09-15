const Users = require("../models/user.model");
const Patients = require("../models/patient.model");
const Regions = require("../models/region.model");
const filtering = require("../utils/filtering");
const { DateTime } = require("luxon");

const getHome = async (req, res) => {
  try {
    const bemorCount = await Patients.countDocuments({});
    const tugganCount = await Patients.countDocuments({status: "tuggan"});
    const tugmaganCount = await Patients.countDocuments({status: "tugmagan"});
    const tushganCount = await Patients.countDocuments({status: "tushib qolgan"});
    const abortCount = await Patients.countDocuments({status: "abort qilingan"});
    const patronologCount = await Patients.countDocuments({type: "Patronolog"});
    const fiziologikCount = await Patients.countDocuments({type: "Fiziologik"});
    const xodimCount = await Users.countDocuments({role: "Nurse"});

    const DataCounts = {bemorCount, tugganCount, tugmaganCount, tushganCount, abortCount, patronologCount, fiziologikCount, xodimCount}

    res.render("dashboard", {
      title: "Dashboard",
      Role: req.session.role,
      User: req.session.user,
      DataCounts
    });
  } catch (error) {
    console.log(error);
  }
};

const getPatient = async (req, res) => {
  try {
    const total = await Patients.countDocuments();
    const limit = req.query.limit || 20;
    const page = req.query.page || 1;

    let region = req.query.region || undefined;
    const status = req.query.status || undefined;

    const week = req.query.week || undefined;
    const month = req.query.month || undefined;
    const year = req.query.year || undefined;
    const dateStart = req.query.dateStart || undefined;
    const dateEnd = req.query.dateEnd || undefined; 

    // if (!region) {
    //   if (req.session.role == "Nurse") {
    //     region = req.session.user.region;
    //   }
    // }

    const filterData = filtering(
      status,
      region,
      week,
      month,
      year,
      dateStart,
      dateEnd
    );

    const patients = await Patients.find(filterData)
      .sort({ createdAt: -1 })
      .skip(page * limit - limit)
      .limit(limit)
      .populate({
        path: "address",
        populate: {
          path: "nurses",
        },
      })
      .lean();

    // console.log(filterData)

    const regions = await Regions.find().populate("nurses").lean();

    res.render("patient", {
      title: "Bemorlar",
      patients,
      regions,
      pagination: {
        page,
        limit,
        pageCount: Math.ceil(total / limit),
      },
      Role: req.session.role,
      User: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getRegion = async (req, res) => {
  try {
    const total = await Regions.countDocuments();
    const limit = req.query.limit || 20;
    const page = req.query.page || 1;

    let regions;

    if (req.query.search) {
      regions = await Regions.find({
        $or: [{ title: new RegExp(req.query.search, "gi") }],
      })
        .sort({ createdAt: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .populate("nurses")
        .lean();
    } else {
      regions = await Regions.find()
        .sort({ createdAt: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .populate("nurses")
        .lean();
    }

    const users = await Users.find().lean();

    res.render("region", {
      title: "Mahallalar",
      regions,
      nurses: users,
      pagination: {
        page,
        limit,
        pageCount: Math.ceil(total / limit),
      },
      search: req.query.search,
      Role: req.session.role,
      User: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getNurse = async (req, res) => {
  try {
    const total = await Users.countDocuments();
    const limit = req.query.limit || 20;
    const page = req.query.page || 1;
    const role = req.query.role;

    let users;

    if (req.query.search) {
      if (role) {
        users = await Users.find({
          role,
          $or: [
            { lastname: new RegExp(req.query.search, "gi") },
            { surname: new RegExp(req.query.search, "gi") },
            { firstname: new RegExp(req.query.search, "gi") },
            { phone: new RegExp(req.query.search, "gi") },
          ],
        })
          .sort({ createdAt: -1 })
          .skip(page * limit - limit)
          .limit(limit)
          .populate("region")
          .lean();
      } else {
        if (req.session.role == "Admin") {
          users = await Users.find({
            role: "Nurse",
            $or: [
              { lastname: new RegExp(req.query.search, "gi") },
              { surname: new RegExp(req.query.search, "gi") },
              { firstname: new RegExp(req.query.search, "gi") },
              { phone: new RegExp(req.query.search, "gi") },
            ],
          })
            .sort({ createdAt: -1 })
            .skip(page * limit - limit)
            .limit(limit)
            .populate("region")
            .lean();
        } else {
          users = await Users.find({
            $or: [
              { lastname: new RegExp(req.query.search, "gi") },
              { surname: new RegExp(req.query.search, "gi") },
              { firstname: new RegExp(req.query.search, "gi") },
              { phone: new RegExp(req.query.search, "gi") },
            ],
            role: {$ne: 'starAdmin'}
          })
            .sort({ createdAt: -1 })
            .skip(page * limit - limit)
            .limit(limit)
            .populate("region")
            .lean();
        }
      }
    } else {
      if (role) {
        users = await Users.find({ role })
          .sort({ createdAt: -1 })
          .skip(page * limit - limit)
          .limit(limit)
          .populate("region")
          .lean();
      } else {
        if (req.session.role == "Admin") {
          users = await Users.find({ role: "Nurse"})
          .sort({ createdAt: -1 })
          .skip(page * limit - limit)
          .limit(limit)
          .populate("region")
          .lean();
        } else {
          users = await Users.find({role: {$ne: 'starAdmin'}})
            .sort({ createdAt: -1 })
            .skip(page * limit - limit)
            .limit(limit)
            .populate("region")
            .lean();
        }
      }
    }

    const regions = await Regions.find().lean();

    res.render("nurse", {
      title: "Hamshiralar",
      nurses: users,
      regions,
      pagination: {
        page,
        limit,
        pageCount: Math.ceil(total / limit),
      },
      Role: req.session.role,
      User: req.session.user,
      valueQuery: req.query,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await Users.findById(req.session.user._id)
      .populate("region")
      .lean();
    res.render("profile", {
      title: "Profile",
      Role: req.session.role,
      User: req.session.user,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHome,
  getPatient,
  getRegion,
  getNurse,
  getProfile,
};
