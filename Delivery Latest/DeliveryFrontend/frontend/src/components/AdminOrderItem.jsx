import React from 'react'

const AdminOrderItem = (props) => {
  return (
   <>
  
  
  <tbody>
    <tr>
      <th scope="row">{props.number}</th>
      <td>{props.user}</td>
      <td>Rs {props.total}</td>
      <td>{props.date}</td>
      <td><button type="button" class="btn btn-success">Confirm</button></td>
    </tr>
    
  </tbody>

   </>
  )
}

export default AdminOrderItem