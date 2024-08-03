// services/categoryService.js
export const fetchCategoriesAndProducts = async () => {
    const categoryRes = await fetch("http://internationalgift.in/api/category");
    const productRes = await fetch("http://internationalgift.in/api/product");
  
    const categories = await categoryRes.json();
    const products = await productRes.json();
  
    return { categories, products };
  };
  