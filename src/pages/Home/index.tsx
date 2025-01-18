import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types';
import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
  query MyQuery {
    getProducts {
      discount
      name
      price
      product_id
    }
  }
`;

export function Home() {
  const { data, error, loading, refetch } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      //console.log("form home, ", data.getProducts)
      const parsedProducts: Product[] = data.getProducts;
      setProducts(parsedProducts);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error while loading products</h1>;
  }

  return (
    <div className="container">
      <h1 className="section-title">Our Products</h1>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
