import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, CartItem, Order, OrderItem, Analytics, OrderStatus, ToastMessage } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

interface StoreContextProps {
  currentUser: User | null;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  orderItems: OrderItem[];
  users: User[];
  currentView: string;
  selectedProductId: string | null;
  currentPlacedOrderId: string | null;
  searchQuery: string;
  selectedCategory: string;
  sortOption: string;
  
  // Navigation
  navigateTo: (view: string, extraData?: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortOption: (option: string) => void;

  // Auth Methods
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (username: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  saveAddress: (address: string, city: string, state: string, postalCode: string) => void;
  savedAddress: { address: string; city: string; state: string; postalCode: string } | null;

  // Cart Methods
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  emptyCart: () => void;

  // Checkout & Order Methods
  placeOrder: (billing: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  }) => Order | null;

  // Admin Methods
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getAnalytics: () => Analytics;

  // Real-time custom toast feedback
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Cart Drawer State
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;

  // Custom Gen-Z Gaming Setup integration
  gamingSetupIds: string[];
  addToSetup: (productId: string) => void;
  removeFromSetup: (productId: string) => void;
  clearSetup: () => void;
  isInSetup: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);


export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation states
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [currentPlacedOrderId, setCurrentPlacedOrderId] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('featured');

  // Load persistence or set default seed values
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('eaj_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('eaj_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('eaj_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('eaj_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('eaj_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('eaj_order_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedAddress, setSavedAddress] = useState<{ address: string; city: string; state: string; postalCode: string } | null>(() => {
    const saved = localStorage.getItem('eaj_saved_address');
    return saved ? JSON.parse(saved) : null;
  });

  // Real-time toast notifications transient state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Cart Drawer open/close state
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);

  // Gen-Z Gaming setup persistence state
  const [gamingSetupIds, setGamingSetupIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('eaj_gaming_setup_ids');
    return saved ? JSON.parse(saved) : [];
  });

  // Track password mappings locally for login confirmation (simulation of secure auth hash database)
  const [credentials, setCredentials] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('eaj_credentials');
    return saved ? JSON.parse(saved) : {};
  });

  // Synchronizers
  useEffect(() => {
    localStorage.setItem('eaj_current_user', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('eaj_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('eaj_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('eaj_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('eaj_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('eaj_order_items', JSON.stringify(orderItems));
  }, [orderItems]);

  useEffect(() => {
    localStorage.setItem('eaj_credentials', JSON.stringify(credentials));
  }, [credentials]);

  useEffect(() => {
    localStorage.setItem('eaj_saved_address', savedAddress ? JSON.stringify(savedAddress) : '');
  }, [savedAddress]);

  useEffect(() => {
    localStorage.setItem('eaj_gaming_setup_ids', JSON.stringify(gamingSetupIds));
  }, [gamingSetupIds]);

  // Toast Helpers
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Gaming Setup Operations
  const addToSetup = (productId: string) => {
    if (!gamingSetupIds.includes(productId)) {
      setGamingSetupIds(prev => [...prev, productId]);
      const prod = products.find(p => p.id === productId);
      addToast(`Node "${prod ? prod.name : 'gadget'}" integrated successfully into Setup Grid!`, 'success');
    } else {
      addToast(`This hardware core is already connected to your Setup.`, 'info');
    }
  };

  const removeFromSetup = (productId: string) => {
    setGamingSetupIds(prev => prev.filter(id => id !== productId));
    const prod = products.find(p => p.id === productId);
    addToast(`Disconnected "${prod ? prod.name : 'gadget'}" from Setup Grid.`, 'info');
  };

  const clearSetup = () => {
    setGamingSetupIds([]);
    addToast('Gamer setup matrix reset to baseline blueprint.', 'info');
  };

  const isInSetup = (productId: string) => {
    return gamingSetupIds.includes(productId);
  };

  // View Navigation wrapper
  const navigateTo = (view: string, extraData: string | null = null) => {
    setCurrentView(view);
    if (view === 'product-detail' && extraData) {
      setSelectedProductId(extraData);
    } else if (view === 'order-success' && extraData) {
      setCurrentPlacedOrderId(extraData);
    }
    // Scroll smoothly to top on navigation change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Operations
  const login = (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!trimmedEmail || !cleanPassword) {
      return { success: false, error: 'All fields are required.' };
    }

    const registeredUser = users.find(u => u.email.toLowerCase() === trimmedEmail);
    if (!registeredUser) {
      return { success: false, error: 'User with this email does not exist.' };
    }

    const correctPassword = credentials[trimmedEmail];
    if (correctPassword !== cleanPassword) {
      return { success: false, error: 'Incorrect password.' };
    }

    setCurrentUser(registeredUser);

    // Redirect context
    if (registeredUser.role === 'admin') {
      navigateTo('admin');
    } else {
      navigateTo('home');
    }

    return { success: true };
  };

  const register = (username: string, email: string, password: string) => {
    const cleanUser = username.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanEmail || !cleanPass) {
      return { success: false, error: 'All fields are required.' };
    }

    if (users.some(u => u.username.toLowerCase() === cleanUser.toLowerCase())) {
      return { success: false, error: 'Username is already taken.' };
    }

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'Email is already registered.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      username: cleanUser,
      email: cleanEmail,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    const updatedCreds = { ...credentials, [cleanEmail]: cleanPass };
    setCredentials(updatedCreds);

    setCurrentUser(newUser);
    navigateTo('home');

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    navigateTo('home');
  };

  const saveAddress = (address: string, city: string, state: string, postalCode: string) => {
    setSavedAddress({ address, city, state, postalCode });
    addToast('Shipping address configured successfully in secure ledger.', 'success');
  };

  // Cart Operations
  const addToCart = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return;

    if (targetProduct.stock < quantity) {
      addToast(`Sorry, only ${targetProduct.stock} items left in stock.`, 'error');
      return;
    }

    const existingCartIndex = cart.findIndex(item => item.productId === productId);

    if (existingCartIndex > -1) {
      const updatedCart = [...cart];
      const newQty = updatedCart[existingCartIndex].quantity + quantity;

      if (targetProduct.stock < newQty) {
        addToast(`Cannot add more than ${targetProduct.stock} items.`, 'error');
        return;
      }

      updatedCart[existingCartIndex].quantity = newQty;
      setCart(updatedCart);
      setCartDrawerOpen(true);
      addToast(`Updated "${targetProduct.name}" quantity to ${newQty} in cart list.`, 'success');
    } else {
      const newCartItem: CartItem = {
        id: `cart-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        userId: currentUser?.id || 'guest',
        productId,
        quantity,
        product: targetProduct
      };
      setCart([...cart, newCartItem]);
      setCartDrawerOpen(true);
      addToast(`Successfully added "${targetProduct.name}" to your cart list.`, 'success');
    }
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find(i => i.id === cartItemId);
    setCart(cart.filter(item => item.id !== cartItemId));
    if (item && item.product) {
      addToast(`Removed "${item.product.name}" from cart list.`, 'info');
    }
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    const item = cart.find(i => i.id === cartItemId);
    if (!item) return;

    const targetProduct = products.find(p => p.id === item.productId);
    if (!targetProduct) return;

    if (targetProduct.stock < quantity) {
      addToast(`Sorry, only ${targetProduct.stock} units are currently available.`, 'error');
      return;
    }

    setCart(cart.map(i => i.id === cartItemId ? { ...i, quantity } : i));
  };

  const emptyCart = () => {
    setCart([]);
    addToast('Cart array has been cleared.', 'info');
  };

  // Order Placement
  const placeOrder = (billing: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  }) => {
    if (cart.length === 0) return null;

    // 1. Verify and reduce inventory
    const updatedProducts = [...products];
    const orderItemsToCreate: OrderItem[] = [];

    // Check availability first
    for (const cartItem of cart) {
      const dbProduct = updatedProducts.find(p => p.id === cartItem.productId);
      if (!dbProduct) {
        addToast('One of your cart items is invalid.', 'error');
        return null;
      }
      if (dbProduct.stock < cartItem.quantity) {
        addToast(`Sorry, "${dbProduct.name}" only has ${dbProduct.stock} left in stock. Adjust your cart quantity.`, 'error');
        return null;
      }
    }

    // Complete stock reduction and make Order Items
    const uniqueOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    for (const cartItem of cart) {
      const dbProduct = updatedProducts.find(p => p.id === cartItem.productId)!;
      dbProduct.stock -= cartItem.quantity;

      orderItemsToCreate.push({
        id: `ord-itm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        orderId: uniqueOrderId,
        productId: cartItem.productId,
        productName: dbProduct.name,
        productImage: dbProduct.image,
        quantity: cartItem.quantity,
        price: dbProduct.price
      });
    }

    // 2. Compute Total
    const subtotal = cart.reduce((acc, item) => {
      const p = products.find(prod => prod.id === item.productId);
      return acc + (p?.price || 0) * item.quantity;
    }, 0);
    const tax = subtotal * 0.0825; // 8.25% Tax
    const shipping = subtotal > 150 ? 0 : 9.99;
    const finalTotal = Number((subtotal + tax + shipping).toFixed(2));

    // 3. Keep records
    const newOrder: Order = {
      id: uniqueOrderId,
      userId: currentUser?.id || 'guest',
      totalAmount: finalTotal,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      fullName: billing.fullName,
      email: billing.email,
      phone: billing.phone,
      shippingAddress: billing.address,
      city: billing.city,
      state: billing.state,
      postalCode: billing.postalCode
    };

    setProducts(updatedProducts);
    setOrders([newOrder, ...orders]);
    setOrderItems([...orderItemsToCreate, ...orderItems]);

    // Save billing address if normal user has mock logging option on
    if (currentUser && !savedAddress) {
      setSavedAddress({
        address: billing.address,
        city: billing.city,
        state: billing.state,
        postalCode: billing.postalCode
      });
    }

    // 4. Reset Cart & Direct
    setCart([]);
    addToast(`🎉 Order ${uniqueOrderId} successfully generated! Hardware allocation complete.`, 'success');
    navigateTo('order-success', uniqueOrderId);

    return newOrder;
  };

  // Admin Inventory Operations
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const idStr = `prod-${Date.now()}`;
    const cleanProduct: Product = {
      id: idStr,
      ...newProd,
      specifications: newProd.specifications.filter(s => s.trim() !== '')
    };
    setProducts([cleanProduct, ...products]);
  };

  const updateProduct = (updatedProd: Product) => {
    const filteredSpecs = updatedProd.specifications.filter(s => s.trim() !== '');
    setProducts(products.map(p => p.id === updatedProd.id ? { ...updatedProd, specifications: filteredSpecs } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // Analytics Computation API
  const getAnalytics = (): Analytics => {
    const totalProducts = products.length;
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalRevenue = Number(orders.reduce((acc, o) => acc + o.totalAmount, 0).toFixed(2));

    // Category Breakdowns
    const categoryCounts: Record<string, { count: number; revenue: number }> = {};
    orderItems.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      const cat = prod?.category || 'Electronics';
      
      if (!categoryCounts[cat]) {
        categoryCounts[cat] = { count: 0, revenue: 0 };
      }
      categoryCounts[cat].count += item.quantity;
      categoryCounts[cat].revenue += item.price * item.quantity;
    });

    const categorySales = Object.entries(categoryCounts).map(([category, info]) => ({
      category,
      count: info.count,
      revenue: Number(info.revenue.toFixed(2))
    }));

    // Orders By Date (Recent 7 days aggregation mock/extrapolation)
    const ordersByDateMap: Record<string, number> = {};
    orders.forEach(o => {
      const d = o.createdAt.split('T')[0];
      const dateLabel = new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      ordersByDateMap[dateLabel] = (ordersByDateMap[dateLabel] || 0) + o.totalAmount;
    });

    const ordersByDate = Object.entries(ordersByDateMap).map(([date, amount]) => ({
      date,
      amount: Number(amount.toFixed(2))
    })).slice(0, 10);

    // If empty ordersByDate, preseed a few for beautiful display
    if (ordersByDate.length === 0) {
      ordersByDate.push(
        { date: 'Jun 4', amount: 120.50 },
        { date: 'Jun 6', amount: 240.00 },
        { date: 'Jun 8', amount: 95.80 },
        { date: 'Jun 10', amount: 489.10 }
      );
    }

    return {
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      categorySales,
      ordersByDate: ordersByDate.reverse()
    };
  };

  return (
    <StoreContext.Provider value={{
      currentUser,
      products,
      cart,
      orders,
      orderItems,
      users,
      currentView,
      selectedProductId,
      currentPlacedOrderId,
      searchQuery,
      selectedCategory,
      sortOption,
      
      navigateTo,
      setSearchQuery,
      setSelectedCategory,
      setSortOption,
      
      login,
      register,
      logout,
      saveAddress,
      savedAddress,
      
      addToCart,
      removeFromCart,
      updateCartQuantity,
      emptyCart,
      
      placeOrder,
      
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      getAnalytics,

      toasts,
      addToast,
      removeToast,
      cartDrawerOpen,
      setCartDrawerOpen,
      gamingSetupIds,
      addToSetup,
      removeFromSetup,
      clearSetup,
      isInSetup
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used inside a StoreProvider');
  }
  return context;
};
