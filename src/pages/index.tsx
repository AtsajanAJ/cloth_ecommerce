// import MainLayout from "@/components/layouts/MainLayout";
// import React, { useEffect, useState } from "react";
// import { Product } from "@/types/product.type";
// import productService from "@/services/product.service";
// import Image from "next/image";
// import Link from "next/link";

// const HomePage: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const { data } = await productService.fetchProducts();
//         setProducts(data);
//       } catch (err) {
//         setError('Failed to load products');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <MainLayout>
//       <div className="px-40 py-8">
//         <h1 className="text-lg font-bold mb-4">All Products</h1>
//         <div className="grid grid-cols-5 gap-3 mb-4">
//           {products.map((product) => (
//             <Link href={`/product/${product.id}`} key={product.id}>
//               <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
//                 <img src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-md" />
//                 <h2 className="font-bold text-md mt-2">{product.name}</h2>
//                 <p className="text-sm text-gray-500 mt-1">${product.price}</p>
//                 <p className="text-xs text-gray-400 mt-1">by {product.seller.name}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default HomePage;

import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import productService from "@/services/product.service";
import Image from "next/image";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await productService.fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainLayout>
      <div className="px-40 py-8">
        <h1 className="text-lg font-bold mb-4">All Products</h1>
        <div className="grid grid-cols-5 gap-3 mb-4">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <img src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-md" />
                <h2 className="font-bold text-md mt-2">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1">${product.price}</p>
                <p className="text-xs text-gray-400 mt-1">by {product.seller.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;

