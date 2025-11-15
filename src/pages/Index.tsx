import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCard, { type Product } from '@/components/ProductCard';
import Cart from '@/components/Cart';

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Базовая футболка',
      price: 2990,
      image: 'https://cdn.poehali.dev/projects/26693355-5029-4d81-9ac5-7c0abad60506/files/53f32670-2525-477c-ba8a-82cbebd2bc65.jpg',
      category: 'Футболки'
    },
    {
      id: 2,
      name: 'Классические джинсы',
      price: 5990,
      salePrice: 4490,
      sale: true,
      image: 'https://cdn.poehali.dev/projects/26693355-5029-4d81-9ac5-7c0abad60506/files/ad3ccf8f-7c3d-4642-af6f-bd3b20a9baca.jpg',
      category: 'Джинсы'
    },
    {
      id: 3,
      name: 'Минималистичное пальто',
      price: 12990,
      image: 'https://cdn.poehali.dev/projects/26693355-5029-4d81-9ac5-7c0abad60506/files/6be4d42b-8449-4ce4-8bfe-cbda33c36a98.jpg',
      category: 'Верхняя одежда'
    },
    {
      id: 4,
      name: 'Белая рубашка',
      price: 3990,
      image: 'https://cdn.poehali.dev/projects/26693355-5029-4d81-9ac5-7c0abad60506/files/53f32670-2525-477c-ba8a-82cbebd2bc65.jpg',
      category: 'Рубашки'
    },
    {
      id: 5,
      name: 'Чёрные брюки',
      price: 4990,
      salePrice: 3990,
      sale: true,
      image: 'https://cdn.poehali.dev/projects/26693355-5029-4d81-9ac5-7c0abad60506/files/ad3ccf8f-7c3d-4642-af6f-bd3b20a9baca.jpg',
      category: 'Брюки'
    },
    {
      id: 6,
      name: 'Кашемировый свитер',
      price: 8990,
      image: 'https://cdn.poehali.dev/projects/26693355-5029-4d81-9ac5-7c0abad60506/files/6be4d42b-8449-4ce4-8bfe-cbda33c36a98.jpg',
      category: 'Свитеры'
    }
  ];

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <Hero />

      <section id="about" className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">О бренде</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Мы создаём одежду, которая говорит сама за себя. Минимализм в дизайне, 
            максимум внимания к деталям и качеству. Каждая вещь создана для того, 
            чтобы стать основой вашего гардероба на долгие годы.
          </p>
        </div>
      </section>

      <section id="sale" className="py-24 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-center">
            Распродажа
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products
              .filter((p) => p.sale)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-center">
            Каталог
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-24 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-center">
            Доставка
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🚚
              </div>
              <h3 className="font-heading font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">По Москве — 1-2 дня, по России — 3-5 дней</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                📦
              </div>
              <h3 className="font-heading font-semibold mb-2">Бесплатно от 5000 ₽</h3>
              <p className="text-muted-foreground">При заказе от 5000 ₽ доставка бесплатная</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ↩️
              </div>
              <h3 className="font-heading font-semibold mb-2">Возврат 14 дней</h3>
              <p className="text-muted-foreground">Не подошло? Вернём деньги без вопросов</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">FASHION</h2>
          <p className="text-sm opacity-80">© 2024 Все права защищены</p>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />
    </div>
  );
};

export default Index;
