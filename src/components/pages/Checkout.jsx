import React, { useState } from "react";
import { useCart } from "../../context/CartContext"; // ✅ global cart
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    shippingAddress: "",
    billingAddress: "",
    sameAsShipping: true,
    shippingMethod: "Standard",
    paymentMethod: "COD",
    coupon: "",
    distanceMiles: "", // ✅ distance input field
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e) =>
    setForm({ ...form, sameAsShipping: e.target.checked });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before placing an order.");
      return;
    }

    const shippingCharges = calculateShippingCharges();
    const discount = calculateDiscount();
    const finalTotal = totalPrice + shippingCharges - discount;

    const orderData = {
      form: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        shippingAddress: form.shippingAddress,
        billingAddress: form.sameAsShipping
          ? form.shippingAddress
          : form.billingAddress,
        sameAsShipping: form.sameAsShipping,
        shippingMethod: form.shippingMethod,
        paymentMethod: form.paymentMethod,
        coupon: form.coupon,
        distanceMiles: parseFloat(form.distanceMiles) || 0,
      },
      amounts: {
        shippingCharges: shippingCharges,
        discount: discount,
        subtotal: totalPrice,
        totalAmount: finalTotal,
      },
      cartItems: cartItems,
    };

    try {
      const res = await fetch("http://localhost/api/orders.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const result = await res.json();

      if (res.ok) {
        console.log("Order Response:", result);

        // ✅ Navigate to confirmation page with order data
        navigate("/order-confirmation", { state: { order: result } });
      } else {
        alert("Error placing order: " + result.error);
      }
    } catch (err) {
      console.error("Order placement failed:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  const calculateDiscount = () => {
    if (form.coupon.trim().toLowerCase() === "save10") {
      return Math.floor(totalPrice * 0.1); // 10% discount
    }
    return 0;
  };

  const calculateShippingCharges = () => {
    const fixedDelivery = 300; // Fixed delivery charge
    const miles = parseFloat(form.distanceMiles) || 0;

    let extraCharges = 0;
    if (miles > 9) {
      const extraMiles = Math.ceil(miles - 9);
      extraCharges = extraMiles * 100;
    }

    return fixedDelivery + extraCharges;
  };

  const shippingCharges = calculateShippingCharges();
  const discount = calculateDiscount();
  const finalTotal = totalPrice + shippingCharges - discount;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
      {/* LEFT: CHECKOUT FORM */}
      <div className="space-y-6 border p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Checkout Details
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full border rounded p-3"
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border rounded p-3"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border rounded p-3"
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            className="w-full border rounded p-3"
            name="shippingAddress"
            placeholder="Shipping Address"
            rows={3}
            value={form.shippingAddress}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border rounded p-3"
            type="number"
            min="0"
            name="distanceMiles"
            placeholder="Distance from Warehouse (in miles)"
            value={form.distanceMiles}
            onChange={handleChange}
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.sameAsShipping}
              onChange={handleCheckboxChange}
            />
            <label className="text-gray-700">
              Billing address same as shipping
            </label>
          </div>

          {!form.sameAsShipping && (
            <textarea
              className="w-full border rounded p-3"
              name="billingAddress"
              placeholder="Billing Address"
              rows={3}
              value={form.billingAddress}
              onChange={handleChange}
              required
            />
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Shipping Method
            </label>
            <select
              className="w-full border rounded p-3"
              name="shippingMethod"
              value={form.shippingMethod}
              onChange={handleChange}
            >
              <option value="Standard">Standard Delivery (3-5 days)</option>
              <option value="Express">Express Delivery (1-2 days)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Payment Method
            </label>
            <select
              className="w-full border rounded p-3"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Bank">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Coupon Code
            </label>
            <input
              className="w-full border rounded p-3"
              type="text"
              name="coupon"
              placeholder="Enter coupon (e.g., SAVE10)"
              value={form.coupon}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-3 rounded hover:bg-rose-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* RIGHT: ORDER SUMMARY */}
      <div className="border p-6 rounded shadow space-y-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4 last:border-b-0"
            >
              <img
                src={Array.isArray(item.images) ? item.images[0] : item.image}
                alt={item.title}
                className="w-16 h-16 rounded object-cover border"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm">
                  Qty: {item.quantity} × PKR {item.price}
                </p>
              </div>
              <span className="font-bold text-rose-600">
                PKR {item.price * item.quantity}
              </span>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <>
            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span className="text-gray-800">PKR {totalPrice}</span>
            </div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Shipping Charges</span>
              <span className="text-gray-800">PKR {shippingCharges}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600 text-lg font-semibold">
                <span>Coupon Discount</span>
                <span>- PKR {discount}</span>
              </div>
            )}

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-rose-600">PKR {finalTotal}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
