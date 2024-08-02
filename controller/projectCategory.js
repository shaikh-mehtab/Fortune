const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallproject_category = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from project_category WHERE cat_status >=0"
    );

    if (data && data[0].length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getbyidproject_category = async (req, res) => {
  try {
    const { cat_id } = req.params;
    if (!cat_id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "select * from project_category where cat_id = ?",
      [cat_id]
    );
    if (data[0][0]?.cat_id) {
      return res.json({
        status: true,
        data: data[0],
      });
    } else {
      return res.json({
        status: false,
        message: "failed to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const createproject_category = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      parent_id,
      cat_title,
      cat_meta_title,
      cat_meta_description,
      cat_slug,
      cat_status,
    } = req.body;

    const data = await connection.query(
      "INSERT INTO project_category (parent_id,cat_title,cat_meta_title,cat_meta_description,cat_slug,cat_status,cat_ip) VALUES (?,?, ?, ?, ?, ?,?)",
      [
        parent_id,
        cat_title,
        cat_meta_title,
        cat_meta_description,
        cat_slug,
        cat_status,
        clientIP,
      ]
    );

    res.status(200).json({
      status: true,
      data: data[0],
      ip: clientIP,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const updatebyidproject_category = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { cat_id } = req.params;
    if (!cat_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const {
      parent_id,
      cat_title,
      cat_meta_title,
      cat_meta_description,
      cat_slug,
      cat_status,
    } = req.body;

    const data = await connection.query(
      "update project_category set  parent_id=?,cat_title=?,cat_meta_title=?,cat_meta_description=?,cat_slug=?,cat_status=? where cat_id=?",
      [
        parent_id,
        cat_title,
        cat_meta_title,
        cat_meta_description,
        cat_slug,
        cat_status,
        cat_id,
      ]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        ip: clientIP,
        message: "data update successfully",
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

const deletebyidproject_category = async (req, res) => {
  try {
    const { cat_id } = req.params;
    if (!cat_id) {
      throw new Error("Id not present");
    }

    const data = await connection.query(
      "update project_category set cat_status=-1 WHERE cat_id=?",
      [cat_id]
    );

    if (data[0].affectedRows) {
      return res.json({
        status: true,
        message: " Deleted successfully",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Wrong ID",
      });
    } else {
      return res.json({
        status: false,
        message: "Failed to delete",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      error: error.message,
    });
  }
};

const updatebyidproject_categorystatus = async (req, res) => {
  try {
    const { cat_id } = req.params;
    if (!cat_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update project_category set status=? where cat_id=?",
      [status, cat_id]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        message: "status updated successfully",
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

const getAllParent = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from project_category WHERE parent_id =0 and cat_status >=0"
    );

    if (data && data[0].length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getParentById = async (req, res) => {
  try {
    const { parent_id } = req.params;
    if (!parent_id) {
      throw new Error("Id not present");
    }

    const data = await connection.query(
      "select * from project_category WHERE parent_id=0 and cat_id=? and cat_status >=0",
      [parent_id]
    );

    if (data && data[0].length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  getallproject_category,
  getbyidproject_category,
  createproject_category,
  updatebyidproject_category,
  deletebyidproject_category,
  updatebyidproject_categorystatus,
  getAllParent,
  getParentById,
};
