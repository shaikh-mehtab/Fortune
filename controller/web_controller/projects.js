const connection = require("../../connection");

const getAllProjects = async (req, res) => {
  try {
    const { category } = req.query;
    var projects;
    if (category) {
      [projects] = await connection.query(
        "select p.*,c.cat_slug,c.cat_title from projects p join project_category c on p.cat_id = c.cat_id left join project_category pc on c.parent_id=pc.cat_id where p.status=1 and c.cat_slug=? or pc.cat_slug=?",
        [category, category]
      );
    } else {
      [projects] = await connection.query(
        "select p.*,c.cat_title,c.cat_slug from projects p join project_category c on p.cat_id = c.cat_id where p.status=1 "
      );
    }
    const [cat] = await connection.query(
      `select * from project_category where cat_title=?`,[category]
    );
    const [web_projects] = await connection.query(
      "select * from web_projects where project_status=1"
    );
    const [project_category] = await connection.query(
      "select * from project_category WHERE cat_status =1"
    );
    const [sub_category] = await connection.query(
      "SELECT * FROM sub_category where status = 1"
    );
    const [project_location] = await connection.query(
      `select * from locations where status >= 0`
    );
    const page = {
      title: web_projects[0].title,
      cover_url: web_projects[0].cover_url,
      meta_title: web_projects[0].meta_title,
      meta_desc: web_projects[0].meta_desc,
    };
    res.status(200).render("projects", {
      page: page,
      projects: projects,
      curr_cat: category,
      project_location:project_location,
      project_category: project_category,
      sub_category:sub_category
    });
  } catch (error) {
    res.status(500).render("500", {
      message: error.message,
    });
    console.log(error);
  }
};

const getProjectsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({
        message: "Slug is required",
      });
    }

    const [data] = await connection.query(
      `SELECT * FROM projects WHERE slug = ?`,
      [slug]
    );

    res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectsBySlug,
};
