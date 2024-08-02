const connection = require("../../connection");

const { getIp } = require("../clientIP");

const getAllAbout = async (req, res) => {
  try {
    const [about] = await connection.query(
      `SELECT * from web_about where status=1 `
    );
    const [management] = await connection.query(
      `SELECT * FROM management where status=1`
    );
    const [awards] = await connection.query(
      `select * from awards where status=1`
    );
    const [associate] = await connection.query(
      `SELECT * FROM associate where status=1`
    );

    const page = {
      title: about[0].title,
      meta_title: about[0].meta_title,
      meta_desc: about[0].meta_description,
    };

    res.render("about", {
      page: page,
      about: about[0],
      management: management,
      awards: awards,
      associate: associate,
    });
  } catch (error) {
    console.log(error);
    res.render("500", {
      message: error.message,
    });
  }
};

module.exports = {
  getAllAbout,
};
