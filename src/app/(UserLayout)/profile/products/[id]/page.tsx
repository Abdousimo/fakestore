import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getProductById } from '@/api/products.api'
import Link from 'next/link'
import { ArrowLeft, Calculator, ChartColumnStacked, Receipt, Star } from 'lucide-react';

async function page ({params}: {params: Promise<{ id: string }>}) {
    
    const  { id } = await  params;
    const product = await getProductById(Number(id));

  return (
    <div className='px-6 min-h-screen flex flex-col items-center pb-10'>
        <div className='w-full max-w-[35rem] flex items-center justify-start'>
            <Link href='/profile/products' className='flex items-center justify-start gap-2 py-10'>
                <ArrowLeft size={30} className='text-primary' />
                <span>Back to products</span>
            </Link>
        </div>
        <Card className='w-full max-w-[35rem] px-4'>
            <CardHeader>
                <CardTitle>{product?.title}</CardTitle>
            </CardHeader>
            <CardDescription>
                <img src={product?.image} alt='/product' className='w-full h-[200px] pt-10 object-contain'/>
            </CardDescription>
            <CardDescription>
                <p>{product?.description}</p>
            </CardDescription>
            <CardContent>
            <div className='grid grid-cols-2 gap-8 items-center justify-between'>
                <span className='flex items-center gap-2 font-bold'> 
                    <Receipt size={25} /> <span>{product?.price}$</span>
                </span>
                <span className='flex items-center gap-2 font-bold'>
                    <ChartColumnStacked size={25} /> <span>{product?.category}</span>
                </span>
                <span className='flex items-center gap-2 font-bold'> 
                    <Star size={25} /> <span>{product?.rating.rate}</span>
                </span>
                <span className='flex items-center gap-2 font-bold'>
                    <Calculator size={25} /> <span>{product?.rating.count}</span>
                </span>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}

export default page