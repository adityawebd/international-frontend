// services/categoryService.js
export const fetchCategoriesAndProducts = async () => {
    const categoryRes1 = await fetch("/api/subcategories");
    const categoryRes2 = await fetch("/api/category");

    const productRes = await fetch("/api/product");
  
    const categories = await categoryRes1.json();
    const categori = await categoryRes2.json();
    const products = await productRes.json();
    
  
    return { categories, products,categori };
  };
  