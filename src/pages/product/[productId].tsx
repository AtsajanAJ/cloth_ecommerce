import { GetServerSideProps } from 'next';
import MainLayout from "@/components/layouts/MainLayout";
import React, { useState } from "react";
import { Product } from "@/types/product.type";
import productService from "@/services/product.service";
import Image from "next/image";
import { useSession } from 'next-auth/react';

type ProductDetailPageProps = {
  product: Product;
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const session = useSession()
  const email = session.data?.user?.email||"" 
    // console.log(email);
  const selleremail = product.seller.email
    // console.log(selleremail);
  return (
    <MainLayout>
      <div className="px-40 py-8 w-full">
        <div className="flex justify-between items-center">
          <nav data-slot="base" className="font-bold text-lg" aria-label="Breadcrumbs">
            <ol data-slot="list" className="flex flex-wrap list-none rounded-small">
              <li data-slot="base" className="flex items-center">
                <span data-slot="item" className="flex gap-1 items-center cursor-pointer whitespace-nowrap line-clamp-1 tap-highlight-transparent outline-none text-foreground/50 text-medium hover:opacity-80 active:opacity-disabled transition-opacity no-underline" tabIndex={0}>
                  <a className="relative inline-flex items-center tap-highlight-transparent outline-none text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-gray-400" href="/" tabIndex={0}>All Products</a>
                </span>
                <span data-slot="separator" aria-hidden="true" className="px-1 text-foreground/50">
                  <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="1em">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </span>
              </li>
              <li data-slot="base" className="flex items-center">
                <span data-slot="item" data-current="true" className="flex gap-1 items-center whitespace-nowrap line-clamp-1 tap-highlight-transparent outline-none text-medium no-underline cursor-default transition-opacity text-foreground" aria-disabled="true" aria-current="page">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>
          <a href="" className='relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity'>
            { email === selleremail && <button className='z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&amp;>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-default text-default-foreground data-[hover=true]:opacity-hover'>
              Edit
            </button>}
          </a>
        </div>
        <div className="my-4">
          <hr className="shrink-0 bg-divider border-none w-full h-divider" role='separator' />
        </div>
        <div className='w-full flex space-x-4'>
          <div className='w-[50%] grid grid-cols-3 gap-2'>
            <img src={product.imageUrl} alt={product.name} width={300} height={300} className="hover:brightness-75" />
            {product.imageUrls.map((image, index) => (
              <img key={index} src={image} alt={`${product.name} image ${index + 1}`} width={300} height={300} className="hover:brightness-75" />
            ))}
          </div>
          <div className='w-[50%] py-2'>
            <div className='flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-none shadow-medium rounded-large w-full transition-transform-background motion-reduce:transition-none' tabIndex={-1}>
              <div className='p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex gap-3'>
                <div className='text-md font-bold'>
                  <div>
                    <p>{product.name}</p>
                    <div>
                      <p className='font-thin'>{product.price}฿</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
              <div className='relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased space-y-2'>
                <p className="text-small text-default-500">{product.description}</p>
                <div>
                  <p className="mb-2 text-gray-500">Size</p>
                  <div className='inline-flex items-center justify-center h-auto w-full' role='group'>
                    {product.sizes.map((size, index) => (
                      <button 
                        key={index} 
                        className={`z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 w-full bg-default text-default-foreground rounded-none first:rounded-s-medium last:rounded-e-medium data-[hover=true]:opacity-hover ${selectedSize === size ? 'bg-primary text-primary-foreground' : ''}`}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-gray-500">Color</p>
                  <div className="inline-flex items-center justify-center h-auto w-full" role="group">
                    {product.color.map((color, index) => (
                      <button 
                        key={index} 
                        className={`z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 w-full bg-default text-default-foreground rounded-none first:rounded-s-medium last:rounded-e-medium data-[hover=true]:opacity-hover ${selectedColor === color ? 'bg-primary text-primary-foreground' : ''}`}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large">
                <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium w-full bg-primary text-primary-foreground data-[hover=true]:opacity-hover" type="button">Book</button>
              </div>
            </div>
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
