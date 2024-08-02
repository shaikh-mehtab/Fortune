const connection = require("../../connection");

const searchProjectsDetails = async (req, res) => {
  try {
    const { parent_id, category, sub_category, location } = req.body;
    console.log(req.body);
    var query = `
        SELECT p.*, pc.cat_title,pc.cat_slug, pl.name AS location_name
        FROM projects p
        JOIN project_category pc ON p.cat_id = pc.cat_id
        JOIN sub_category sc ON p.sub_cat_id = sc.sub_cat_id
        JOIN project_location pl ON p.pl_id = pl.pl_id
        WHERE p.status=1 `;

    if (!(category || sub_category)) {
      query += `AND pc.parent_id=${parent_id}`;
    }
    if (category) {
      query += ` AND pc.cat_id = ${category}`;
      req.session.curr_cat = category;
    }
    if (sub_category) {
      query += ` AND sc.sub_cat_id = ${sub_category} `;
    }
    if (location) {
      query += ` AND pl.pl_id = ${location};`;
    }

    const [project] = await connection.query(query);
    req.session.projects = project;
    req.session.body = req.body
    console.log(req.session.projects);

    res.status(200).json({
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err.message });
  }
};

const renderSearchPage = async (req, res) => {
  try {
    const [web_projects] = await connection.query(
      "select * from web_projects where project_status=1"
    );
    const [project_category] = await connection.query(
      `select * from project_category where cat_status=1`
    );
    const [project_location] = await connection.query(
      `select * from locations where status >= 0`
    );
    const [sub_category] = await connection.query(
      "SELECT * FROM sub_category where status = 1"
    );
    const [t_projects] = await connection.query(
      "select p.*,c.cat_title,c.cat_slug from projects p join project_category c on p.cat_id = c.cat_id where p.status=1 "
    );

    let curr_cat,curr_sub_cat,curr_location

    if (req.session.body && req.session.body.category) {
       [curr_cat] = await connection.query(`select * from project_category where cat_status=1 and cat_id=?`, [req.session.body.category])
    } else {
       curr_cat = [undefined]
    }
    if (req.session.body && req.session.body.sub_category) {
       [curr_sub_cat] = await connection.query(`select * from sub_category where status=1 and sub_cat_id=?`, [req.session.body.sub_category])
    } else {
       curr_sub_cat = [undefined]
    }
    if (req.session.body && req.session.body.category) {
       [curr_location] = await connection.query(`select * from locations where status=1 and pl_id=?`, [req.session.body.location])
    } else {
       curr_location = [undefined]
    }

    const curr_data = {
      curr_cat: curr_cat[0], curr_sub_cat: curr_sub_cat[0], curr_location: curr_location[0], parent_id: req.session .body?req.session.body.parent_id:undefined
    }

    const page = {
      title: web_projects[0].title,
      cover_url: web_projects[0].cover_url,
      meta_title: web_projects[0].meta_title,
      meta_desc: web_projects[0].meta_desc,
    };
    const projects = req.session.projects ? req.session.projects : t_projects;
    console.log("curr cat", curr_data);
    res.render("projects", {
      page: page,
      project_location: project_location,
      sub_category: sub_category,
      project_category: project_category,
      projects: projects,
      curr_data: curr_data,
    });
  } catch (error) {
    console.log(error);
    res.render("500", {
      message: error.message,
    });
  }
};

const firsrrenderSearchPage = async (req, res) => {
  try {
    const [web_projects] = await connection.query(
      "select * from web_projects where project_status=1"
    );
    const [project_category] = await connection.query(
      `select * from project_category where cat_status=1`
    );
    const [project_location] = await connection.query(
      `select * from locations where status >= 0`
    );
    const [sub_category] = await connection.query(
      "SELECT * FROM sub_category where status = 1"
    );
    const [t_projects] = await connection.query(
      "select p.*,c.cat_title,c.cat_slug from projects p join project_category c on p.cat_id = c.cat_id where p.status=1 "
    );

    let curr_cat,curr_sub_cat,curr_location

    if (req.session.body && req.session.body.category) {
       [curr_cat] = await connection.query(`select * from project_category where cat_status=1 and cat_id=?`, [req.session.body.category])
    } else {
       curr_cat = [undefined]
    }
    if (req.session.body && req.session.body.sub_category) {
       [curr_sub_cat] = await connection.query(`select * from sub_category where status=1 and sub_cat_id=?`, [req.session.body.sub_category])
    } else {
       curr_sub_cat = [undefined]
    }
    if (req.session.body && req.session.body.category) {
       [curr_location] = await connection.query(`select * from locations where status=1 and pl_id=?`, [req.session.body.location])
    } else {
       curr_location = [undefined]
    }

    const curr_data = {
      curr_cat: curr_cat[0], curr_sub_cat: curr_sub_cat[0], curr_location: curr_location[0], parent_id: req.session .body?req.session.body.parent_id:undefined
    }

    const page = {
      title: web_projects[0].title,
      cover_url: web_projects[0].cover_url,
      meta_title: web_projects[0].meta_title,
      meta_desc: web_projects[0].meta_desc,
    };
    const projects =  t_projects;
    console.log("curr cat", curr_data);
    res.render("projects", {
      page: page,
      project_location: project_location,
      sub_category: sub_category,
      project_category: project_category,
      projects: projects,
      curr_data: curr_data,
    });
  } catch (error) {
    console.log(error);
    res.render("500", {
      message: error.message,
    });
  }
};

module.exports = {
  searchProjectsDetails,
  renderSearchPage,
  firsrrenderSearchPage
};
