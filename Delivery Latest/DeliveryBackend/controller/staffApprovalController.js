import User from "../models/user.js";

export  const getStaffRequests = async (req, res) => {
    try {
        // Fetch all users with staffRequest set to true
        const staffRequests = await User.find({ staffRequest: true }).select(
            "_id username createdAt"
        ); // Only send specific fields to the frontend

        res.status(200).json(staffRequests);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch staff requests", error });
    }
};

// Confirm a staff request
export const confirmStaffRequest = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(
        id,
        { isStaff: true, role: "Staff", staffRequest: false },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Staff request confirmed", user });
    } catch (error) {
      res.status(500).json({ message: "Failed to confirm staff request", error });
    }
  };

  // Deny a staff request
export const denyStaffRequest = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Fetch updated list of staff requests
      const remainingStaffRequests = await User.find({ staffRequest: true }).select(
        "_id username createdAt"
      );
  
      res.status(200).json(remainingStaffRequests);
    } catch (error) {
      res.status(500).json({ message: "Failed to deny staff request", error });
    }
  };

  // Fetch all confirmed staff
export const getConfirmedStaff = async (req, res) => {
    try {
      const confirmedStaff = await User.find({ isStaff: true }).select(
        "_id username createdAt"
      );
      res.status(200).json(confirmedStaff);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch confirmed staff", error });
    }
  };
  

