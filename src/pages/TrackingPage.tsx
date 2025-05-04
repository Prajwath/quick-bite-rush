
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TrackingMap from "@/components/TrackingMap";
import OrderStatusCard from "@/components/OrderStatusCard";

const TrackingPage = () => {
  const [orderIdToFind, setOrderIdToFind] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  // Mock data for active deliveries
  const activeDeliveries = [
    {
      id: "ORD-1243",
      customer: "John Smith",
      deliveryPerson: "Alex Rodriguez",
      status: "Preparing",
      address: "123 Main St, Anytown",
      estimatedTime: "30-40 mins",
      orderTime: "10 mins ago",
      items: [
        { name: "Veggie Burger", quantity: 1 },
        { name: "French Fries", quantity: 1 },
        { name: "Soda", quantity: 1 }
      ],
      trackingSteps: [
        { label: "Order Received", completed: true, time: "10:15 AM" },
        { label: "Preparing", completed: true, time: "10:20 AM" },
        { label: "Ready for Pickup", completed: false, time: "" },
        { label: "On the Way", completed: false, time: "" },
        { label: "Delivered", completed: false, time: "" }
      ],
      locationData: {
        restaurant: { lat: 40.712776, lng: -74.005974 },
        destination: { lat: 40.712776, lng: -74.015974 },
        courier: { lat: 40.712776, lng: -74.005974 }
      }
    },
    {
      id: "ORD-1242",
      customer: "Emma Johnson",
      deliveryPerson: "Maria Garcia",
      status: "On the Way",
      address: "456 Oak Ave, Somewhere",
      estimatedTime: "10-15 mins",
      orderTime: "25 mins ago",
      items: [
        { name: "Chicken Wings", quantity: 2 }
      ],
      trackingSteps: [
        { label: "Order Received", completed: true, time: "10:00 AM" },
        { label: "Preparing", completed: true, time: "10:05 AM" },
        { label: "Ready for Pickup", completed: true, time: "10:15 AM" },
        { label: "On the Way", completed: true, time: "10:20 AM" },
        { label: "Delivered", completed: false, time: "" }
      ],
      locationData: {
        restaurant: { lat: 40.722776, lng: -74.015974 },
        destination: { lat: 40.732776, lng: -74.025974 },
        courier: { lat: 40.728776, lng: -74.022974 }
      }
    }
  ];

  // Mock data for completed deliveries
  const completedDeliveries = [
    {
      id: "ORD-1241",
      customer: "Michael Brown",
      deliveryPerson: "John Doe",
      status: "Delivered",
      address: "789 Pine Rd, Elsewhere",
      estimatedTime: "Delivered",
      orderTime: "35 mins ago",
      deliveryTime: "15 mins ago",
      items: [
        { name: "Pepperoni Pizza", quantity: 1 },
        { name: "Garlic Bread", quantity: 1 }
      ],
      trackingSteps: [
        { label: "Order Received", completed: true, time: "9:30 AM" },
        { label: "Preparing", completed: true, time: "9:35 AM" },
        { label: "Ready for Pickup", completed: true, time: "9:45 AM" },
        { label: "On the Way", completed: true, time: "9:50 AM" },
        { label: "Delivered", completed: true, time: "10:05 AM" }
      ]
    },
    {
      id: "ORD-1240",
      customer: "Sarah Wilson",
      deliveryPerson: "Carlos Sanchez",
      status: "Delivered",
      address: "101 Elm Blvd, Nowhere",
      estimatedTime: "Delivered",
      orderTime: "1 hour ago",
      deliveryTime: "25 mins ago",
      items: [
        { name: "Caesar Salad", quantity: 1 },
        { name: "Grilled Chicken", quantity: 1 },
        { name: "Iced Tea", quantity: 2 }
      ],
      trackingSteps: [
        { label: "Order Received", completed: true, time: "9:15 AM" },
        { label: "Preparing", completed: true, time: "9:20 AM" },
        { label: "Ready for Pickup", completed: true, time: "9:30 AM" },
        { label: "On the Way", completed: true, time: "9:35 AM" },
        { label: "Delivered", completed: true, time: "9:55 AM" }
      ]
    }
  ];

  // Handle search order by ID
  const handleSearchOrder = () => {
    if (!orderIdToFind.trim()) return;
    
    // In a real app, you would search through your orders
    console.log("Searching for order:", orderIdToFind);
    // Reset the input
    setOrderIdToFind("");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Order Tracking</h1>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter order ID"
              value={orderIdToFind}
              onChange={(e) => setOrderIdToFind(e.target.value)}
              className="w-56"
            />
            <Button onClick={handleSearchOrder}>Find Order</Button>
          </div>
        </div>

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Deliveries</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeDeliveries.map((delivery) => (
              <Card key={delivery.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-xl">{delivery.id} - {delivery.customer}</CardTitle>
                    <span className={`inline-block px-3 py-1 text-xs rounded-full 
                      ${delivery.status === "On the Way" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {delivery.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>Delivery to: {delivery.address}</p>
                    <p>Estimated delivery time: {delivery.estimatedTime}</p>
                    <p>Delivery person: {delivery.deliveryPerson}</p>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <OrderStatusCard order={delivery} />
                    </div>
                    <div className="md:col-span-2 h-80">
                      <TrackingMap locationData={delivery.locationData} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {activeDeliveries.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No active deliveries</h3>
                <p className="text-gray-500">All deliveries have been completed.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedDeliveries.map((delivery) => (
              <Card key={delivery.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-xl">{delivery.id} - {delivery.customer}</CardTitle>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {delivery.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Delivered to: {delivery.address}</p>
                    <p>Ordered: {delivery.orderTime}</p>
                    <p>Delivered: {delivery.deliveryTime}</p>
                    <p>Delivery person: {delivery.deliveryPerson}</p>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Order Items:</h3>
                      <ul className="text-sm text-gray-700">
                        {delivery.items.map((item, index) => (
                          <li key={index}>{item.quantity}x {item.name}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Delivery Timeline:</h3>
                      <div className="relative pl-8">
                        {delivery.trackingSteps.map((step, index) => (
                          <div key={index} className="mb-3 relative">
                            <div className="absolute left-[-24px] top-1 w-4 h-4 bg-green-500 rounded-full"></div>
                            {index < delivery.trackingSteps.length - 1 && (
                              <div className="absolute left-[-22px] top-5 h-full w-0.5 bg-green-300"></div>
                            )}
                            <p className="text-sm font-medium">{step.label}</p>
                            <p className="text-xs text-gray-500">{step.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {completedDeliveries.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No completed deliveries</h3>
                <p className="text-gray-500">Completed deliveries will appear here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TrackingPage;
