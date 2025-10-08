// Firebase cart management
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  getDoc
} from 'firebase/firestore';
import { db } from './firebase';

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  images: string[];
  sellerId?: string;
  // Add other product fields as needed
}

export interface CartItemWithProduct extends CartItem {
  product: Product | null;
}

export const cart = {
  // Add item to cart
  async addItem(userId: string, productId: string, quantity = 1, variantId?: string) {
    try {
      // Check if item already exists
      const cartQuery = query(
        collection(db, 'cartItems'),
        where('userId', '==', userId),
        where('productId', '==', productId),
        ...(variantId ? [where('variantId', '==', variantId)] : [where('variantId', '==', null)])
      );
      
      const existingItems = await getDocs(cartQuery);
      
      if (!existingItems.empty) {
        // Update quantity
        const existingItem = existingItems.docs[0];
        const currentQuantity = existingItem.data().quantity;
        
        await updateDoc(doc(db, 'cartItems', existingItem.id), {
          quantity: currentQuantity + quantity,
          updatedAt: new Date()
        });
        
        return { id: existingItem.id, ...existingItem.data() };
      } else {
        // Add new item
        const newItem = {
          userId,
          productId,
          variantId: variantId || null,
          quantity,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const docRef = await addDoc(collection(db, 'cartItems'), newItem);
        return { id: docRef.id, ...newItem };
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Update item quantity
  async updateQuantity(userId: string, itemId: string, quantity: number) {
    try {
      if (quantity <= 0) {
        return this.removeItem(userId, itemId);
      }

      await updateDoc(doc(db, 'cartItems', itemId), {
        quantity,
        updatedAt: new Date()
      });

      const updatedDoc = await getDoc(doc(db, 'cartItems', itemId));
      return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      throw error;
    }
  },

  // Remove item from cart
  async removeItem(userId: string, itemId: string) {
    try {
      await deleteDoc(doc(db, 'cartItems', itemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Get cart items
  async getItems(userId: string): Promise<CartItemWithProduct[]> {
    try {
      const cartQuery = query(
        collection(db, 'cartItems'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const cartSnapshot = await getDocs(cartQuery);
      const cartItems: CartItemWithProduct[] = [];
      
      for (const cartDoc of cartSnapshot.docs) {
        const cartData = cartDoc.data();
        
        // Get product details
        let product: Product | null = null;
        try {
          const productDoc = await getDoc(doc(db, 'products', cartData.productId));
          if (productDoc.exists()) {
            product = { id: productDoc.id, ...productDoc.data() } as Product;
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
        
        cartItems.push({
          id: cartDoc.id,
          ...cartData,
          createdAt: cartData.createdAt?.toDate ? cartData.createdAt.toDate() : new Date(cartData.createdAt),
          updatedAt: cartData.updatedAt?.toDate ? cartData.updatedAt.toDate() : new Date(cartData.updatedAt),
          product
        } as CartItemWithProduct);
      }
      
      return cartItems;
    } catch (error) {
      console.error('Error getting cart items:', error);
      return [];
    }
  },

  // Clear cart
  async clearCart(userId: string) {
    try {
      const cartQuery = query(
        collection(db, 'cartItems'),
        where('userId', '==', userId)
      );
      
      const cartSnapshot = await getDocs(cartQuery);
      
      const deletePromises = cartSnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Get cart summary
  async getCartSummary(userId: string) {
    try {
      const items = await this.getItems(userId);
      
      const subtotal = items.reduce((sum, item) => {
        return sum + (item.product?.price || 0) * item.quantity;
      }, 0);

      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items,
        itemCount,
        subtotal,
        tax: subtotal * 0.075, // 7.5% VAT
        shipping: subtotal > 50000 ? 0 : 2500, // Free shipping over ₦50,000
        total: subtotal + (subtotal * 0.075) + (subtotal > 50000 ? 0 : 2500)
      };
    } catch (error) {
      console.error('Error getting cart summary:', error);
      return {
        items: [],
        itemCount: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0
      };
    }
  }
};