
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DashboardPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for dashboard
  const orderStats = {
    total: 157,
    pending: 12,
    inProgress: 25,
    delivered: 120,
  };

  const recentOrders = [
    { id: "ORD-1243", customer: "John Smith", items: 3, status: "In Progress", time: "10 mins ago" },
    { id: "ORD-1242", customer: "Emma Johnson", items: 1, status: "Pending", time: "15 mins ago" },
    { id: "ORD-1241", customer: "Michael Brown", items: 2, status: "Delivered", time: "35 mins ago" },
    { id: "ORD-1240", customer: "Sarah Wilson", items: 4, status: "Delivered", time: "45 mins ago" },
  ];

  const handleAcceptOrder = (orderId: string) => {
    toast({
      title: "Order Accepted",
      description: `You've accepted order ${orderId}. Assign a delivery person now.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Business Dashboard</h1>
          <Button>Create New Order</Button>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{orderStats.total}</div>
              <p className="text-xs text-gray-500">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{orderStats.pending}</div>
              <p className="text-xs text-muted-foreground">Needs acceptance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{orderStats.inProgress}</div>
              <p className="text-xs text-muted-foreground">Being prepared or delivered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{orderStats.delivered}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
            <TabsTrigger value="menu" className="hidden lg:flex">Menu</TabsTrigger>
            <TabsTrigger value="settings" className="hidden lg:flex">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Monitor and manage your most recent orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Order ID</th>
                        <th className="text-left py-3 px-2">Customer</th>
                        <th className="text-left py-3 px-2">Items</th>
                        <th className="text-left py-3 px-2">Status</th>
                        <th className="text-left py-3 px-2">Time</th>
                        <th className="text-left py-3 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2 font-medium">{order.id}</td>
                          <td className="py-3 px-2">{order.customer}</td>
                          <td className="py-3 px-2">{order.items}</td>
                          <td className="py-3 px-2">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full 
                              ${order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                                order.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                                "bg-yellow-100 text-yellow-800"}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-gray-500">{order.time}</td>
                          <td className="py-3 px-2">
                            {order.status === "Pending" && (
                              <Button 
                                size="sm" 
                                onClick={() => handleAcceptOrder(order.id)}
                                className="bg-primary text-white h-8"
                              >
                                Accept
                              </Button>
                            )}
                            {order.status === "In Progress" && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="h-8 border-primary text-primary"
                              >
                                Track
                              </Button>
                            )}
                            {order.status === "Delivered" && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 border-gray-300 text-gray-500"
                              >
                                Details
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="text-primary border-primary">View All Orders</Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Your delivery performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Average Delivery Time</p>
                    <div className="text-4xl font-bold text-primary">24 min</div>
                    <p className="text-xs text-green-500 mt-2">↓ 2 min from last week</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Personnel</CardTitle>
                  <CardDescription>
                    Currently active delivery personnel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Personnel 1 */}
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-semibold">JD</span>
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-gray-500">5 deliveries today</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-sm text-gray-500">Active</span>
                      </div>
                    </div>

                    {/* Personnel 2 */}
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-semibold">JS</span>
                        </div>
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-xs text-gray-500">3 deliveries today</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-orange-500 mr-2"></span>
                        <span className="text-sm text-gray-500">On delivery</span>
                      </div>
                    </div>

                    {/* Personnel 3 */}
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-semibold">RJ</span>
                        </div>
                        <div>
                          <p className="font-medium">Robert Johnson</p>
                          <p className="text-xs text-gray-500">4 deliveries today</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-sm text-gray-500">Active</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="text-primary border-primary">Manage Personnel</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  View and manage all your orders here
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-10">
                <p className="text-gray-500 mb-4">Detailed order management interface will be displayed here</p>
                <Button disabled>View Details</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deliveries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Management</CardTitle>
                <CardDescription>
                  Manage your delivery personnel and routes
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-10">
                <p className="text-gray-500 mb-4">Detailed delivery management interface will be displayed here</p>
                <Button disabled>View Details</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Menu Management</CardTitle>
                <CardDescription>
                  Update and manage your menu items
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-10">
                <p className="text-gray-500 mb-4">Menu management interface will be displayed here</p>
                <Button disabled>View Details</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Settings</CardTitle>
                <CardDescription>
                  Manage your business profile and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-10">
                <p className="text-gray-500 mb-4">Settings interface will be displayed here</p>
                <Button disabled>View Details</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;
