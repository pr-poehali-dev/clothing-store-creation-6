import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToCatalog = () => {
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-secondary to-muted opacity-50" />
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
          Новая коллекция
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Минимализм и стиль в каждой детали. Откройте для себя совершенство простоты.
        </p>
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 hover:scale-105 transition-transform"
          onClick={scrollToCatalog}
        >
          Смотреть каталог
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
