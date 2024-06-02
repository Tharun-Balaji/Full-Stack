
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
    /*
 <<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
+    // Destructuring is used to extract the properties from the `req` object
+    // The variables `userId` and `jobId` are extracted from the `user` and `params`
+    // properties of the `req` object respectively.
+    // For example, if the `req` object is { user: { userId: '123' }, params: { id: '456' } },
        +    // then after this line, `userId` will be '123' and `jobId` will be '456'.
*/
    const {
        user: { userId },
        params: { id: jobId },
    } = req;
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId,
    });
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId },
    } = req;
    if (company === "" || position === "") {
        throw new BadRequestError("Company or Position fields cannot be empty");
    }
    const job = await Job.findOneAndUpdate(
        {
            _id: jobId,
            createdBy: userId,
        },
        req.body,
        { new: true, runValidators: true }
    );
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
};

/**
 * Deletes a job from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The user object.
 * @param {string} req.user.userId - The ID of the user.
 * @param {Object} req.params - The parameters object.
 * @param {string} req.params.id - The ID of the job.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the job is deleted.
 * @throws {NotFoundError} - If no job with the given ID is found.
 */
const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }, 
    } = req;
    // console.log(userId, jobId); 
    const job = await Job.findOneAndDelete({
        _id: jobId,
        createdBy: userId,
    });
    // console.log("here")
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).send();
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};