
import React from "react";

interface TrackingStep {
  label: string;
  completed: boolean;
  time: string;
}

interface Order {
  id: string;
  trackingSteps: TrackingStep[];
  items: { name: string; quantity: number }[];
}

interface OrderStatusCardProps {
  order: Order;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({ order }) => {
  const currentStepIndex = order.trackingSteps.findIndex(step => !step.completed);
  const isCompleted = currentStepIndex === -1;

  return (
    <div className="border rounded-lg p-4 h-full">
      <h3 className="font-semibold mb-3">Order Status</h3>

      <div className="space-y-1 mb-4">
        <p className="text-sm">Order #{order.id}</p>
        <div className="text-sm">
          <span className="font-medium">Items:</span>{" "}
          {order.items.map((item, i) => (
            <span key={i}>
              {item.quantity}x {item.name}
              {i < order.items.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-6 pl-6">
        {order.trackingSteps.map((step, index) => (
          <div key={index} className="mb-6 relative">
            {/* Status dot */}
            <div
              className={`absolute left-[-24px] top-1 w-4 h-4 rounded-full flex items-center justify-center
              ${step.completed ? 'bg-green-500' : 
                index === currentStepIndex ? 'bg-blue-500 tracking-dot' : 'bg-gray-300'}`}
            >
              {step.completed && (
                <svg className="h-2 w-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            {/* Connecting line */}
            {index < order.trackingSteps.length - 1 && (
              <div 
                className={`absolute left-[-22px] top-5 h-[calc(100%-10px)] w-0.5
                ${step.completed && order.trackingSteps[index + 1].completed ? 'bg-green-500' : 
                  step.completed && index + 1 === currentStepIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
              ></div>
            )}
            
            {/* Step content */}
            <div className={`${index === currentStepIndex ? 'font-semibold text-blue-600' : ''}`}>
              <p className="text-sm">{step.label}</p>
              {step.time && <p className="text-xs text-gray-500 mt-0.5">{step.time}</p>}
            </div>
          </div>
        ))}
        
        {isCompleted && (
          <div className="text-sm text-green-600 font-medium mt-2">
            Order completed successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusCard;
