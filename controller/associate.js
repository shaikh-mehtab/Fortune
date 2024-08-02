const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallassociate = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from associate where status >=0 "
    );

    if (data && data[0].length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
        message: "get all post",
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

const getbyidassociate = async (req, res) => {
  try {
    const { associate_id } = req.params;
    if (!associate_id) {
      res.status(404).json({
        status: false,
        meaase: "ID not found",
      });
    }

    const data = await connection.query(
      "select * from associate where associate_id = ?",
      [associate_id]
    );
    if (data[0][0]?.associate_id) {
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

const createassociate = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const { name, link, logo, sort_order, status, ip } = req.body;
    const data = await connection.query(
      "INSERT INTO associate (name,link,logo,sort_order,status,ip) VALUES (?, ?, ?, ?, ?,?)",
      [name, link, logo, sort_order, status, clientIP]
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

const updatebyidassociate = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const { associate_id } = req.params;
    if (!associate_id) {
      res.status(404).json({
        status: false,
        meaase: "ID not found",
      });
    }

    const { name, link, logo, sort_order, status } = req.body;

    const data = await connection.query(
      "update associate set name=?,link=?,logo=?,sort_order=?,status=?,ip=?  where associate_id=?",
      [name, link, logo, sort_order, status, clientIP, associate_id]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        data: data[0],
        ip: clientIP,
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Nothing to update",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const deletebyidassociate = async (req, res) => {
  try {
    const { associate_id } = req.params;
    if (!associate_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const data = await connection.query(
      "UPDATE associate SET status=-1 WHERE associate_id=?",
      [associate_id]
    );

    if (data[0].affectedRows == 1) {
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

const updatebyidassociatestatus = async (req, res) => {
  const { associate_id } = req.params;
  if (!associate_id) {
    res.status(200).json({
      status: false,
      message: "ID not found",
    });
  }
  const { status } = req.body;
  const data = await connection.query(
    "UPDATE associate set status=? where associate_id = ?",
    [status, associate_id]
  );
  if (data[0].changedRows) {
    res.status(200).json({
      status: true,
      message: "UPDATE data successsfully",
    });
  } else if (data[0].affectedRows === 0) {
    return res.status(404).json({
      status: false,
      message: "Wrong ID",
    });
  } else {
    res.status(404).json({
      status: false,
      message: "failed to update",
    });
  }
};

module.exports = {
  getallassociate,
  getbyidassociate,
  createassociate,
  updatebyidassociate,
  deletebyidassociate,
  updatebyidassociatestatus,
};
