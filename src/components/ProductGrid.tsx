
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";

interface ProductGridProps {
  products: Product[];
  wishlist: number[];
  onProductClick: (product: Product) => void;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (product: Product, size: string) => void;
}

const ProductGrid = ({ products, wishlist, onProductClick, onToggleWishlist, onAddToCart }: ProductGridProps) => {
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes ? product.sizes[0] : "Default");
  };

  return (
    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
      {products.map((product) => (
        <div 
          key={product.id}
          className="group cursor-pointer bg-white rounded-lg p-3 border border-gray-100 hover:shadow-md transition-all duration-300"
          onClick={() => onProductClick(product)}
        >
          <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-gray-50">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-xs font-medium">Out of Stock</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="font-light text-sm leading-tight line-clamp-2 group-hover:text-gray-600 transition-colors">
              {product.name}
            </h4>
            <p className="font-medium text-sm text-black">৳{product.price}</p>
            {product.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs text-gray-500">{product.rating}</span>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                disabled={!product.inStock}
                className="flex-1 h-8 text-xs"
                onClick={(e) => handleAddToCart(e, product)}
              >
                <ShoppingBag className="h-3 w-3 mr-1" />
                Cart
              </Button>
              <Button
                variant={wishlist.includes(product.id) ? "default" : "outline"}
                size="sm"
                className={`flex-1 h-8 text-xs ${
                  wishlist.includes(product.id)
                    ? "bg-black text-white hover:bg-gray-800"
                    : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product.id);
                }}
              >
                <Heart 
                  className={`h-3 w-3 mr-1 ${wishlist.includes(product.id) ? "fill-current" : ""}`} 
                />
                Wishlist
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
