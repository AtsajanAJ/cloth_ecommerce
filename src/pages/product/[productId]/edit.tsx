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
      <div className='px-40 py-8'>
        <nav data-slot="base" className="font-bold text-lg py-2 mb-2" aria-label="Breadcrumbs">
          <ol data-slot="list" className="flex flex-wrap list-none rounded-small">
            <li data-slot="base" className="flex items-center">
              <span data-slot="item" className="flex gap-1 items-center cursor-pointer whitespace-nowrap line-clamp-1 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-foreground/50 text-medium hover:opacity-80 active:opacity-disabled transition-opacity no-underline" tabIndex={0} role="link">
                <a className="text-gray-400" href="/">All cloths</a>
              </span>
              <span data-slot="separator" aria-hidden="true" className="px-1 text-foreground/50">
                <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="1em">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </span>
            </li>
            <li data-slot="base" className="flex items-center">
              <span data-slot="item" className="flex gap-1 items-center cursor-pointer whitespace-nowrap line-clamp-1 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-foreground/50 text-medium hover:opacity-80 active:opacity-disabled transition-opacity no-underline" tabIndex={0} role="link">
                <a className="text-gray-400" href={`/product/${product.id}`}>{product.name}</a>
              </span>
              <span data-slot="separator" aria-hidden="true" className="px-1 text-foreground/50">
                <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="1em">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </span>
            </li>
            <li data-slot="base" className="flex items-center">
              <span data-slot="item" data-current="true" className="flex gap-1 items-center whitespace-nowrap line-clamp-1 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline cursor-default transition-opacity text-foreground" aria-disabled="true" role="link" aria-current="page">
                Edit
              </span>
            </li>
          </ol>
        </nav>

        <div className="px-40 py-8 w-full">
          <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                <img src={product.imageUrl} alt="Product Image" className="w-full h-auto" />
              </div>
              <div>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a category</option>
                  {/* Add category options here */}
                </select>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select colors
                </label>
                <div className="flex flex-wrap">
                  {/* Replace with dynamic color options if available */}
                  <label className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      name="color"
                      value="Black"
                      checked={form.color?.includes("Black") ?? false}
                      onChange={(e) => {
                        const value = e.target.value;
                        setForm((prevForm) => {
                          const color = prevForm.color ?? [];
                          if (color.includes(value)) {
                            return {
                              ...prevForm,
                              color: color.filter((c) => c !== value),
                            };
                          } else {
                            return {
                              ...prevForm,
                              color: [...color, value],
                            };
                          }
                        });
                      }}
                      className="mr-2"
                    />
                    Black
                  </label>
                  <label className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      name="color"
                      value="White"
                      checked={form.color?.includes("White") ?? false}
                      onChange={(e) => {
                        const value = e.target.value;
                        setForm((prevForm) => {
                          const color = prevForm.color ?? [];
                          if (color.includes(value)) {
                            return {
                              ...prevForm,
                              color: color.filter((c) => c !== value),
                            };
                          } else {
                            return {
                              ...prevForm,
                              color: [...color, value],
                            };
                          }
                        });
                      }}
                      className="mr-2"
                    />
                    White
                  </label>
                  {/* Add other colors here */}
                </div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select sizes
                </label>
                <div className="flex flex-wrap">
                  {/* Replace with dynamic size options if available */}
                  <label className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      name="sizes"
                      value="S"
                      checked={form.sizes?.includes("S") ?? false}
                      onChange={(e) => {
                        const value = e.target.value;
                        setForm((prevForm) => {
                          const sizes = prevForm.sizes ?? [];
                          if (sizes.includes(value)) {
                            return {
                              ...prevForm,
                              sizes: sizes.filter((s) => s !== value),
                            };
                          } else {
                            return {
                              ...prevForm,
                              sizes: [...sizes, value],
                            };
                          }
                        });
                      }}
                      className="mr-2"
                    />
                    S
                  </label>
                  <label className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      name="sizes"
                      value="M"
                      checked={form.sizes?.includes("M") ?? false}
                      onChange={(e) => {
                        const value = e.target.value;
                        setForm((prevForm) => {
                          const sizes = prevForm.sizes ?? [];
                          if (sizes.includes(value)) {
                            return {
                              ...prevForm,
                              sizes: sizes.filter((s) => s !== value),
                            };
                          } else {
                            return {
                              ...prevForm,
                              sizes: [...sizes, value],
                            };
                          }
                        });
                      }}
                      className="mr-2"
                    />
                    M
                  </label>
                  {/* Add other sizes here */}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </form>
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
