import { useSubscription, gql } from '@apollo/client';

const PRODUCT_UPDATE_SUBSCRIPTION = gql`
  subscription OnProductUpdate {
    productUpdate {
      id
      name
      price
    }
  }
`;

const Notification = () => {
  const { data, loading, error } = useSubscription(PRODUCT_UPDATE_SUBSCRIPTION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data){
    console.log("subscribe tiggerd ", data)
  }

  return (
    <div>
      <h3>New Product Update:</h3>
      <p>ID: {data.productUpdate.id}</p>
      <p>Name: {data.productUpdate.name}</p>
      <p>Price: {data.productUpdate.price}</p>
    </div>
  );
};

export default Notification;
