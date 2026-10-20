import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { formatINR } from "../../utils/formatINR";

function OrdersPage() {
  const { orders, loading } = usePortfolio();

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Orders</h1>
        <p>Your recent order history.</p>
      </div>

      <div className="card">
        <div className="table-scroll-hint">
          <span>⇄ Swipe horizontally to see all columns</span>
        </div>
        <div className="table-responsive">
          <table className="table table-sticky-first">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Instrument</th>
                <th>Product</th>
                <th className="text-right">Qty.</th>
                <th className="text-right">Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                 <tr><td colSpan="7" className="text-center">No orders found.</td></tr>
              ) : (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td className="text-muted">{new Date(order.createdAt).toLocaleString()}</td>
                      <td>
                        <span className={`badge ${order.mode === "BUY" ? "badge-primary" : "badge-danger"}`}>
                          {order.mode}
                        </span>
                      </td>
                      <td>{order.name}</td>
                      <td><span className="badge badge-secondary">CNC</span></td>
                      <td className="text-right">{order.qty}</td>
                      <td className="text-right">{formatINR(order.price)}</td>
                      <td>
                        <span className={`badge ${
                          order.status === "COMPLETE" ? "badge-success" : 
                          order.status === "REJECTED" ? "badge-danger" : 
                          "badge-secondary"
                        }`}>
                          {order.status || "COMPLETE"}
                        </span>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
