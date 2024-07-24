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
    category: product.category,
    description: product.description,
    price: product.price,
    color: product.color,
    sizes: product.sizes,
    imageUrl: product.imageUrl,
    imageUrls: product.imageUrls,
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productService.updateProduct(product.id, form);
      router.push(`/product/${product.id}`);
    } catch (error) {
      console.error('Error updating product:', error);
      // Handle error state or notification to user
    }
  };

  return (
    <MainLayout>
      <div className='px-40 py-8'>
        <nav className="font-bold text-lg py-2 mb-2" aria-label="Breadcrumbs">
          <ol className="flex flex-wrap list-none rounded-small">
            <li className="flex items-center">
              <a className="text-gray-400 hover:opacity-80 transition-opacity no-underline" href="/">Products</a>
              <span aria-hidden="true" className="px-1 text-foreground/50">
                <svg aria-hidden="true" fill="none" height="1em" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="1em">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </span>
            </li>
            <li className="flex items-center">
              <a className="text-gray-400 hover:opacity-80 transition-opacity no-underline" href="/">{product.name}</a>
              <span aria-hidden="true" className="px-1 text-foreground/50">
                <svg aria-hidden="true" fill="none" height="1em" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="1em">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </span>
            </li>
            <li className="flex items-center">
              <span className="text-foreground cursor-default transition-opacity" aria-disabled="true" aria-current="page">Edit</span>
            </li>
          </ol>
        </nav>
        <div className="my-4">
          <hr className="shrink-0 bg-divider border-none w-full h-divider" role='separator' />
        </div>
        <div className='flex space-x-2'>
          <div className="w-[40%]">
            <div className="flex flex-col items-start pb-2 space-y-4">
              <div>
                <p className="text-sm mb-2">Image</p>
                <div className="relative">
                  <label>
                    <div className="cursor-pointer">
                      <div className="flex items-center justify-center border border-dashed hover:border-primary min-w-12 max-w-52 aspect-square transition-all">
                        <div className="p-2">
                          <img src={product.imageUrl} alt="preview-upload" className="w-full"/>
                        </div>
                      </div>
                    </div>
                    <input type="file" hidden accept="image/*"/>
                  </label>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Gallery</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <label>
                      <div className="cursor-pointer">
                        <div className="flex items-center justify-center border border-dashed hover:border-primary min-w-12 max-w-52 aspect-square transition-all">
                          <div className="p-2">
                            <p className="text-sm text-gray-400">Select images</p>
                          </div>
                        </div>
                      </div>
                      <input type="file" hidden accept="image/*" multiple/>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[60%]'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col items-center pb-2 space-y-4'>
                <div className="group w-full">
                  <label htmlFor="name" className="text-sm mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Product name"
                  />
                </div>
                <div className="group w-full">
                  <label htmlFor="description" className="text-sm mb-2">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Product description"
                    rows={5}
                  />
                </div>
                {/* Additional form fields */}
                <div className=''>
                  {/* Additional form fields */}
                </div>
                <div className=''>
                  {/* Additional form fields */}
                </div>
                <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.params as { productId: string };
  try {
    const product = await productService.fetchProduct(productId);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true, // or handle error state appropriately
    };
  }
};

export default EditProductPage;
