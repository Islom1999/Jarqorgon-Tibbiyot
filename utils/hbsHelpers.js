const hbs = require('handlebars');
const moment = require("moment");

const hbsHelpers = (handlebars) => {
  // date formatter
  handlebars.registerHelper("formatDate", function (dateString) {
    return new handlebars.SafeString(
      moment(dateString).format("YYYY-MM-DD").toUpperCase()
    );
  });

  // switch start   
  hbs.registerHelper("switch", function (value, options) {
    this._switch_value_ = value;
    this._switch_break_ = false;
    return options.fn(this);
  });

  hbs.registerHelper("case", function (value, options) {
    if (value == this._switch_value_) {
      this._switch_break_ = true;
      return options.fn(this);
    }
  });

  hbs.registerHelper("default", function (options) {
    if (!this._switch_break_) {
      return options.fn(this);
    }
  });
  //  switch end

  // if value1 == value2
  hbs.registerHelper('if_eq', function(a, b, options) {
    if (a == b) {
        return options.fn(this);
    }
    return options.inverse(this);
  });

  // paginate helper
  handlebars.registerHelper("paginate", require("handlebars-paginate"));
};

module.exports = hbsHelpers;
