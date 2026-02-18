export interface CartItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  colorCode: string;
  colorName: string;
  storageCode: string;
  storageName: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export function getCartItemKey(item: Pick<CartItem, "id" | "colorCode" | "storageCode">) {
  return `${item.id}-${item.colorCode}-${item.storageCode}`;
}
