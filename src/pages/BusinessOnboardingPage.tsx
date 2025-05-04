
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const BusinessOnboardingPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("business-info");

  // Form states
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
    description: "",
  });

  const [ownerInfo, setOwnerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  });

  const [menuItems, setMenuItems] = useState<Array<{
    name: string;
    category: string;
    price: string;
    description: string;
    id: string;
  }>>([]);

  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  // Handle input changes for business info
  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for owner info
  const handleOwnerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwnerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for new menu item
  const handleMenuItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new menu item
  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.category || !newMenuItem.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields for the menu item.",
        variant: "destructive",
      });
      return;
    }

    const newItem = {
      ...newMenuItem,
      id: `item-${Date.now()}`
    };

    setMenuItems((prev) => [...prev, newItem]);
    setNewMenuItem({
      name: "",
      category: "",
      price: "",
      description: "",
    });

    toast({
      title: "Menu Item Added",
      description: `${newMenuItem.name} has been added to your menu.`,
    });
  };

  // Remove a menu item
  const handleRemoveMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter(item => item.id !== id));
    
    toast({
      title: "Menu Item Removed",
      description: "The menu item has been removed.",
    });
  };

  // Handle navigation between steps
  const handleNextStep = () => {
    if (currentStep === "business-info") {
      // Validate business info
      if (!businessInfo.name || !businessInfo.type || !businessInfo.address || !businessInfo.phone || !businessInfo.email) {
        toast({
          title: "Error",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("owner-info");
    } else if (currentStep === "owner-info") {
      // Validate owner info
      if (!ownerInfo.firstName || !ownerInfo.lastName || !ownerInfo.email || !ownerInfo.phone) {
        toast({
          title: "Error",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("menu-setup");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "owner-info") {
      setCurrentStep("business-info");
    } else if (currentStep === "menu-setup") {
      setCurrentStep("owner-info");
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // In a real app, this would send the data to an API
    console.log("Submitting business data:", {
      businessInfo,
      ownerInfo,
      menuItems
    });
    
    // Show success message
    toast({
      title: "Registration Successful!",
      description: "Your business has been registered. You'll be redirected to your dashboard.",
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Business Registration</h1>
          <p className="text-gray-600">Complete the following steps to set up your business on QuickBiteRush.</p>
        </div>

        <Tabs value={currentStep} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="business-info" disabled={currentStep !== "business-info"}>
                Business Information
              </TabsTrigger>
              <TabsTrigger value="owner-info" disabled={currentStep !== "owner-info"}>
                Owner Details
              </TabsTrigger>
              <TabsTrigger value="menu-setup" disabled={currentStep !== "menu-setup"}>
                Menu Setup
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="business-info">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Provide details about your business that customers will see.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your restaurant or business name"
                      value={businessInfo.name}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Business Type *</Label>
                    <Select value={businessInfo.type} onValueChange={(value) => setBusinessInfo(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="cafe">Café</SelectItem>
                        <SelectItem value="bakery">Bakery</SelectItem>
                        <SelectItem value="grocery">Grocery</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Street address"
                    value={businessInfo.address}
                    onChange={handleBusinessInfoChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      value={businessInfo.city}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={businessInfo.zipCode}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Business Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Phone number"
                      value={businessInfo.phone}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email address"
                      value={businessInfo.email}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell customers about your business..."
                    rows={4}
                    value={businessInfo.description}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button onClick={handleNextStep}>
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="owner-info">
            <Card>
              <CardHeader>
                <CardTitle>Owner Information</CardTitle>
                <CardDescription>
                  Provide details of the business owner or primary contact.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={ownerInfo.firstName}
                      onChange={handleOwnerInfoChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      value={ownerInfo.lastName}
                      onChange={handleOwnerInfoChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerEmail">Email *</Label>
                    <Input
                      id="ownerEmail"
                      name="email"
                      type="email"
                      placeholder="Email address"
                      value={ownerInfo.email}
                      onChange={handleOwnerInfoChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Phone *</Label>
                    <Input
                      id="ownerPhone"
                      name="phone"
                      placeholder="Phone number"
                      value={ownerInfo.phone}
                      onChange={handleOwnerInfoChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role in Business *</Label>
                  <Select value={ownerInfo.role} onValueChange={(value) => setOwnerInfo(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="director">Director</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  Back
                </Button>
                <Button onClick={handleNextStep}>
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="menu-setup">
            <Card>
              <CardHeader>
                <CardTitle>Menu Setup</CardTitle>
                <CardDescription>
                  Add your menu items so customers can order from your business.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-4">Add Menu Item</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="itemName">Item Name *</Label>
                        <Input
                          id="itemName"
                          name="name"
                          placeholder="Item name"
                          value={newMenuItem.name}
                          onChange={handleMenuItemChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="itemCategory">Category *</Label>
                        <Select value={newMenuItem.category} onValueChange={(value) => setNewMenuItem(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger id="itemCategory">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="appetizers">Appetizers</SelectItem>
                            <SelectItem value="mains">Main Dishes</SelectItem>
                            <SelectItem value="sides">Side Dishes</SelectItem>
                            <SelectItem value="desserts">Desserts</SelectItem>
                            <SelectItem value="drinks">Beverages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="itemPrice">Price *</Label>
                        <Input
                          id="itemPrice"
                          name="price"
                          placeholder="Price (e.g. 9.99)"
                          value={newMenuItem.price}
                          onChange={handleMenuItemChange}
                        />
                      </div>
                      
                      <div className="space-y-2 md:pt-8">
                        <Button onClick={handleAddMenuItem} className="w-full">
                          Add Item
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="itemDescription">Description</Label>
                      <Textarea
                        id="itemDescription"
                        name="description"
                        placeholder="Item description..."
                        rows={2}
                        value={newMenuItem.description}
                        onChange={handleMenuItemChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Menu Items ({menuItems.length})</h3>
                  {menuItems.length > 0 ? (
                    <div className="space-y-2">
                      {menuItems.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex justify-between items-center border rounded-md p-3 hover:bg-gray-50"
                        >
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{item.name}</h4>
                              <span className="text-sm">${item.price}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Category: {item.category}</p>
                            {item.description && (
                              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveMenuItem(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No menu items added yet.</p>
                      <p className="text-sm text-gray-400 mt-1">Add some items using the form above.</p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-blue-800">
                        You can always add more items or update your menu later from your dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>
                  Complete Registration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BusinessOnboardingPage;
