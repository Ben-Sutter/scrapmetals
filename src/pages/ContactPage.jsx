import React, { useState } from "react";

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = e.target;
        const formDataObj = new FormData(myForm);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formDataObj).toString(),
        })
            .then(() => setSubmitted(true))
            .catch((error) => alert(error));
    };

    return (
        <section className="fixed inset-0 overflow-hidden">
            <style>{`
        html,body{margin:0;padding:0;}
        @font-face{
          font-family:'CustomFont';
          src:url('/fonts/CloisterBlack.ttf') format('truetype');
        }
        .font-gothic{font-family:'CustomFont',serif;}
        .font-times { font-family: 'Times New Roman', Times, serif; }
      `}</style>

            <img
                src="/images/redBG.jpg"
                alt="Background"
                className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/80 via-black/60 to-black/40 backdrop-blur-md" />

            <div className="flex h-full flex-col items-center justify-center p-0 sm:px-4 sm:py-12">
                <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-lg p-8 shadow-lg">
                    <h1 className="mb-6 font-gothic text-4xl font-bold text-center text-black">
                        Contact&nbsp;Us
                    </h1>

                    {!submitted ? (
                        <form
                            name="contact-form"
                            method="POST"
                            data-netlify="true"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
                            <input type="hidden" name="form-name" value="contact-form" />

                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black"
                            />

                            <textarea
                                name="message"
                                placeholder="Your Message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black"
                                rows="5"
                            />

                            <button
                                type="submit"
                                className="w-full p-4 bg-[#660033] text-white font-semibold rounded-lg hover:bg-[#55002b] transition"
                            >
                                Send Message
                            </button>
                        </form>
                    ) : (
                        <p className="text-center text-lg font-semibold text-black">
                            Thank you for reaching out! We'll get back to you soon.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactPage;