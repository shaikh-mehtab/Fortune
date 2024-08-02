const express = require("express");
const router = express.Router();

const middleware = require("../middleware/auth.js");
const filemanager = require("../controller/filemanager.js");
const address = require("../controller/address.js");
const applicant = require("../controller/applicant.js");
const awards = require("../controller/awards.js");
const blog = require("../controller/blog.js");
const blog_category = require("../controller/blog_category.js");
const buyer = require("../controller/buyer.js");
const associate = require("../controller/associate.js");
const users = require("../controller/users.js");
const testimonial = require("../controller/testimonial.js");
const enquiries = require("../controller/enquiries.js");
const fact_figire = require("../controller/factfigure.js");
const job = require("../controller/job.js");
const management = require("../controller/management.js");
const social = require("../controller/social.js");
const project = require("../controller/projects.js");
const options = require("../controller/options.js");
const status = require("../controller/project_status.js");
const location = require("../controller/project_location.js");
const project_category = require("../controller/projectCategory.js");
const project_amenities = require("../controller/project_amenities.js");
const project_options = require("../controller/projectOptions.js");
const home = require("../controller/home.js");
const slider = require("../controller/slider.js");
const about = require("../controller/web_about.js");
const webBlog = require("../controller/web_blog.js");
const webcareer = require("../controller/web_career.js");
const webcontact = require("../controller/web_contact.js");
const webfaqs = require("../controller/web_faqs.js");
const webfooter = require("../controller/web_footer.js");
const webproject = require("../controller/web_projects.js");
const store_setting = require("../controller/store_setting.js");
const cropperLogic = require("../controller/cropper.js");
const connection = require("../connection.js");
const sub_category = require("../controller/sub_category.js");
const {
  searchProjectsDetails,
} = require("../controller/web_controller/search.js");

const upload = require('multer')()

//authentication
router.post("/register", middleware.register);
router.post("/login", middleware.login);
router.get("/logout", middleware.logout);

//serach
router.post("/search", searchProjectsDetails);

//web_home
router.get("/getallhome", home.getallhome);
router.get("/getbyidhome/:home_id", home.getbyidhome);
router.post("/createhome", home.createhome);
router.put("/updatebyidhome/:home_id?", home.updatebyidhome);
router.put("/updatehome-status/:home_id", home.updatebyidhomestatus);
router.delete("/deletebyidhome/:home_id", home.deletebyidhome);

//web_slider
router.get("/getallslider", slider.getallslider);
router.get("/getbyidslider/:slider_id", slider.getbyidslider);
router.post("/createslider", slider.createslider);
router.put("/updatebyidslider/:slider_id?", slider.updatebyidslider);
router.put("/updateslider-status/:slider_id", slider.updatebyidsliderstatus);
router.delete("/deletebyidslider/:slider_id", slider.deletebyidslider);

//web_about
router.get("/getallabout", about.getallabout);
router.get("/getbyidabout/:id", about.getbyidabout);
router.post("/createabout", about.createabout);
router.put("/updatebyidabout/:id?", about.updatebyidabout);
router.put("/updateabout-status/:id", about.updatebyidaboutstatus);
router.delete("/deletebyidabout/:id", about.deletebyidabout);

//web_blog
router.get("/getallwebblog", webBlog.getallwebBlog);
router.get("/getbyidwebblog/:id", webBlog.getbyidwebBlog);
router.post("/createwebblog", webBlog.createwebBlog);
router.put("/updatebyidwebblog/:id?", webBlog.updatebyidwebBlog);
router.put("/updatewebblog-status/:id", webBlog.updatebyidwebBlogstatus);
router.delete("/deletebyidwebblog/:id", webBlog.deletebyidwebBlog);

//web_career
router.get("/getallcareer", webcareer.getallwebcareer);
router.get("/getbyidcareer/:id", webcareer.getbyidwebcareer);
router.post("/createcareer", webcareer.createwebcareer);
router.put("/updatebyidcareer/:id?", webcareer.updatebyidwebcareer);
router.put("/updatecareer-status/:id", webcareer.updatebyidwebcareerstatus);
router.delete("/deletebyidcareer/:id", webcareer.deletebyidwebcareer);

//web_contact
router.get("/getallcontact", webcontact.getallwebcontact);
router.get("/getbyidcontact/:id", webcontact.getbyidwebcontact);
router.post("/createcontact", webcontact.createwebcontact);
router.put("/updatebyidcontact/:id?", webcontact.updatebyidwebcontact);
router.put("/updatecontact-status/:id", webcontact.updatebyidwebcontactstatus);
router.delete("/deletebyidcontact/:id", webcontact.deletebyidwebcontact);

//web_faqs
router.get("/getallwebfaqs", webfaqs.getallwebfaqs);
router.get("/getbyidwebfaqs/:id", webfaqs.getbyidwebfaqs);
router.post("/createwebfaqs", webfaqs.createwebfaqs);
router.put("/updatebyidwebfaqs/:id?", webfaqs.updatebyidwebfaqs);
router.put("/updatewebfaqs-status/:id", webfaqs.updatebyidwebfaqsstatus);
router.delete("/deletebyidwebfaqs/:id", webfaqs.deletebyidwebfaqs);

//web_footer
router.get("/getallfooter", webfooter.getallwebfooter);
router.get("/getbyidfooter/:id", webfooter.getbyidwebfooter);
router.post("/createfooter", webfooter.createwebfooter);
router.put("/updatebyidfooter/:id?", webfooter.updatebyidwebfooter);
router.put("/updatefooter-status/:id", webfooter.updatebyidwebfooterstatus);
router.delete("/deletebyidfooter/:id", webfooter.deletebyidwebfooter);

//web_project
// router.get('/getallproject',webproject.getallwebproject);
// router.get('/ ',webproject.getbyidwebproject);
// router.post('/createproject',webproject.createwebproject);
// router.put('/updatebyidproject/:id?',webproject.updatebyidwebproject);
// router.put('/updateproject-status/:id',webproject.updatebyidwebprojectstatus);
// router.delete('/deletebyidproject/:id',webproject.deletebyidwebproject);

router.get("/getallsub_category", sub_category.getallsubcategories);
router.get("/getbyidsub_category/:sub_cat_id", sub_category.getbyidsubcategory);
router.post("/createsub_category", sub_category.createsubcategory);
router.put(
  "/updatebyidsub_category/:sub_cat_id",
  sub_category.updatebyidsubcategory
);
router.put(
  "/updatebyidsub_category-status/:sub_cat_id",
  sub_category.updateSubCatstatus
);
router.delete(
  "/deletebyidsub_category/:sub_cat_id",
  sub_category.deletebyidsubcategory
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//address
router.get("/getalladdress", address.getalladdress);
router.get("/getbyidaddress/:address_id", address.getbyidaddress);
router.post("/createaddress", address.createaddress);
router.put("/updatebyidaddress/:address_id?", address.updatebyidaddress);
router.put(
  "/updateaddress-status/:address_id",
  address.updatebyidaddressstatus
);
router.delete("/deletebyidaddress/:address_id", address.deletebyidaddress);

//applicant
router.get("/getallapplicant", applicant.getallapplicant);
router.get("/getbyidapplicant/:applicant_id", applicant.getbyidapplicant);

router.post("/createapplicant", applicant.createapplicant);
router.put(
  "/updatebyidapplicant/:applicant_id?",
  applicant.updatebyidapplicant
);
router.put(
  "/updateapplicant-status/:applicant_id",
  applicant.updatebyidapplicantstatus
);
router.delete(
  "/deletebyidapplicant/:applicant_id",
  applicant.deletebyidapplicant
);

//AWARDS
router.get("/getallawards", awards.getallawards);
router.get("/getbyidawards/:awards_id", awards.getbyidawards);
router.post("/createawards", awards.createawards);
router.put("/updatebyidawards/:awards_id?", awards.updatebyidawards);
router.put("/updateawards-status/:awards_id", awards.updatebyidawardsstatus);
router.delete("/deletebyidawards/:awards_id", awards.deletebyidawards);

//blog
router.get("/getallblog", blog.getallblog);
router.get("/getbyidblog/:blog_id", blog.getbyidblog);
router.post("/createblog", blog.createblog);
router.put("/updatebyidblog/:blog_id?", blog.updatebyidblog);
router.put("/updateblog-status/:blog_id?", blog.updatebyidblogsstatus);
router.delete("/deletebyidblog/:blog_id", blog.deletebyidblog);

//blog_category
router.get("/getallblog_category", blog_category.getallblog_category);
router.get(
  "/getbyidblog_category/:category_id",
  blog_category.getbyidblog_category
);
router.post("/createblog_category", blog_category.createblog_category);
router.put(
  "/updatebyidblog_category/:category_id?",
  blog_category.updatebyidblog_category
);
router.put(
  "/updateblog_category/:category_id?",
  blog_category.updatebyidblog_categorystatus
);
router.delete(
  "/deletebyidblog_category/:category_id",
  blog_category.deletebyidblog_category
);

//buyer_guide
router.get("/getallbuyer", buyer.getallbuyer);
router.get("/getbyidbuyer/:buyer_id", buyer.getbyidbuyer);
router.post("/createbuyer", buyer.createbuyer);
router.put("/updatebyidbuyer/:buyer_id?", buyer.updatebyidbuyer);
router.put("/updatebuyer-status/:buyer_id?", buyer.updatebybuyeridstatus);
router.delete("/deletebyidbuyer/:buyer_id", buyer.deletebyidbuyer);

//associate
router.get("/getallassociate", associate.getallassociate);
router.get("/getbyidassociate/:associate_id", associate.getbyidassociate);
router.post("/createassociate", associate.createassociate);
router.put(
  "/updatebyidassociate/:associate_id?",
  associate.updatebyidassociate
);
router.put(
  "/updateassociate-status/:associate_id?",
  associate.updatebyidassociatestatus
);
router.delete(
  "/deletebyidassociate/:associate_id",
  associate.deletebyidassociate
);

//users
router.get("/getallusers", users.getallusers);
router.get("/getbyidusers/:user_id", users.getbyidusers);
router.post("/createusers", users.createusers);
router.put("/updatebyidusers/:user_id?", users.updatebyidusers);
router.put("/updateuser-status/:user_id?", users.updatebyidassociateuserstatus);
router.delete("/deletebyidusers/:user_id", users.deletebyidusers);

//testimonial
router.get("/getalltestimonial", testimonial.getalltestimonial);
router.get(
  "/getbyidtestimonial/:testimonial_id",
  testimonial.getbyidtestimonial
);
router.post("/createtestimonial", testimonial.createtestimonial);
router.put(
  "/updatebyidtestimonial/:testimonial_id?",
  testimonial.updatebyidtestimonial
);
router.put(
  "/updatebyidtestimonial-status/:testimonial_id?",
  testimonial.updatebyidenquirytestimonialstatus
);
router.delete(
  "/deletebyidtestimonial/:testimonial_id",
  testimonial.deletebyidtestimonial
);

//enquiries
router.get("/getallenquiries", enquiries.getallEnquiry);

router.get("/getbyidenquiries/:enquiry_id", enquiries.getbyidenquiries);
router.post("/createenquiries",upload.none(), enquiries.createenquiries);
router.put("/updatebyidenquiries/:enquiry_id?", enquiries.updatebyidenquiries);
router.put(
  "/updateenquiries-status/:enquiry_id?",
  enquiries.updatebyidenquirystatus
);
router.delete(
  "/deletebyidenquiries/:enquiry_id",
  enquiries.deletebyidenquiries
);

//fact_figure
router.get("/getallfnf", fact_figire.getallfactfigures);
router.get("/getbyidfnf/:fact_figure_id", fact_figire.getbyidfactfigures);
router.post("/createfnf", fact_figire.createfactfigure);
router.put("/updatebyidfnf/:fact_figure_id?", fact_figire.updatebyidfactfigure);
router.put(
  "/updatefnf-status/:fact_figure_id?",
  fact_figire.updatebyidfactfigurestatus
);
router.delete(
  "/deletebyidfnf/:fact_figure_id",
  fact_figire.deletebyidfactfigure
);

//job
router.get("/getalljob", job.getalljob);
router.get("/getbyidjob/:job_id", job.getbyidjob);
router.post("/createjob", job.createjob);
router.put("/updatebyidjob/:job_id", job.updatebyidjob);
router.put("/updatebyidjob-status/:job_id", job.updatebyidjobstatus);
router.delete("/deletebyidjob/:job_id", job.deletebyidjob);

//management
router.get("/getallmanagement", management.getallmanagement);
router.get("/getbyidmanagement/:management_id", management.getbyidmanagement);
router.post("/createmanagement", management.createmanagement);
router.put(
  "/updatebyidmanagement/:management_id?",
  management.updatebyidmanagement
);
router.put(
  "/updatebyidmanagement-status/:management_id",
  management.updatebyidmanagementstatus
);
router.delete(
  "/deletebyidmanagement/:management_id",
  management.deletebyidmanagement
);

//social_links
router.get("/getallsocial", social.getallsocial);
router.get("/getbyidsocial/:social_id", social.getbyidsocial);
router.post("/createsocial", social.createsocial);
router.put("/updatebyidsocial/:social_id", social.updatebyidsocial);
router.put(
  "/updatebyidsocial-status/:social_id",
  social.updatebyidsocialstatus
);
router.delete("/deletebyidsocial/:social_id", social.deletebyidsocial);

//project
router.get("/getallproject", project.getallproject);
router.get("/getbyidproject/:project_id", project.getbyidproject);
router.post("/createproject", project.createproject);
router.put("/update/:project_id", project.updatebyidproject);
router.put("/status/:project_id", project.updatebyidprojectstatus);
router.delete("/projectd/:project_id", project.deletebyidproject);

//options
router.get("/getalloptions", options.getalloptions);
router.get("/getbyidoptions/:options_id", options.getbyidoptions);
router.post("/createoptions", options.createoptions);
router.put("/updatebyidoptions/:options_id", options.updatebyidoptions);
router.put(
  "/updatebyidoptions-status/:options_id",
  options.updatebyidoptionsstatus
);
router.delete("/deletebyidoptions/:options_id", options.deletebyidoptions);

//location
router.get("/get-all-location", location.getAllProjectLocation);
router.post("/createlocation", location.createlocation);
router.get("/getbyid-location/:pl_id", location.getbyidlocation);
router.put("/updatebyid-location/:pl_id", location.updatebyidlocation);
router.delete("/deletebyid-location/:pl_id", location.deletebyidlocation);

//project_status
router.get("/get-all-ps", status.getAllProjectStatus);
router.post("/create-ps", status.createstatus);
router.get("/get-ps/:ps_id", status.getbyidstatus);
router.put("/update-ps/:ps_id", status.updatebyidstatus);
router.delete("/delete-ps/:ps_id", status.deletebyidstatus);

//project
router.get("/getallproject", project.getallproject);
router.get("/getbyidproject/:project_id", project.getbyidproject);
router.post("/createproject", project.createproject);
router.put("/updateProject/:project_id", project.updatebyidproject);
router.put("/statusProject/:project_id", project.updatebyidprojectstatus);
router.delete("/projectdeleted/:project_id", project.deletebyidproject);

//project_category
router.get("/getall-pcat", project_category.getallproject_category);
router.get("/getAllparent", project_category.getAllParent);
router.get("/getparent/:parent_id", project_category.getParentById);
router.get("/getbyid-pcat/:cat_id", project_category.getbyidproject_category);
router.post("/create-pcat", project_category.createproject_category);
router.put("/update-pcat/:cat_id", project_category.updatebyidproject_category);
router.put(
  "/status-pcat/:cat_id",
  project_category.updatebyidproject_categorystatus
);
router.delete(
  "/deleted-pcat/:cat_id",
  project_category.deletebyidproject_category
);

//project_amenities
router.get("/getall-amenities", project_amenities.getallProjectAmenities);
router.get(
  "/getbyid-amenities/:pa_id",
  project_amenities.getbyidproject_amenities
);
//store_setting
router.get("/getallstore_setting", store_setting.getallstore_setting);
router.get(
  "/getbyid-store_setting/:store_id",
  store_setting.getbyidstore_setting
);
router.post("/create-store_setting", store_setting.createstore_setting);
router.put(
  "/update-store_setting/:store_id",
  store_setting.updatebyidstore_setting
);
router.put(
  "/status-store_setting/:store_id",
  store_setting.updatebyidstore_settingstatus
);
router.delete(
  "/delete-store_setting/:store_id",
  store_setting.deletebyidstore_setting
);

router.post("/create-amenities", project_amenities.createproject_amenities);
router.delete(
  "/delete-amenities/:pa_id",
  project_amenities.deletebyidproject_amenities
);
router.put("/update-amenities/:pa_id", project_amenities.updatebyidamenities);

//project-option
router.get("/getall-options", project_options.getAllProjectOption);
router.get("/getbyid-options/:po_id", project_options.getbyidproject_option);
router.post("/create-options", project_options.createproject_option);
router.delete(
  "/delete-options/:po_id",
  project_options.deletebyidproject_option
);
//filemanager
router.get("/get-files/:directory(*)", filemanager.fetchAllFiles);
router.post("/create-directory/:directory(*)", filemanager.createDirectory);
router.post("/upload-file/:directory(*)", filemanager.uploadFile);
router.delete("/delete-directory/:directory(*)", filemanager.deleteDirectory);
router.delete("/delete-all/:directory(*)", filemanager.deleteAll);

//image-cropper
router.get("/transform/:filename(*)", cropperLogic.cropperLogic);

router.get("/test", async (req, res) => {
  const y = await connection.query(
    "select project_id from project_amenities where project_id=7"
  );
  const x = await connection.query(
    `SELECT pa.project_id, JSON_ARRAYAGG( JSON_OBJECT( 'amenities_id', pa.amenities_id, 'amenities_name', a.name ) ) AS amenities FROM amenities AS a JOIN project_amenities AS pa ON pa.amenities_id = a.amenities_id JOIN  WHERE pa.project_id = 3`
  );
  res.json({ data: x[0], scn: y[0] });
});

module.exports = router;
