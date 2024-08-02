const connection = require("../../connection");

const getAllHome = async (req, res) => {
  try {
    const [home] = await connection.query(
      `SELECT * FROM web_home where status=1`
    );
    const [slider] = await connection.query(
      `SELECT * FROM web_slider where status=1`
    );
    const [projects] = await connection.query(
      `SELECT * FROM projects where status=1`
    );
    const [testimonials] = await connection.query(
      `SELECT * FROM testimonials where status=1`
    );
    const [awards] = await connection.query(
      `SELECT * FROM  awards where status=1`
    );
    const [associate] = await connection.query(
      `SELECT * FROM associate where status=1`
    );
    const [factFigure] = await connection.query(
      `SELECT * FROM facts_figure where status=1`
    );

    const [sub_category] = await connection.query(
      "SELECT * FROM sub_category where status = 1"
    );

    const [project_category] = await connection.query(
      "select * from project_category WHERE cat_status =1"
    );

    const [project_location] = await connection.query(
      `select * from locations where status >= 0`
    );

    const [blogs] = await connection.query(
      "SELECT blog.*, blog_category.name as blog_category_name FROM blog JOIN blog_category ON JSON_CONTAINS(blog.category_id, CAST(blog_category.category_id AS JSON), '$') where blog.status=1"
    );

    const page = {
      title: home[0].title,
      meta_title: home[0].meta_title,
      meta_desc: home[0].meta_desc,
    };

    res.render("home", {
      page: page,
      home: home,
      sliders: slider,
      projects: projects,
      blogs: blogs,
      testimonials: testimonials,
      awards: awards,
      associate: associate,
      factFigure: factFigure,
      sub_category: sub_category,
      project_category: project_category,
      project_location: project_location,
    });
  } catch (error) {
    res.render("500");
  }
};

module.exports = { getAllHome };
