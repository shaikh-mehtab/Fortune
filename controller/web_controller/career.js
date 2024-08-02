const connection = require("../../connection");

const getAllCareer = async (req, res) => {
  try {
    const [careers] = await connection.query(
      `select * from job_positions where status=1`
    );
    const [form] = await connection.query(
      `select * from applicant  where applicant_status=1`
    );
    const [webCareer] = await connection.query(
      `select * from web_career where status=1`
    );

    const page = {
      title: webCareer[0].title,
      meta_title: webCareer[0].meta_title,
      meta_desc: webCareer[0].meta_description,
    };
    res.render("career", {
      page: page,
      careers: careers,
      form: form,
      webCareer: webCareer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).render("500", {
      message: error.message,
    });
  }
};
module.exports = {
  getAllCareer,
};
