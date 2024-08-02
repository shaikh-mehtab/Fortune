const connection = require("../../connection");

const getAllContact = async (req, res) => {
  try {
    const [contact] = await connection.query(
      "select * from web_contact where status=1"
    );
    const page = {
      title: contact[0].title,
      meta_title: contact[0].meta_title,
      meta_desc: contact[0].meta_desc,
    };

    res.render("contact", {
      page: page,
      contact: contact[0],
    });
  } catch (error) {
    console.log(error);
    res.render("500", {
      message: error.message,
    });
  }
};

module.exports = {
  getAllContact,
};
