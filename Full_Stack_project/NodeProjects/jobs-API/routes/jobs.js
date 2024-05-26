
const express = require("express");
const router = express.Router();

//controller
const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
} = require("../controllers/jobs");

//routes
router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
