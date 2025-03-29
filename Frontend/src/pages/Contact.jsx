import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_hgnzwlf",
        "template_rqf7lzs",
        templateParams,
        "9xC7IAbySx8lfB4Y6"
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/");
      })
      .catch((err) => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 sm:w-[450px]">
        <h1 className="text-[#15317E] text-center text-4xl font-bold mb-6">Contact Us</h1>
        <form onSubmit={handleContactForm} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[#15317E] focus:ring-[#15317E] focus:ring-1 outline-none transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[#15317E] focus:ring-[#15317E] focus:ring-1 outline-none transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[#15317E] focus:ring-[#15317E] focus:ring-1 outline-none transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[#15317E] focus:ring-[#15317E] focus:ring-1 outline-none transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[#15317E] focus:ring-[#15317E] focus:ring-1 outline-none transition duration-200"
              required
            />
          </div>

          <button
            className="bg-[#15317E] text-white font-semibold text-lg py-3 rounded-md hover:bg-white hover:text-[#15317E] hover:border-[#15317E] border transition-all duration-300"
            type="submit"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
