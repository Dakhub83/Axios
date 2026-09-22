export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  shortDescription: string;
  isWearTested: boolean;
  badgeDescription: string;
  createdAt: string;
  updatedAt: string;
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
};

export type Order = {
  id: string;
  customerName: string;
  email: string;
  address: string;
  total: number;
  status: string;
  createdAt: string;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  quantity: number;
  size: string;
  unitPrice: number;
};

export type OrderWithItems = Order & { items: OrderItem[] };

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
