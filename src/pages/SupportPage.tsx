
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SupportPage = () => {
  const { toast } = useToast();
  const [ticketType, setTicketType] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketType || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the ticket to an API
    console.log("Submitting support ticket:", { ticketType, subject, message });
    
    toast({
      title: "Support Ticket Submitted",
      description: "We've received your request and will get back to you shortly.",
    });
    
    // Reset form
    setTicketType("");
    setSubject("");
    setMessage("");
  };

  // Mock data for active tickets
  const activeTickets = [
    {
      id: "TCK-2453",
      type: "Delivery Issue",
      subject: "Order #ORD-1236 delayed",
      status: "In Progress",
      created: "2 days ago",
      lastUpdate: "5 hours ago"
    },
    {
      id: "TCK-2451",
      type: "Account Issue",
      subject: "Can't update business profile",
      status: "Awaiting Response",
      created: "3 days ago",
      lastUpdate: "1 day ago"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How can I sign up my business for QuickBiteRush?",
      answer: "To sign up your business, click on the 'Register' button in the top navigation menu. Follow the step-by-step guide to complete your business profile, add your menu items, and set up your delivery preferences."
    },
    {
      question: "How long does it take to deliver an order?",
      answer: "Our platform aims to deliver orders within 30 minutes. The exact delivery time depends on various factors including distance, order complexity, and current demand. You can always check the estimated delivery time for each order in your dashboard."
    },
    {
      question: "How do I track my orders in real-time?",
      answer: "You can track all active orders in real-time by navigating to the 'Tracking' page. Here, you'll see a live map with the location of your delivery personnel and estimated arrival times."
    },
    {
      question: "What happens if an order is late or there's a delivery issue?",
      answer: "If there's an issue with any delivery, you can report it immediately through the 'Support' section. Our team will investigate and resolve the issue as quickly as possible. You can also contact the delivery person directly through the tracking interface."
    },
    {
      question: "How do I manage my menu items and update prices?",
      answer: "You can manage all your menu items from the 'Menu' tab in your dashboard. Here, you can add new items, update prices, mark items as unavailable, and organize your menu categories."
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Support Center</h1>
          <p className="text-gray-600">
            Need help? Submit a support ticket or check out our frequently asked questions below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Submit Ticket Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticketType">Issue Type</Label>
                    <Select value={ticketType} onValueChange={setTicketType}>
                      <SelectTrigger id="ticketType">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delivery_issue">Delivery Issue</SelectItem>
                        <SelectItem value="account_issue">Account Issue</SelectItem>
                        <SelectItem value="payment_issue">Payment Issue</SelectItem>
                        <SelectItem value="feature_request">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your issue"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full md:w-auto">Submit Ticket</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Active Tickets */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Active Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                {activeTickets.length > 0 ? (
                  <div className="space-y-4">
                    {activeTickets.map((ticket) => (
                      <div key={ticket.id} className="p-3 border rounded-md hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{ticket.id}</span>
                          <span className={`text-xs px-2 py-1 rounded-full
                            ${ticket.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium mb-1">{ticket.subject}</h3>
                        <p className="text-xs text-gray-500">{ticket.type} • Created {ticket.created}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-gray-500">Last update: {ticket.lastUpdate}</span>
                          <Button variant="outline" size="sm" className="h-7 text-xs border-primary text-primary">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">No active tickets</p>
                    <p className="text-xs text-gray-400">Submitted tickets will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Need Immediate Assistance?</h2>
            <p className="text-gray-600 mb-6">Our support team is available to help you Monday to Friday, 9am-6pm</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="border bg-white rounded-lg p-4 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-primary mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="font-medium mb-1">Email Us</h3>
                <p className="text-sm text-gray-500">support@quickbiterush.com</p>
              </div>
              
              <div className="border bg-white rounded-lg p-4 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-primary mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 className="font-medium mb-1">Call Us</h3>
                <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
              </div>
              
              <div className="border bg-white rounded-lg p-4 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-primary mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="font-medium mb-1">Live Chat</h3>
                <Button variant="link" className="text-primary p-0 h-auto text-sm">Start a conversation</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
