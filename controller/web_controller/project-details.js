const connection = require("../../connection");

const getProjectDetails = async (req, res) => {
  try {
    const { slug } = req.params;

    const [data] = await connection.query(
      `SELECT * from web_projects where id = 1`
    );

    const [project] = await connection.query(
      `SELECT * FROM projects where slug=? and status=1`,
      [slug]
    );

    const [sub_category] = await connection.query(
      "SELECT * FROM sub_category where status = 1 and sub_cat_id=?",
      [project[0].sub_cat_id]
    );

    const [project_category] = await connection.query(
      "select * from project_category WHERE cat_status =1 and cat_id=?",
      [project[0].cat_id]
    );

    const [project_status] = await connection.query(
      "select * from project_status WHERE status =1 and ps_id=?",
      [project[0].ps_id]
    );

    const [project_location] = await connection.query(
      `select * from locations where status >= 0 and pl_id=?`,
      [project[0].pl_id]
    );
    const arr = [1, 2, 3];
    const strarr = JSON.stringify(arr);
    const parsedArr = JSON.parse(strarr);

    const ids = JSON.parse(project[0].pa_id);
    const placeholders = ids.map(() => "?").join(", ");
    const [amenities] = await connection.query(
      `select * from amenities where amenities_id in (${placeholders})`,
      ids
    );

    console.log(ids, placeholders);
    const page = {
      title: project[0].title,
      meta_title: data[0].meta_title,
      meta_desc: data[0].meta_description,
    };

    res.render("details", {
      page: page,
      amenities: amenities,
      project: project[0],
      sub_category: sub_category[0],
      project_status: project_status[0],
      project_category: project_category[0],
      project_location: project_location[0],
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
};

module.exports = { getProjectDetails };
