import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import type { Product } from './ProductCard';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartProps) => {
  const total = items.reduce((sum, item) => {
    const price = item.sale && item.salePrice ? item.salePrice : item.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl">Корзина</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Icon name="ShoppingBag" size={64} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Ваша корзина пуста</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 object-cover bg-secondary"
                    />
                    <div className="flex-1">
                      <h3 className="font-heading font-medium mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                      <p className="font-semibold mb-3">
                        {item.sale && item.salePrice ? item.salePrice : item.price} ₽
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 ml-auto"
                          onClick={() => onRemove(item.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Итого:</span>
                  <span>{total} ₽</span>
                </div>
                <Button className="w-full" size="lg">
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
