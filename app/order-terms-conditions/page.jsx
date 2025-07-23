"use client";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-5xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="pb-4 mb-6 text-3xl font-bold text-gray-900 border-b">
          Terms & Conditions
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Website Usage</h2>
          <p className="mt-2 text-gray-700">
            THESE TERMS AND CONDITIONS APPLY TO THE WEB SITE{" "}
            <span className="font-semibold">www.pizzahut.lk</span>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Privacy Policy</h2>
          <p className="mt-2 text-gray-700">
            Gamma Pizzakraft Lanka Private Limited (hereinafter referred to as
            either, Company, We, Us, or Our) is committed to protecting the
            privacy of personal information you may provide us on this website
            (the site). We believe it is important for you to know how we treat
            your personal information. The terms of this Privacy Policy apply
            to all users of this site. If you do not agree with the terms of
            this Privacy Policy, you should immediately cease the use of this
            site.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Contact Details of the Company
          </h2>
          <address className="mt-2 not-italic text-gray-700">
            Gamma Pizzakraft Lanka (Pvt) Ltd.<br />
            55/25 Vauxhall Lane, Colombo 02<br />
            Head Office Tel. No: +94 117 500600<br />
            Delivery Hotline: +94 112 729729
          </address>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Refund Policy</h2>
          <p className="mt-2 text-gray-700">
            Refund will ONLY be granted for the refund of payment on orders
            placed outside the delivery area of the company and will be
            processed within 14 working days.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Transaction Currency
          </h2>
          <p className="mt-2 text-gray-700">
            All prices are mentioned in Sri Lankan Rupees (Rs.) and you will be
            charged based on the prevailing exchange rate.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Transaction Security
          </h2>
          <p className="mt-2 text-gray-700">
            Your payments are going through a secure payment site operated by
            The Hatton National Bank PLC (HNB). Your card details will be
            securely transmitted to the Bank for transaction authorization
            using SSL 128bit encryption.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Customer's Information
          </h2>
          <p className="mt-2 text-gray-700">
            Company collects personally identifiable information that you may
            voluntarily provide on online forms, which may include your name,
            contact details, email address, postal address, and other online
            activities. Personal information collected on this site can include
            some or all of the following: your name, address, telephone number,
            email addresses, demographic information, and any other information
            you may voluntarily provide. You will have the choice whether or
            not to disclose such personal information in the above activities;
            however, some parts of the site and some services may be more
            difficult or impossible to use if you choose not to disclose
            personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800">Discount Policy</h2>
          <p className="mt-2 text-gray-700">
            Discounts cannot be combined on promotions and/or meal deals. Meal
            deals cannot be combined with each other.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
