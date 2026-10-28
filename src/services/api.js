const BASE_URL = "https://dummyjson.com";

async function request(url) {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error("Something went wrong while loading the products.");
  }

  return response.json();
}

export function getProducts(limit = 12, skip = 0) {
  return request(`/products?limit=${limit}&skip=${skip}`);
}

export function getCategories() {
  return request("/products/categories");
}

export function getCategoryProducts(category, limit = 12, skip = 0) {
  return request(
    `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
  );
}

export function getProduct(id) {
  return request(`/products/${id}`);
}

export function searchProducts(query, limit = 12, skip = 0) {
  return request(
    `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  );
}