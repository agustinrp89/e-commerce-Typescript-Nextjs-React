


import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/productCard";
import getProduct, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface PageProps {
  searchParams: { category?: string; searchTerm?: string };
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default async function Home({ searchParams }: PageProps) {
  const category = searchParams?.category || '';
  const searchTerm = searchParams?.searchTerm || '';

  const products = await getProduct({ category, searchTerm });

  if (products.length === 0) {
    return <NullData title="Ooops! No products found. Click 'All' to clear filters" />;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: any) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
