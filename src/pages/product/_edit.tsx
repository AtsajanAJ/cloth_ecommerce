// pages/product/[productId]/edit.tsx
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Product } from '@/types/product.type';
import productService from '@/services/product.service';

type EditProductPageProps = {
  product: Product;
};

const EditProductPage: React.FC<EditProductPageProps> = ({ product }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [sizes, setSizes] = useState(product.sizes);
  const [colors, setColors] = useState(product.color);
  const [imageUrls, setImageUrls] = useState(product.imageUrls);

  const handleSave = async () => {
    const updatedProduct = { ...product, name, price, description, sizes, colors, imageUrls };
    await productService.updateProduct(product.id, updatedProduct);
    // Redirect or show a success message
  };

  return (
    <MainLayout>
      <div className="px-40 py-8 w-full">
        <h1 className="text-lg font-bold mb-4">Edit Product</h1>
        <div className="flex flex-col space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
          <input value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Product Price" type="number" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description"></textarea>
          {/* Add inputs for sizes, colors, and imageUrls as needed */}
          <button onClick={handleSave} className="bg-primary text-primary-foreground">Save</button>
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

export default EditProductPage;
