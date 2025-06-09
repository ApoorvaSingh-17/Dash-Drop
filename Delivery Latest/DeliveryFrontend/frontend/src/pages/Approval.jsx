import React, { useState, useEffect } from 'react';
import ApprovalStaffItem from '../components/ApprovalStaffItem.jsx';
import AdminNavbar from '../components/AdminNavbar';
import axios from 'axios';

const AdminOrders = () => {
  const [staffRequests, setStaffRequests] = useState([]); // Pending staff requests
  const [confirmedStaff, setConfirmedStaff] = useState([]); // Confirmed staff list
  const [confirmingId, setConfirmingId] = useState(); // Temporarily hold the ID of a confirming staff

  // Fetch staff requests and confirmed staff on component mount
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const requestResponse = await axios.get('http://localhost:8080/api/approval/staff');
        setStaffRequests(requestResponse.data);

        const confirmedResponse = await axios.get('http://localhost:8080/api/approval/staff/confirmed');
        setConfirmedStaff(confirmedResponse.data);
      } catch (err) {
        console.error('Error fetching staff data:', err);
      }
    };

    fetchStaffData();
  }, []);

  // Handle Confirm button click
  const handleConfirm = async (staffId) => {
    try {
      // Temporarily mark the staff as confirming
      setConfirmingId(staffId);

      // Update the backend
      await axios.put(`http://localhost:8080/api/approval/staff/confirm/${staffId}`);

      // Wait for a short delay before adding to the confirmed list
      setTimeout(() => {
        const confirmedStaffMember = staffRequests.find((staff) => staff._id === staffId);
        setConfirmedStaff((prev) => [...prev, { ...confirmedStaffMember, isStaff: true }]);
        setStaffRequests((prev) => prev.filter((staff) => staff._id !== staffId));
        setConfirmingId(null); // Reset the confirming state
      }, 1500); // Delay of 1.5 seconds
    } catch (error) {
      console.error('Error confirming staff:', error);
    }
  };

  // Handle Deny button click
  const handleDeny = async (staffId) => {
    try {
      await axios.delete(`http://localhost:8080/api/approval/staff/deny/${staffId}`);
      setStaffRequests((prev) => prev.filter((staff) => staff._id !== staffId));
    } catch (error) {
      console.error('Error denying staff:', error);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit format
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-page ">
        {/* Staff Requests Section */}
        <h2>STAFF REQUESTS</h2>
        <div className="approval-table">
          <table className="table table-bordered order-table">
            <thead>
              <tr>
                <th scope="col">Staff-id</th>
                <th scope="col">Staff Username</th>
                <th scope="col">Date</th>
                <th scope="col">Approval</th>
              </tr>
            </thead>
            {staffRequests.map((staff, index) => (
              <ApprovalStaffItem
                key={index}
                number={staff._id}
                user={staff.username}
                date={staff.createdAt}
                isStaff={staff.isStaff || staff._id === confirmingId} // Show confirmed button for confirming staff
                onConfirm={handleConfirm}
                onDeny={handleDeny}
              />
            ))}
          </table>
        </div>

        {/* Confirmed Staff Section */}
        <h2>STAFF LIST</h2>
        <div className="approval-table">
          <table className="table table-bordered order-table">
            <thead>
              <tr>
                <th scope="col">Staff-id</th>
                <th scope="col">Staff Username</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {confirmedStaff.map((staff, index) => (
                <tr key={index}>
                  <th scope="row">{staff._id}</th>
                  <td>{staff.username}</td>
                  <td>{formatDate(staff.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;