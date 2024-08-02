const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallamenities = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT  * from amenities where amenities_status >=0 "
    );
    if (data[0].length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
        message: "data fetch successfull",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "data not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getbyidamenities = async (req, res) => {
  try {
    const { amenities_id } = req.params;

    if (!amenities_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }
    const data = await connection.query(
      "SELECT * from amenities where amenities_id =?",
      [amenities_id]
    );
    if (data[0][0].amenities_id) {
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
      status: false,
      message: error.message,
    });
  }
};

const createamenities = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const { name, slug, icon, amenities_status, sort_order } = req.body;

    const data = await connection.query(
      "INSERT INTO amenities (name,slug,icon,amenities_status,sort_order,ip) values(?,?,?,?,?,?)",
      [name, slug, icon, amenities_status, sort_order, clientIP]
    );
    res.status(200).json({
      status: true,
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updatebyidamenities = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const { amenities_id } = req.params;

    if (!amenities_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }
    const { name, slug, icon, amenities_status, sort_order } = req.body;

    const data = await connection.query(
      "update amenities set name=?,slug=?,icon=?,amenities_status=?,sort_order=?,ip=? where amenities_id =?",
      [name, slug, icon, amenities_status, sort_order, clientIP, amenities_id]
    );

    if (data[0].changedRows) {
      res.status(200).json({
        status: true,
        message: "data update successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "data not update",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updatebyidamenitiesstatus = async (req, res) => {
  try {
    const { amenities_id } = req.params;
    if (!amenities_id) {
      res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    const { amenities_status } = req.body;
    const data = await connection.query(
      "UPDATE amenities SET amenities_status=? where amenities_id=?",
      [amenities_status, amenities_id]
    );
    if (data[0].changedRows) {
      res.status(404).json({
        status: true,
        message: "status update successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "status not update",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deletebyidamenities = async (req, res) => {
  try {
    const { amenities_id } = req.params;

    if (!amenities_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }
    const data = await connection.query(
      "UPDATE amenities SET status=-1 WHERE amenities_id=?",
      [amenities_id]
    );


    if (data[0].affectedRows == 1) {
      return res.status(200).json({
        status: true,
        message: "deleted successfully",
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Failed to delete",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getallamenities,
  getbyidamenities,
  createamenities,
  updatebyidamenities,
  updatebyidamenitiesstatus,
  deletebyidamenities,
};
