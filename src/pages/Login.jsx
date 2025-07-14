import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  User,
  ArrowRight
} from 'lucide-react';
import Layout from '@/components/Layout';

// صفحة تسجيل الدخول
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  // التعامل مع تغيير قيم النموذج
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // إرسال نموذج تسجيل الدخول
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      console.log('Login data:', formData);
      setIsLoading(false);
      // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الدخول
      navigate('/');
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              {/* شعار تسجيل الدخول */}
              <div className="w-16 h-16 bg-islamic-green rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="h-8 w-8 text-white" />
              </div>
              
              <CardTitle className="text-2xl font-bold text-islamic-dark font-amiri">
                تسجيل الدخول
              </CardTitle>
              <p className="text-muted-foreground">
                أدخل بياناتك للوصول إلى حسابك
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* البريد الإلكتروني */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-islamic-green" />
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                    className="text-right"
                  />
                </div>

                {/* كلمة المرور */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-islamic-green" />
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="أدخل كلمة المرور"
                      required
                      className="text-right pl-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* خيارات إضافية */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, rememberMe: checked }))
                      }
                    />
                    <Label htmlFor="rememberMe" className="text-sm">
                      تذكرني
                    </Label>
                  </div>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-islamic-green hover:text-islamic-green-light"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                {/* زر تسجيل الدخول */}
                <Button 
                  type="submit" 
                  className="w-full bg-islamic-green hover:bg-islamic-green-light"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري تسجيل الدخول...
                    </div>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 ml-2" />
                      تسجيل الدخول
                    </>
                  )}
                </Button>

                {/* رابط إنشاء حساب جديد */}
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    ليس لديك حساب؟{' '}
                    <Link 
                      to="/signup" 
                      className="text-islamic-green hover:text-islamic-green-light font-medium"
                    >
                      إنشاء حساب جديد
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* حسابات تجريبية */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-islamic-dark text-center">
                حسابات تجريبية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-islamic-green" />
                  <span className="font-medium text-islamic-dark">حساب طالب</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  البريد: student@quranacademy.com<br />
                  كلمة المرور: student123
                </p>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-islamic-gold" />
                  <span className="font-medium text-islamic-dark">حساب معلم</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  البريد: teacher@quranacademy.com<br />
                  كلمة المرور: teacher123
                </p>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-islamic-dark">حساب مدير</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  البريد: admin@quranacademy.com<br />
                  كلمة المرور: admin123
                </p>
              </div>
            </CardContent>
          </Card>

          {/* رابط العودة */}
          <div className="text-center mt-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-islamic-green hover:text-islamic-green-light"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;