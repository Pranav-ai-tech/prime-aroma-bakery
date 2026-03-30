export const CATEGORIES = ['All', 'Cakes', 'Pastries', 'Breads']

export const PRODUCTS = [
  {
    id: 1,
    name: 'Classic Chocolate Gateau',
    category: 'Cakes',
    price: 899,
    rating: 4.8,
    reviews: 124,
    badge: 'Bestseller',
    description:
      'A rich, indulgent chocolate gateau layered with silky ganache and dark cocoa sponge. Perfect for celebrations or weekend indulgence.',
    image: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=800&q=80',
    sizes: ['6"', '8"', '10"', '12"'],
    tags: ['chocolate', 'celebration', 'rich'],
  },
  {
    id: 2,
    name: 'Vanilla Dream Torte',
    category: 'Cakes',
    price: 749,
    rating: 4.7,
    reviews: 98,
    badge: 'New',
    description:
      'Delicate vanilla sponge alternating with Madagascar vanilla cream and fresh berry compote — light, airy, and utterly divine.',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80',
    sizes: ['6"', '8"', '10"'],
    tags: ['vanilla', 'light', 'berries'],
  },
  {
    id: 3,
    name: 'Butter Croissant Bundle',
    category: 'Pastries',
    price: 299,
    rating: 4.9,
    reviews: 215,
    badge: 'Bestseller',
    description:
      'Flaky, golden croissants made with European-style butter and slow-fermented dough, baked fresh every morning.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    sizes: ['Pack of 4', 'Pack of 6', 'Pack of 12'],
    tags: ['breakfast', 'buttery', 'flaky'],
  },
  {
    id: 4,
    name: 'Almond Danish Pastry',
    category: 'Pastries',
    price: 349,
    rating: 4.6,
    reviews: 87,
    badge: null,
    description:
      'Traditional Danish pastry filled with almond cream frangipane and topped with toasted sliced almonds — a Scandinavian classic.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    sizes: ['Pack of 4', 'Pack of 6'],
    tags: ['almond', 'danish', 'traditional'],
  },
  {
    id: 5,
    name: 'Sourdough Country Loaf',
    category: 'Breads',
    price: 199,
    rating: 4.9,
    reviews: 302,
    badge: 'Fan Favourite',
    description:
      'A rustic sourdough loaf with a crisp, caramelised crust and an open, chewy crumb — made from a 120-year-old starter.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80',
    sizes: ['Small (400g)', 'Medium (700g)', 'Large (1kg)'],
    tags: ['sourdough', 'artisan', 'rustic'],
  },
  {
    id: 6,
    name: 'Red Velvet Celebration Cake',
    category: 'Cakes',
    price: 999,
    rating: 4.8,
    reviews: 176,
    badge: 'Limited',
    description:
      'Vibrant red velvet layers paired with tangy cream-cheese frosting — a showstopper for every special occasion.',
    image: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=800&q=80',
    sizes: ['6"', '8"', '10"'],
    tags: ['red velvet', 'celebration', 'cream cheese'],
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    role: 'Regular Customer',
    text: 'The sourdough from Prime Aroma is absolutely phenomenal. The crust, the crumb, the flavour — everything is perfect. I order every single week without fail!',
    rating: 5,
    avatar: 'AS',
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    role: 'Birthday Orders',
    text: "Ordered the chocolate gateau for my daughter's birthday and everyone was blown away. The ganache was silky smooth and the presentation was stunning.",
    rating: 5,
    avatar: 'RM',
  },
  {
    id: 3,
    name: 'Priya Nair',
    role: 'Pastry Lover',
    text: 'The butter croissants arrive warm and smell incredible. Prime Aroma brings authentic French bakery quality right to my doorstep in Chennai.',
    rating: 5,
    avatar: 'PN',
  },
]

export const WHY_CHOOSE_US = [
  { icon: '🌾', title: 'Premium Ingredients', desc: 'Sourced from the finest farms and mills, ensuring every bite is pure quality.' },
  { icon: '👨‍🍳', title: 'Master Bakers', desc: 'Trained in European techniques with decades of artisan baking experience.' },
  { icon: '🚚', title: 'Same-Day Delivery', desc: 'Fresh from our ovens to your doorstep within hours, not days.' },
  { icon: '🌿', title: 'No Preservatives', desc: 'All natural, baked fresh daily with zero artificial additives.' },
]

export const DASHBOARD_ORDERS = [
  { key: '1', id: '#ORD-1001', customer: 'Ananya Sharma',    item: 'Chocolate Gateau',    amount: '₹1,798', status: 'Delivered', date: '30 Mar 2026' },
  { key: '2', id: '#ORD-1002', customer: 'Rohan Mehta',      item: 'Croissant Bundle x2', amount: '₹598',   status: 'Baking',    date: '30 Mar 2026' },
  { key: '3', id: '#ORD-1003', customer: 'Priya Nair',       item: 'Sourdough Loaf',      amount: '₹199',   status: 'Pending',   date: '29 Mar 2026' },
  { key: '4', id: '#ORD-1004', customer: 'Kiran Kumar',      item: 'Vanilla Dream Torte', amount: '₹749',   status: 'Delivered', date: '29 Mar 2026' },
  { key: '5', id: '#ORD-1005', customer: 'Divya Reddy',      item: 'Almond Danish x4',    amount: '₹1,396', status: 'Baking',    date: '28 Mar 2026' },
  { key: '6', id: '#ORD-1006', customer: 'Suresh Pillai',    item: 'Red Velvet Cake',     amount: '₹999',   status: 'Delivered', date: '28 Mar 2026' },
  { key: '7', id: '#ORD-1007', customer: 'Meena Krishnan',   item: 'Croissant Bundle',    amount: '₹299',   status: 'Pending',   date: '27 Mar 2026' },
]

export const REVENUE_DATA = [
  { month: 'Oct', revenue: 48000, orders: 120 },
  { month: 'Nov', revenue: 62000, orders: 158 },
  { month: 'Dec', revenue: 89000, orders: 224 },
  { month: 'Jan', revenue: 74000, orders: 185 },
  { month: 'Feb', revenue: 81000, orders: 203 },
  { month: 'Mar', revenue: 96000, orders: 241 },
]
