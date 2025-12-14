import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: {
        url: product.image,
      },
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="relative rounded-lg overflow-hidden h-50 md:h-100">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  loading="eager"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mbp-4">
              <span className="font-semibold text-lg">
                {formatPrice(product.price)}
              </span>

              <Badge variant="outline">{product.category.name}</Badge>
            </div>

            <Separator className="my-4" />
            <div className="space-y-2">
              <h2 className="font-medium">Description</h2>
              <p>{product.description}</p>
            </div>

            <Separator className="my-4" />
            <div className="space-y-2">
              <h2 className="font-medium">Availability</h2>
              <div className="flex items-center gap-2">
                {product.inventory ? (
                  <>
                    <Badge variant="outline" className="text-green-600">
                      In stock
                    </Badge>
                    <span className="text-xs text-gray-500">
                      ({product.inventory} items available)
                    </span>
                  </>
                ) : (
                  <Badge variant="outline" className="text-red-600">
                    Out of stock
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
