
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrdersPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock order data
  const orders = [
    {
      id: "ORD-1243",
      customer: "John Smith",
      address: "123 Main St, Anytown",
      items: [
        { name: "Veggie Burger", quantity: 1, price: 8.99 },
        { name: "French Fries", quantity: 1, price: 3.99 },
        { name: "Soda", quantity: 1, price: 1.99 }
      ],
      total: 14.97,
      status: "pending",
      time: "10 mins ago",
      estimatedDelivery: "30-40 mins"
    },
    {
      id: "ORD-1242",
      customer: "Emma Johnson",
      address: "456 Oak Ave, Somewhere",
      items: [
        { name: "Chicken Wings", quantity: 2, price: 9.99 }
      ],
      total: 19.98,
      status: "in_progress",
      time: "15 mins ago",
      estimatedDelivery: "15-25 mins"
    },
    {
      id: "ORD-1241",
      customer: "Michael Brown",
      address: "789 Pine Rd, Elsewhere",
      items: [
        { name: "Pepperoni Pizza", quantity: 1, price: 12.99 },
        { name: "Garlic Bread", quantity: 1, price: 4.99 }
      ],
      total: 17.98,
      status: "delivered",
      time: "35 mins ago",
      estimatedDelivery: "Delivered"
    },
    {
      id: "ORD-1240",
      customer: "Sarah Wilson",
      address: "101 Elm Blvd, Nowhere",
      items: [
        { name: "Caesar Salad", quantity: 1, price: 7.99 },
        { name: "Grilled Chicken", quantity: 1, price: 10.99 },
        { name: "Iced Tea", quantity: 2, price: 1.99 }
      ],
      total: 22.96,
      status: "delivered",
      time: "45 mins ago",
      estimatedDelivery: "Delivered"
    },
    {
      id: "ORD-1239",
      customer: "David Lee",
      address: "202 Maple Dr, Anywhere",
      items: [
        { name: "Beef Tacos", quantity: 3, price: 2.99 },
        { name: "Chips & Salsa", quantity: 1, price: 4.99 },
        { name: "Horchata", quantity: 1, price: 2.49 }
      ],
      total: 16.46,
      status: "cancelled",
      time: "1 hour ago",
      estimatedDelivery: "Cancelled"
    }
  ];

  // Filter orders based on status and search query
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in_progress":
        return "In Progress";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <Button>Create New Order</Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <Input
              placeholder="Search orders by ID or customer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="md:w-1/4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:flex-1 flex justify-end">
            <Button variant="outline" className="border-primary text-primary">Export Data</Button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.id} - {order.customer}</CardTitle>
                      <p className="text-sm text-gray-500">{order.address}</p>
                    </div>
                    <span className={`inline-block px-3 py-1 text-xs rounded-full ${getStatusBadgeClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Order Items</h4>
                      <ul className="space-y-1 text-sm">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                          </li>
                        ))}
                        <li className="border-t pt-1 mt-2 font-medium flex justify-between">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Order Timeline</h4>
                      <p className="text-sm">Ordered: {order.time}</p>
                      <p className="text-sm">Estimated delivery: {order.estimatedDelivery}</p>
                    </div>

                    <div className="flex items-end justify-end space-x-2">
                      {order.status === "pending" && (
                        <>
                          <Button size="sm" className="bg-primary text-white">
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-500">
                            Reject
                          </Button>
                        </>
                      )}
                      {order.status === "in_progress" && (
                        <Button size="sm" className="bg-primary text-white">
                          Track Delivery
                        </Button>
                      )}
                      {(order.status === "delivered" || order.status === "cancelled") && (
                        <Button size="sm" variant="outline" className="border-gray-300 text-gray-500">
                          Order Details
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-gray-500">Showing {filteredOrders.length} of {orders.length} orders</p>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-primary/10">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
