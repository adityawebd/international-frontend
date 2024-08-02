// services/categoryService.js
export const fetchCategoriesAndProducts = async () => {
    const categoryRes = await fetch("http://localhost:3000/api/category");
    const productRes = await fetch("http://localhost:3000/api/product");
  
    const categories = await categoryRes.json();
    const products = await productRes.json();
  
    return { categories, products };
  };
  