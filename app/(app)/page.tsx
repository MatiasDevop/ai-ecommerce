import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import { FEATURED_PRODUCTS_QUERY, FILTER_PRODUCTS_BY_NAME_QUERY, FILTER_PRODUCTS_BY_PRICE_ASC_QUERY, FILTER_PRODUCTS_BY_PRICE_DESC_QUERY, FILTER_PRODUCTS_BY_RELEVANCE_QUERY } from "@/sanity/queries/products";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    color?: string;
    material?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    inStock?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
const params = await searchParams;

  const searchQuery = params.q ?? "";
  const categorySlug = params.category ?? "";
  const color = params.color ?? "";
  const material = params.material ?? "";
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;
  const sort = params.sort ?? "name";
  const inStock = params.inStock === "true";

  // Select query based on sort parameter
  const getQuery = () => {
    // If searching and sort is relevance, use relevance query
    if (searchQuery && sort === "relevance") {
      return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    }

    switch (sort) {
      case "price_asc":
        return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY;
      case "price_desc":
        return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY;
      case "relevance":
        return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
      default:
        return FILTER_PRODUCTS_BY_NAME_QUERY;
    }
  };
  
  // Fetch products with filters (server-side via GROQ)
  const { data: products } = await sanityFetch({
    query: getQuery(),
    params: {
      searchQuery,
      categorySlug,
      color,
      material,
      minPrice,
      maxPrice,
      inStock,
    },
  });
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
    });

    // Fetch feautered products for the carousel
    const { data: featuredProducts } = await sanityFetch({
      query: FEATURED_PRODUCTS_QUERY,
    });

    console.log('Products:', products);
    console.log('Featured Products:', featuredProducts);
    console.log('Categories:', categories);

  return (
    <div className="">
      hello world
      {/* Featured Products Carousel */}
      <Suspense fallback={<div>Loading featured products...</div>}>
        <FeaturedCarousel products={featuredProducts} />
      </Suspense>
      {/* Page Banner */}
      {/* Category Tiles */}
      {/* New Arrivals Section */}
    </div>
  );
}
