import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import productService from "@/services/product.service";
import Image from "next/image";

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
        <div>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {products.map((product) => (
              <div key={product.id} className="border p-4">
                <img src={product.imageUrl} alt={product.name} width={200} height={200} />
                <h2 className="font-bold">{product.name}</h2>
                <p>${product.price}</p>
                {/* Add more product details here */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
