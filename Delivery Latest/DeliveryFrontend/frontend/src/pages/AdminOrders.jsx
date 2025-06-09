import React from 'react'
import AdminOrderItem from '../components/AdminOrderItem'
import { orders } from '../data'
import AdminNavbar from '../components/AdminNavbar'
const AdminOrders = () => {
  return (
    <>
    <AdminNavbar/>
      <div className='imageHome admin-table'>
        <table className="table table-bordered order-table">
          <thead>
            <tr>
              <th scope="col">Parcel-id </th>
              <th scope="col">User</th>
              <th scope="col">Total amount</th>
              <th scope="col">Date</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          {
            orders.map((order, index) => (
              <AdminOrderItem
                key={index}
                number={order.id}
                user={order.username}
                total={order.total}
                date={order.orderDate}
              />))}
        </table>
      </div>



    </>
  )
}

export default AdminOrders