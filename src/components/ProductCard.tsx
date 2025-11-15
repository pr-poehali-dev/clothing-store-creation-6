import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sale?: boolean;
  salePrice?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.sale && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
            SALE
          </div>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-heading font-medium text-lg mb-3">{product.name}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.sale && product.salePrice ? (
              <>
                <span className="text-lg font-semibold">{product.salePrice} ₽</span>
                <span className="text-sm text-muted-foreground line-through">{product.price} ₽</span>
              </>
            ) : (
              <span className="text-lg font-semibold">{product.price} ₽</span>
            )}
          </div>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onAddToCart(product)}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Icon name="Plus" size={20} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
