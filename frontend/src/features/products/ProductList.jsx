import { useLoaderData } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";

// TODO:
// Add 'categoryName' list inside a droplist
// Clicking ona a category would filter that category

export default function ProductList() {
  const { data, error } = useLoaderData();
  console.log(data)

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <h1 className="m-4">Products</h1>
      {error && <ErrorMessage error={error} />}
      {data && 
        <div className="flex justify-center items-center">
          <ul className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((product, index) => (
              <li
                // index used because id is missing and sku has a duplicate
                key={index}
                className="w-[250px] p-2 flex flex-col justify-between items-center border border-gray-300 rounded-md"
              >
                <h3 className="font-medium">{product.naziv}</h3>
                <img 
                  src={product.imgsrc} 
                  alt="product image"
                  width={220}
                />
                <div>{Math.trunc(product.price)} RSD</div>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
};
