const CART_KEY = "cart";
const TTL = 1000 * 60 * 60 * 24; // 24h

export function saveCart(key, items) {
  const now = Date.now();

  const payload = {
    items,
    updatedAt: now,
    expiresAt: now + TTL,
  };

  localStorage.setItem(key, JSON.stringify(payload));
}

export function loadCart(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const cart = JSON.parse(raw);

    if (Date.now() > cart.expiresAt) {
      localStorage.removeItem(key);
      return [];
    }

    return cart.items || [];
  } catch {
    // corrupted storage edge case
    localStorage.removeItem(key);
    return [];
  }
}