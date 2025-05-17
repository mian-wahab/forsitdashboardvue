let mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    sku: 'ELEC-001',
    category: 'Electronics',
    price: 99.99,
    stock: 25,
    monthlySales: 120  // approx. units sold per month
  },
  {
    id: 2,
    name: 'Cotton T-Shirt',
    sku: 'CLOT-001',
    category: 'Clothing',
    price: 19.99,
    stock: 5,
    monthlySales: 60
  },
  {
    id: 3,
    name: 'Gaming Mouse',
    sku: 'ELEC-002',
    category: 'Electronics',
    price: 49.99,
    stock: 0,
    monthlySales: 30
  }
];

export const getAllProducts = async () => {
  await new Promise(res => setTimeout(res, 300));
  return mockProducts;
};

export const updateProductStock = async (id, newStock) => {
  await new Promise(res => setTimeout(res, 200));
  const p = mockProducts.find(x => x.id === id);
  if (!p) throw new Error('Product not found');
  p.stock = newStock;
  return p;
};

export const addProduct = async ({ name, description, price, stock, imageDataUrl, category = 'Uncategorized', monthlySales = 0 }) => {
  await new Promise(res => setTimeout(res, 300))
  const newProduct = {
    id: nextId++,
    name,
    sku: `${category.substring(0,4).toUpperCase()}-${String(nextId).padStart(3,'0')}`,
    category,
    price: Number(price),
    stock: Number(stock),
    monthlySales,
    imageUrl: imageDataUrl
  }
  mockProducts.push(newProduct)
  return newProduct
}
