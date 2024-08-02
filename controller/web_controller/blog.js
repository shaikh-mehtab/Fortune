const connection = require("../../connection");

const getAllBlog = async (req, res) => {
  try {
    const [web_blog] = await connection.query(
      `select * from web_blog where status =1`
    );
    const [blog] = await connection.query(
      `SELECT blog.*, blog_category.name as blog_category_name FROM blog JOIN blog_category ON JSON_CONTAINS(blog.category_id, CAST(blog_category.category_id AS JSON), '$') where status=1`
    );
    const [blogCategory] = await connection.query(
      `select * from blog_category where cat_status =1`
    );
    const { category } = req.query;

    const [blogData] = await connection.query(
      `SELECT blog.*, blog_category.cat_slug, blog_category.name as blog_category_name FROM blog 
      JOIN blog_category ON JSON_CONTAINS(blog.category_id, CAST(blog_category.category_id AS JSON), '$')
      WHERE blog.status = 1 
      ${category ? "AND blog_category.cat_slug = ?" : ""}`,
      category ? [category] : []
    );

    let curr_cat = category;

    if (blog.length > 0 || web_blog.length > 0 || blogCategory.length > 0) {
      const page = {
        title: web_blog[0].title,
        meta_title: web_blog[0].meta_title,
        meta_desc: web_blog[0].meta_description,
      };
      res.status(200).render("blogs", {
        page: page,
        web_blog: web_blog,
        blogs: blog,
        blogCategory: blogCategory,
        curr_cat: curr_cat,
        blogData: blogData,
      });
    } else {
      res.status(404).json({
        message: "Record Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).render("500", {
      message: error.message,
    });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({
        message: "Slug is required",
      });
    }

    const [data] = await connection.query(
      `SELECT * FROM blog WHERE blog_slug = ?`,
      [slug]
    );

    const [web_blog] = await connection.query(
      `select * from web_blog where status =1`
    );

    const page = {
      title: web_blog[0].title,
      meta_title: web_blog[0].meta_title,
      meta_desc: web_blog[0].meta_description,
    };

    console.log("data", data, slug);

    res.status(200).render("blog", { page: page, data: data });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllBlog,
  getBlogBySlug,
};
