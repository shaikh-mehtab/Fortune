const connection = require("../connection");
const { getIP } = require("./clientIP");

const getallproject = async (req, res) => {
  try {
    //  const data = await connection.query(`SELECT p.project_id, p.title AS project_title,p.meta_title AS project_meta_title,p.meta_description AS project_meta_desc,p.description AS project_desc,p.slug AS project_slug,p.cover_url,p.over_view,p.cover_type,p.listing_image,p.dimension,p.specification,p.plans,p.gallery_images,p.short_des,p.brochure,pc.cat_id AS category_id, pa.amenities_id AS amenity_id, pl.pl_id AS project_location_id, po.options_id AS option_id, ps.ps_id AS project_status FROM projects p LEFT JOIN project_category pc ON p.cat_id = pc.cat_id LEFT JOIN project_amenities pa ON p.project_id = pa.project_id LEFT JOIN project_location pl ON p.pl_id = pl.pl_id LEFT JOIN project_options po ON p.project_id = po.project_id LEFT JOIN project_status ps ON p.ps_id = ps.ps_id WHERE status>=0 `);
    const data = await connection.query(
      `SELECT p.project_id, p.title AS project_title,p.meta_title AS project_meta_title,p.meta_description AS project_meta_desc,p.description AS project_desc,p.slug AS project_slug,p.cover_url,p.sub_cat_id as sub_category_id,p.iframe_link,p.latitude, p.rera_id, p.longitude, p.is_latest,p.over_view,p.cover_type,p.listing_image,p.listing_dimension,p.cover_dimension,p.specification,p.plans,p.plans_dimension,p.gallery_images,p.gallery_dimension,p.short_des,p.brochure,pc.cat_id AS category_id, pa_id AS amenities_id, pl.pl_id AS project_location_id, GROUP_CONCAT(DISTINCT po.options_id) AS option_id, ps.ps_id AS project_status,p.status FROM projects p LEFT JOIN project_category pc ON p.cat_id = pc.cat_id LEFT JOIN project_location pl ON p.pl_id = pl.pl_id LEFT JOIN project_options po ON p.project_id = po.project_id LEFT JOIN project_status ps ON p.ps_id = ps.ps_id WHERE p.status>=0 GROUP BY p.project_id, p.title,p.meta_title,p.meta_description,p.description,p.slug,p.cover_url,p.over_view,p.cover_type,p.listing_image,p.cover_dimension,p.specification,p.plans,p.gallery_images,p.short_des,p.brochure,pc.cat_id,pl.pl_id,ps.ps_id `
    );
    if (data[0].length > 0) {
      return res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Record Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getbyidproject = async (req, res) => {
  try {
    const { project_id } = req.params;

    if (!project_id) {
      return res.status(404).json({
        status: false,
        message: " ID not found",
      });
    }

    const data = await connection.query(
      `SELECT p.project_id, p.title AS project_title,p.meta_title AS project_meta_title,p.meta_description AS project_meta_desc,p.description AS project_desc,p.slug AS project_slug,p.cover_url,p.sub_cat_id as sub_category_id,p.iframe_link,p.rera_id, p.latitude, p.longitude, p.is_latest,p.over_view,p.cover_type,p.listing_image,p.listing_dimension,p.cover_dimension,p.specification,p.plans,p.plans_dimension,p.gallery_images,p.gallery_dimension,p.short_des,p.brochure,pc.cat_id AS category_id, pa_id AS amenities_id, pl.pl_id AS project_location_id, GROUP_CONCAT(DISTINCT po.options_id) AS option_id, ps.ps_id AS project_status,p.status FROM projects p LEFT JOIN project_category pc ON p.cat_id = pc.cat_id LEFT JOIN project_location pl ON p.pl_id = pl.pl_id LEFT JOIN project_options po ON p.project_id = po.project_id LEFT JOIN project_status ps ON p.ps_id = ps.ps_id WHERE p.status>=0 and p.project_id=? GROUP BY p.project_id, p.title,p.meta_title,p.meta_description,p.description,p.slug,p.cover_url,p.over_view,p.cover_type,p.listing_image,p.cover_dimension,p.specification,p.plans,p.gallery_images,p.short_des,p.brochure,pc.cat_id,pl.pl_id,ps.ps_id`,
      [project_id]
    );
    if (data[0][0]?.project_id) {
      return res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "failed to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      stattus: false,
      message: error.message,
    });
  }
};

const createproject = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const {
      cat_id,
      pa_id,
      pl_id,
      po_id,
      ps_id,
      sub_category_id,
      iframe_link,
      rera_id,
      project_title,
      project_meta_title,
      project_meta_desc,
      project_desc,
      project_slug,
      cover_url,
      over_view,
      cover_type,
      listing_image,
      specification,
      plans,
      gallery_images,
      short_des,
      brochure,
      is_latest,
      latitude,
      longitude,
      status,
    } = req.body;
    const data = await connection.query(
      `INSERT INTO projects (
      cat_id, pa_id, pl_id, po_id, ps_id, sub_cat_id, iframe_link, rera_id, title, 
      meta_title, meta_description, description, slug, cover_url, over_view, 
      cover_type, listing_image, specification, plans, gallery_images, short_des, 
      brochure, is_latest, longitude, latitude, status, ip
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
      [
        cat_id,
        pa_id,
        pl_id,
        1,
        ps_id,
        sub_category_id,
        iframe_link,
        rera_id,
        project_title,
        project_meta_title,
        project_meta_desc,
        project_desc,
        project_slug,
        cover_url,
        over_view,
        cover_type,
        listing_image,
        specification,
        plans,
        gallery_images,
        short_des,
        brochure,
        is_latest,
        longitude,
        latitude,
        status,
        clientIP,
      ]
    );

    res.status(200).json({
      status: true,
      data: data[0],
      ip: clientIP,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const updatebyidproject = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const { project_id } = req.params;
    if (!project_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const {
      category_id,
      project_title,
      amenities_id,
      option_id,
      project_location_id,
      sub_category_id,
      iframe_link,
      rera_id,
      project_status,
      project_meta_title,
      project_meta_desc,
      project_desc,
      project_slug,
      cover_url,
      over_view,
      cover_type,
      listing_image,
      specification,
      plans,
      gallery_images,
      short_des,
      brochure,
      is_latest,
      latitude,
      longitude,
      status,
    } = req.body;
    const data = await connection.query(
      "update projects set cat_id=?,pa_id=?,pl_id=?,po_id=?,ps_id=?, sub_cat_id=?,iframe_link=?,rera_id=?,title=?,meta_title=?,meta_description=?,description=?,slug=?,cover_url=?,over_view=?,cover_type=?,listing_image=?,specification=?,plans=?,gallery_images=?,short_des=?,brochure=?, is_latest=?, longitude=?, latitude=? ,status=?,ip=? where project_id=?",
      [
        category_id,
        amenities_id,
        project_location_id,
        option_id,
        project_status,
        sub_category_id,
        iframe_link,
        rera_id,
        project_title,
        project_meta_title,
        project_meta_desc,
        project_desc,
        project_slug,
        cover_url,
        over_view,
        cover_type,
        listing_image,
        specification,
        plans,
        gallery_images,
        short_des,
        brochure,
        is_latest,
        longitude,
        latitude,
        status,
        clientIP,
        project_id,
      ]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        ip: clientIP,
        message: "Data update successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        data: data,
        message: "Nothing to change",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      messageL: error.message,
    });
  }
};

const deletebyidproject = async (req, res) => {
  try {
    const { project_id } = req.params;
    if (!project_id) {
      res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "update projects set status=-1 WHERE project_id=? ",
      [project_id]
    );
    if (data[0].affectedRows) {
      res.status(200).json({
        status: true,
        message: "daleted sucessfully",
      });
    } else if (data[0].affectedRows === 0) {
      return res.json({
        status: false,
        message: "Wrong ID",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "failed is deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updatebyidprojectstatus = async (req, res) => {
  try {
    const { project_id } = req.params;
    if (!project_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update projects set status=? where project_id=?",
      [status, project_id]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        message: "status updated successfully",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Wrong ID",
      });
    } else {
      return res.json({
        status: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
module.exports = {
  getallproject,
  getbyidproject,
  createproject,
  updatebyidproject,
  deletebyidproject,
  updatebyidprojectstatus,
};
