import { ProductType } from '@/entities'
import { 
    Card, 
    CardContent, 
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter} 
from './ui/card'
import Image from 'next/image'
import { ChartColumnStacked, Eye, Receipt } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import DeleteProductDialog from './DeleteProductDialog'
import UpdateProductDialog from './UpdateProductDialog'


type ProductProps = {
    product: ProductType
}

function Product({product}: ProductProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>{product?.title}</CardTitle>
            <CardDescription >
                <img src={product?.image} alt='/product' className='w-full h-[200px] pt-10 object-contain'/>
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className='flex items-center justify-between'>
                <span className='flex items-center gap-2 font-bold'> 
                    <Receipt size={25} /> <span>{product?.price}$</span>
                </span>
                <span className='flex items-center gap-2 font-bold'>
                    <ChartColumnStacked size={25} /> <span>{product?.category}</span>
                </span>
            </div>
        </CardContent>
        <CardFooter>
            <div className='w-full flex items-center justify-center gap-10'>
                <Button size={'icon'} variant='default'>
                    <Link href={`/profile/products/${product?.id.toString()}`} className=''>
                        <Eye size={40}/>
                    </Link>
                </Button>
                <div>
                    <UpdateProductDialog product={product}/>
                </div>
                <div>
                    <DeleteProductDialog productId={product?.id}/>
                </div>
            </div>
        </CardFooter>
    </Card>
  )
}

export default Product