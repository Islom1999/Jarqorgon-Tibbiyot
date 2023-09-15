const { request } = require("express");
const Users = require("../models/user.model");

const getLogin = async (req, res) => {
  try {
    res.render("login", {
      title: "Login",
      islLoginPage: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ phone: username });

    if (!user) {
      return res.render("login", {
        title: "Login",
        islLoginPage: true,
        errorMessage: "Username yoki parol xato",
      });
    }

    if (user.password !== password) {
      return res.render("login", {
        title: "Login",
        islLoginPage: true,
        errorMessage: "Username yoki parol xato",
      });
    }
    user.password = "";

    req.session.user = user;
    req.session.role = user.role;
    req.session.isLogin = true;
    req.session.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.user = undefined;
    req.session.role = undefined;
    req.session.isLogin = false;
    req.session.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getLogin,
  userLogin,
  userLogout
};
