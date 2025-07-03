import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
const Contact = () => {
  return (
    <section className="bg-white text-gray-800">
      <div className="relative bg-gradient-to-r from-rose-700/80 to-rose-600/80 text-white py-24 md:py-32 mb-12 overflow-hidden">
        {/* Background Image with overlay */}
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
          alt="Contact Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply"
        />

        {/* Overlay content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Have a question, feedback, or just want to chat? Reach out to us —
            we’d love to hear from you!
          </motion.p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-12 md:py-20 px-4 md:px-8">
        <motion.div
          className="flex flex-col items-center text-center border p-6 rounded shadow hover:shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Mail className="text-rose-600 mb-4" size={36} />
          <h3 className="text-xl font-bold mb-2">Email Us</h3>
          <p className="text-gray-700">support@arnawearing.com</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-center border p-6 rounded shadow hover:shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Phone className="text-rose-600 mb-4" size={36} />
          <h3 className="text-xl font-bold mb-2">Call Us</h3>
          <p className="text-gray-700">+92 300 0000000</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-center border p-6 rounded shadow hover:shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <MapPin className="text-rose-600 mb-4" size={36} />
          <h3 className="text-xl font-bold mb-2">Visit Us</h3>
          <p className="text-gray-700">123 Fashion St, Lahore, Pakistan</p>
        </motion.div>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-20 border">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Send Us a Message
        </motion.h2>

        <form className="space-y-8">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              className="block w-full px-4 py-4 text-base bg-transparent border border-gray-300 rounded-lg focus:border-rose-600 focus:ring-2 focus:ring-rose-100 peer placeholder-transparent transition"
              placeholder="Your Name"
              required
            />
            <label className="absolute left-4 top-4 text-gray-500 text-base duration-200 transform -translate-y-5 scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 pointer-events-none">
              Your Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              className="block w-full px-4 py-4 text-base bg-transparent border border-gray-300 rounded-lg focus:border-rose-600 focus:ring-2 focus:ring-rose-100 peer placeholder-transparent transition"
              placeholder="Your Email"
              required
            />
            <label className="absolute left-4 top-4 text-gray-500 text-base duration-200 transform -translate-y-5 scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 pointer-events-none">
              Your Email
            </label>
          </div>

          {/* Phone */}
          <div className="relative">
            <input
              type="tel"
              name="phone"
              className="block w-full px-4 py-4 text-base bg-transparent border border-gray-300 rounded-lg focus:border-rose-600 focus:ring-2 focus:ring-rose-100 peer placeholder-transparent transition"
              placeholder="Phone Number"
            />
            <label className="absolute left-4 top-4 text-gray-500 text-base duration-200 transform -translate-y-5 scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 pointer-events-none">
              Phone Number
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              name="message"
              rows="5"
              className="block w-full px-4 py-4 text-base bg-transparent border border-gray-300 rounded-lg focus:border-rose-600 focus:ring-2 focus:ring-rose-100 peer placeholder-transparent transition"
              placeholder="Your Message"
              required
            ></textarea>
            <label className="absolute left-4 top-4 text-gray-500 text-base duration-200 transform -translate-y-5 scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 pointer-events-none">
              Your Message
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-rose-700 active:scale-95 transition duration-200 ease-in-out shadow-sm"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Google Map Embed */}
      <div className="w-full h-[400px] md:h-[500px]">
        <iframe
          title="Arna Wearing Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27229.804845872504!2d74.3181817!3d31.5203696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919046ec7cfdd3f%3A0x882e8616c0a4693f!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1717768910000"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
