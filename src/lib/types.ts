export type ProductAttributes = Record<string, string | number | boolean>;

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryId: string | null;
  price: number;
  shortDescription: string;
  isWearTested: boolean;
  badgeDescription: string;
  attributes: ProductAttributes;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  createdAt: string;
};

export type ProductVariant = {
  id: string;
  productId: string;
  color: string;
  size: string;
  sku: string;
  inventoryCount: number;
  priceOverride: number | null;
  createdAt: string;
};

export type ProductImage = {
  id: string;
  productId: string;
  url: string;
  altText: string;
  position: number;
};

export type ProductSpec = {
  id: string;
  productId: string;
  label: string;
  value: string;
  position: number;
};

export type ProductSizeRow = {
  id: string;
  productId: string;
  size: string;
  waist: string;
  hip: string;
  inseam: string;
  fitNote: string;
  position: number;
};

export type ProductWithDetails = Product & {
  images: ProductImage[];
  specs: ProductSpec[];
  sizeRows: ProductSizeRow[];
  variants: ProductVariant[];
};

// Intended status vocabulary for `Order.status`. Not yet enforced at the DB
// level (existing rows predate this and use 'test_order') — see PR notes.
export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "refunded" | "test_order";

export type Order = {
  id: string;
  userId: string | null;
  customerName: string;
  email: string;
  address: string;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discountTotal: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  variantId: string | null;
  quantity: number;
  size: string;
  unitPrice: number;
};

export type OrderWithItems = Order & { items: OrderItem[] };

export type PaymentTransactionStatus = "pending" | "succeeded" | "failed" | "refunded";

export type PaymentTransaction = {
  id: string;
  orderId: string;
  gateway: string;
  transactionRef: string | null;
  amount: number;
  status: PaymentTransactionStatus;
  createdAt: string;
};

export type User = {
  id: string;
  email: string;
  // Callers must supply an already-hashed password (e.g. bcrypt/argon2).
  // This layer never hashes or verifies passwords itself.
  passwordHash: string;
  fullName: string;
  phone: string;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserAddress = {
  id: string;
  userId: string;
  label: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  createdAt: string;
};

// Self-reported sizing data for the "Fit Finder" feature — not biometric
// identifiers (fingerprint/face/body-scan data), which carry separate legal
// protections this schema doesn't attempt to handle.
export type UserFitProfile = {
  id: string;
  userId: string;
  heightCm: number | null;
  weightKg: number | null;
  preferredFit: string;
  measurements: Record<string, string | number>;
  updatedAt: string;
};

export type TeamOrderInquiry = {
  id: string;
  organization: string;
  contactName: string;
  email: string;
  phone: string;
  sport: string;
  rosterSize: string;
  targetDate: string;
  currentSupplier: string;
  message: string;
  createdAt: string;
};

export type WearTestEntry = {
  id: string;
  testerName: string;
  itemType: string;
  fabricBlend: string;
  washCount: number;
  checkpoint: string;
  dateTested: string;
  comfortRating: number;
  performanceNotes: string;
  passFail: string;
  createdAt: string;
};

export type CartLine = {
  productId: string;
  slug: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  imageUrl: string | null;
};
