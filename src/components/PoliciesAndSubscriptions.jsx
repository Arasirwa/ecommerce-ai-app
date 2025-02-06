import React from "react";

const PoliciesAndSubscriptions = () => {
  return (
    <section className="py-10 bg-background-200">
      <div className="container mx-auto px-6 md:px-12">
        {/* Policies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* 7-Day Return Policy */}
          <div className="flex items-center gap-4 bg-white p-5 shadow-md rounded-lg ">
            <div className="text-primary-500 text-3xl">🔄</div>
            <div>
              <h3 className="text-lg font-semibold text-text-900">
                7-Day Return Policy
              </h3>
              <p className="text-sm text-text-600">
                Hassle-free returns within 7 days of purchase.
              </p>
            </div>
          </div>

          {/* Easy Exchange Policy */}
          <div className="flex items-center gap-4 bg-white p-5 shadow-md rounded-lg">
            <div className="text-primary-500 text-3xl">🔁</div>
            <div>
              <h3 className="text-lg font-semibold text-text-900">
                Easy Exchange
              </h3>
              <p className="text-sm text-text-600">
                Get a replacement quickly if your product isn't right.
              </p>
            </div>
          </div>

          {/* Best Customer Service */}
          <div className="flex items-center gap-4 bg-white p-5 shadow-md rounded-lg">
            <div className="text-primary-500 text-3xl">💬</div>
            <div>
              <h3 className="text-lg font-semibold text-text-900">
                Best Customer Service
              </h3>
              <p className="text-sm text-text-600">
                Our support team is here to assist you 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Form (Takes Full Width) */}
        <div className="mt-8 bg-primary-500 text-white p-10 rounded-lg">
          <h3 className="text-2xl font-semibold text-center sm:text-left">
            Stay Updated & Get Exclusive Discounts!
          </h3>
          <p className="text-sm mt-2 text-center sm:text-left">
            Subscribe to our newsletter for the latest deals.
          </p>

          {/* Input Field & Button */}
          <form className="mt-4 flex flex-col sm:flex-row items-center sm:items-stretch gap-4 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-md text-text-900 outline-none"
            />
            <button className="bg-white text-primary-500 px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition w-full sm:w-auto">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PoliciesAndSubscriptions;
