import { useState } from "react";

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  return (
    <div className="space-y-[20px]">
      <h3 className="text-[20px]">Recent Orders</h3>
      {orders.length ? (
        <div>
          {orders.map((order) => (
            <div>{order}</div>
          ))}
        </div>
      ) : (
        <p>No orders yet!</p>
      )}
    </div>
  );
}
