import Image from "next/image";
import type { Product } from "@/lib/mocks";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="relative aspect-video">
        <Image
          src={product.image}
          alt={product.name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
        />
      </div>
      <h2 className="text-lg font-semibold"> {product.name}</h2>
      <p className="text-gray-600">{product.price.toFixed(2)}</p>
      <p className="text-gray-500">{product.description}</p>
    </div>
  );
}
