export const dummyOrders = [
  {
    id: 1,
    customer: {
      name: "Ali Khan",
      email: "ali@example.com",
      phone: "0312-1234567",
    },
    billingAddress: "Apartment 45-B, Gulberg III, Lahore",
    shippingAddress: "House 12-C, Gulshan Ravi, Lahore",
    totalAmount: 13480,
    subtotal: 14480,
    discount: 1000,
    shippingCharges: 500,
    paymentStatus: "Unpaid",
    status: "Pending",
    createdAt: "2025-06-28",
    items: [
      { id: 1, title: "Summer Lawn Deluxe", sku: "SLD-001", quantity: 2, price: 4990 },
      { id: 2, title: "Festive Lawn 3pc", sku: "FL3-002", quantity: 1, price: 2500 },
    ],
    history: [
      { date: "2025-06-28", status: "Order Placed" },
      { date: "2025-06-29", status: "Pending Payment" },
    ],
  },
  {
    id: 2,
    customer: {
      name: "Fatima Ahmed",
      email: "fatima@example.com",
      phone: "0321-9876543",
    },
    billingAddress: "Flat 101, Clifton Block 5, Karachi",
    shippingAddress: "Flat 101, Clifton Block 5, Karachi",
    totalAmount: 6990,
    subtotal: 6990,
    discount: 0,
    shippingCharges: 0,
    paymentStatus: "Paid",
    status: "Completed",
    createdAt: "2025-06-27",
    items: [
      { id: 3, title: "Chiffon Kurti", sku: "CK-003", quantity: 1, price: 6990 },
    ],
    history: [
      { date: "2025-06-27", status: "Order Placed" },
      { date: "2025-06-27", status: "Payment Received" },
      { date: "2025-06-28", status: "Order Shipped" },
      { date: "2025-06-29", status: "Order Delivered" },
    ],
  },
];
