import express from "express";
import {getStaffRequests, confirmStaffRequest, denyStaffRequest, getConfirmedStaff} from "../controller/staffApprovalController.js";
//router object
const router = express.Router()

// Fetch all staff requests
router.get('/staff', getStaffRequests);

// Fetch confirmed staff
router.get("/staff/confirmed", getConfirmedStaff);

// Confirm a staff request
router.put("/staff/confirm/:id", confirmStaffRequest);

// Deny a staff request
router.delete("/staff/deny/:id", denyStaffRequest);

export default router;