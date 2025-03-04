import React from "react";
import Navbar from "../components/Navbar";

const SubscriptionPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-secondary p-6">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Subscribe to Our Monthly Plan
        </h1>
        <p className="mb-6 text-gray-700">
          Subscribe now to enjoy regular sessions with automatic monthly payments.
        </p>
        {/* Include PayPal SDK with vault and subscription intent */}
        <script
          src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&vault=true&intent=subscription&currency=USD"
          async
        ></script>
        <div id="paypal-subscription-button" className="w-full max-w-sm"></div>
        <script dangerouslySetInnerHTML={{
          __html: `
            paypal.Buttons({
              createSubscription: function(data, actions) {
                return actions.subscription.create({
                  'plan_id': 'YOUR_PLAN_ID'
                });
              },
              onApprove: function(data, actions) {
                alert('Subscription completed! Your Subscription ID is ' + data.subscriptionID);
                // You can redirect or update the UI as needed
              },
              onError: function(err) {
                console.error('Subscription error:', err);
                alert('There was an error processing your subscription. Please try again.');
              }
            }).render('#paypal-subscription-button');
          `
        }} />
      </div>
    </>
  );
};

export default SubscriptionPage;
