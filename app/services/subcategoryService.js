// services/categoryService.js
export const fetchCategoriesAndProducts = async ({product}) => {
    const categoryRes1 = await fetch("/api/subcategories");
    const categoryRes2 = await fetch("/api/category");

    //console.log("product in service 1123 is",product)
    const productRes = await fetch(`/api/productf?properties=${product}`);
  
    const categories = await categoryRes1.json();
    const categori = await categoryRes2.json();
    const products = await productRes.json();
    
  
    return { categories, products,categori };
  };
  