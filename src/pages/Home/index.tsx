import React from 'react';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types';
import {gql, useQuery} from "@apollo/client"

const GET_PRODUCTS = gql`
    query MyQuery {
      getProducts {
        discount
        name
        price
        product_id
      }
    }
  `
// const mockProducts: Product[] = [
//   {
//     id: '1',
//     name: 'Wireless Headphones',
//     price: 199,
//     discount: 15,
//   },
//   {
//     id: '2',
//     name: 'Smartphone',
//     price: 899,
//     discount: 10,
//   },
//   {
//     id: '3',
//     name: 'Laptop',
//     price: 1299,
//     discount: 0,
//   },
//   {
//     id: '4',
//     name: 'Smartwatch',
//     price: 299,
//     discount: 20,
//   },
// ];

export function Home() {
    const {data, error, loading} = useQuery(GET_PRODUCTS)
    if (error){
        return <h1>Error while loading products</h1>
    }
    if (loading){
        return <h1>Loading</h1>
    }
    const jsonProducts = JSON.stringify(data.getProducts, null, 2)
    // console.log("products of ", jsonProducts)
    const parsedProducts: Product[] = JSON.parse(jsonProducts)
    console.log("parsed products ", parsedProducts)
  return (
    <div className="container">
      <h1 className="section-title">Our Products</h1>
      <div className="grid">
        {parsedProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}