// services/categoryService.js
export const fetchCategoriesAndProducts = async () => {
    const categoryRes = await fetch("/api/category");
    const productRes = await fetch("/api/product");
  
    const categories = await categoryRes.json();
    const products = await productRes.json();
  
    return { categories, products };
  };
  