// pages/product/[productId].tsx
import { GetServerSideProps } from 'next';
import MainLayout from "@/components/layouts/MainLayout";
import React from "react";
import { Product } from "@/types/product.type";
import productService from "@/services/product.service";
import Image from "next/image";

type ProductDetailPageProps = {
  product: Product;
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  return (
    <MainLayout>
      <div className="px-40 py-8">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <div className="flex">
          <img src={product.imageUrl} alt={product.name} width={400} height={400} className="rounded-md" />
          <div className="ml-8">
            <p className="text-xl font-semibold">${product.price}</p>
            <p className="mt-4">{product.description}</p>
            <p className="mt-4">Category: {product.category}</p>
            <p className="mt-4">Material: {product.material}</p>
            <p className="mt-4">Brand: {product.brand}</p>
            <p className="mt-4">Colors: {product.color.join(', ')}</p>
            <p className="mt-4">Sizes: {product.sizes.join(', ')}</p>
            <p className="mt-4">Seller: {product.seller.name}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.params as { productId: string };
  const product = await productService.fetchProduct(productId);
  return {
    props: {
      product,
    },
  };
};

export default ProductDetailPage;
