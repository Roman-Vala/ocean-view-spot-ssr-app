import { db, admin } from "./firestoreConn.js";

const COLLECTION = "orders";

// Get order by ID
export async function getOrderById(orderId) {
  const doc = await db.collection(COLLECTION).doc(orderId).get();

  if (!doc.exists) return null;

  return doc.data();
}

// Create order when you create Square checkout
export async function createOrder(order) {
  const now = admin.firestore.FieldValue.serverTimestamp();

  const docRef = db.collection(COLLECTION).doc(order.id);

  await docRef.set({
    ...order,
    status: "PENDING",
    createdAt: now,
    updatedAt: now,
  });

  return order;
}

// Update order status used by webhook
export async function updateOrderStatus(orderId, updates) {
  const docRef = db.collection(COLLECTION).doc(orderId);

  await docRef.update({
    ...updates,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

// module.exports = {
//   getOrderById,
//   createOrder,
//   updateOrderStatus,
// };
