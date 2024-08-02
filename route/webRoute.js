const express = require("express");
const webRouter = express.Router();
const connection = require("../connection");
const career = require("../controller/web_controller/career.js");
const buyer = require("../controller/web_controller/buyer.js");

const home = require("../controller/web_controller/home.js");
const slider = require("../controller/web_controller/slider.js");
const about = require("../controller/web_controller/about.js");
const blog = require("../controller/web_controller/blog.js");
const contact = require("../controller/web_controller/contact.js");
const projects = require("../controller/web_controller/projects.js");
const faq = require("../controller/web_controller/faqs.js");
const footer = require("../controller/web_controller/footer.js");
const search = require("../controller/web_controller/search.js");
const {
  getProjectDetails,
} = require("../controller/web_controller/project-details.js");

// footer middleware
const middleware = async (req, res, next) => {
  try {
    const [footer] = await connection.execute(
      `select * from web_footer where status=1`
    );
    const [address] = await connection.execute(
      `select * from address where status=1`
    );
    const [store_setting] = await connection.execute(
      `select * from store_setting where status=1`
    );
    const [s_link] = await connection.execute(
      `select * from social_links where status=1`
    );
    const [addresses] = await connection.execute(
      "select * from address where status >= 0"
    );
    const [social] = await connection.execute(
      "select * from social_links where status >=0"
    );
    const footerData = {
      footer: footer,
      address: address,
      store_setting: store_setting,
      s_link: s_link,
    };
    res.locals.footerData = footerData;
    res.locals.addresses = { data: addresses };
    res.locals.social = { data: social };

    next();
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    // You can choose to pass the error to the error handling middleware
    next(error);
  }
};

//Web Api Routes
webRouter.get("/", middleware, home.getAllHome);
webRouter.get("/about", middleware, about.getAllAbout);
webRouter.get("/contact", middleware, contact.getAllContact);
webRouter.get("/project/:slug", middleware, getProjectDetails);
webRouter.get("/projects", middleware,search.firsrrenderSearchPage);
webRouter.get("/blogs", middleware, blog.getAllBlog);
webRouter.get("/blog/:slug", middleware, blog.getBlogBySlug);
webRouter.get("/buyers-guide", middleware, buyer.getAllbuyer);
webRouter.get("/career", middleware, career.getAllCareer);
webRouter.get("/web-slider", slider.getAllSlider);
webRouter.get("/web-home", home.getAllHome);
webRouter.get("/web-slider", slider.getAllSlider);
webRouter.get("/web-blog", blog.getAllBlog);
webRouter.get("/web-career", career.getAllCareer);
webRouter.get("/web-faqs", faq.getAllFaqs);
webRouter.get("/web-footer", footer.getAllFooter);
webRouter.get("/web-blog/:slug", blog.getBlogBySlug);
webRouter.get("/search", middleware, search.renderSearchPage);

module.exports = webRouter;
