import { GetServerSideProps } from 'next';
import MainLayout from "@/components/layouts/MainLayout";
import React, { useState } from "react";
import { Product, UpdateProductDTO } from "@/types/product.type";
import productService from "@/services/product.service";
import { useRouter } from 'next/router';

type EditProductPageProps = {
  product: Product;
};

const EditProductPage: React.FC<EditProductPageProps> = ({ product }) => {
  const [form, setForm] = useState<UpdateProductDTO>({
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    imageUrls: product.imageUrls,
    sizes: product.sizes,
    color: product.color,
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await productService.updateProduct(product.id, form);
    router.push(`/product/${product.id}`);
  };

  return (
    <MainLayout>
      <div className="px-40 py-8 w-full">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save
          </button>
        </form>
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

export default EditProductPage;
