import React from 'react'

const ApprovalStaffItem = ({ number, user, date, isStaff,  onConfirm, onDeny }) => {
  // Function to format the date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit format
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
 
  return (
   <>

  <tbody>
    <tr>
      <th scope="row">{number}</th>
      <td>{user}</td>
      
      <td>{formatDate(date)}</td>
      <td>
      {isStaff ? (
              <button type="button" className="btn btn-success" disabled>
                Confirmed
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ marginRight: '10px' }}
                  onClick={() => onConfirm(number)} // Call the onConfirm handler
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDeny(number)} // Call the onDeny handler
                >
                  Deny
                </button>
              </>
            )}
      </td>
       
    </tr>
    
  </tbody>

   </>
  )
}

export default ApprovalStaffItem