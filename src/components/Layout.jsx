import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, BookOpen, Users, GraduationCap, MessageCircle, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

// شريط التنقل الرئيسي
const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'الدورات', path: '/courses', icon: BookOpen },
    { name: 'المعلمين', path: '/instructors', icon: GraduationCap },
    { name: 'الطلاب', path: '/students', icon: Users },
    { name: 'تواصل معنا', path: '/contact', icon: MessageCircle },
  ];

  const authItems = [
    { name: 'الملف الشخصي', path: '/profile', icon: User },
    { name: 'تسجيل الدخول', path: '/login', icon: LogIn },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* شعار الموقع */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            <img 
              src="/image/logo.png" 
              alt="شعار أكاديمية القرآن الكريم" 
              className="h-10 w-10"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden bg-islamic-green rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-lg">ق</span>
            </div>
            <span className="text-islamic-green font-bold text-xl font-amiri">
              أكاديمية القرآن الكريم
            </span>
          </Link>

          {/* قائمة التنقل - شاشات كبيرة */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-islamic-green text-white'
                      : 'text-foreground hover:bg-islamic-green/10 hover:text-islamic-green'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* أزرار تسجيل الدخول - شاشات كبيرة */}
          <div className="hidden md:flex items-center space-x-2 space-x-reverse">
            {authItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={item.path === '/login' ? 'default' : 'outline'}
                    size="sm"
                    className="flex items-center space-x-2 space-x-reverse"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* قائمة الجوال */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-3 space-x-reverse mb-8">
                  <div className="bg-islamic-green rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">ق</span>
                  </div>
                  <span className="text-islamic-green font-bold text-xl font-amiri">
                    أكاديمية القرآن الكريم
                  </span>
                </div>
                
                <div className="space-y-4 flex-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? 'bg-islamic-green text-white'
                            : 'text-foreground hover:bg-islamic-green/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  {authItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.path} to={item.path}>
                        <Button 
                          variant={item.path === '/login' ? 'default' : 'outline'}
                          className="w-full flex items-center space-x-2 space-x-reverse"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

// تخطيط الصفحة الرئيسي
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
      
      {/* تذييل الصفحة */}
      <footer className="bg-islamic-green text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 font-amiri">أكاديمية القرآن الكريم</h3>
              <p className="text-white/80">
                منصة تعليمية متخصصة في تحفيظ وتجويد القرآن الكريم، نسعى لخدمة كتاب الله العزيز
                وتوفير بيئة تعليمية مثالية للطلاب والمعلمين.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
              <div className="space-y-2">
                <Link to="/courses" className="block text-white/80 hover:text-white">الدورات</Link>
                <Link to="/instructors" className="block text-white/80 hover:text-white">المعلمين</Link>
                <Link to="/students" className="block text-white/80 hover:text-white">الطلاب</Link>
                <Link to="/contact" className="block text-white/80 hover:text-white">تواصل معنا</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">معلومات التواصل</h4>
              <div className="space-y-2 text-white/80">
                <p>📧 info@quranacademy.com</p>
                <p>📱 +966 50 123 4567</p>
                <p>📍 الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
            <p>&copy; 2024 أكاديمية القرآن الكريم. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;