import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import Layout from '@/components/Layout';

// صفحة إنشاء حساب جديد
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    birthDate: '',
    certificate: '',
    accountType: 'student',
    quranMemorized: '',
    agreeToTerms: false
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

  // التعامل مع تغيير القوائم المنسدلة
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // إرسال نموذج إنشاء الحساب
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من تطابق كلمات المرور
    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة');
      return;
    }

    // التحقق من الموافقة على الشروط
    if (!formData.agreeToTerms) {
      alert('يجب الموافقة على الشروط والأحكام');
      return;
    }

    setIsLoading(true);
    
    // محاكاة عملية إنشاء الحساب
    setTimeout(() => {
      console.log('Signup data:', formData);
      setIsLoading(false);
      // توجيه المستخدم إلى صفحة تسجيل الدخول
      navigate('/login');
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              {/* شعار إنشاء الحساب */}
              <div className="w-16 h-16 bg-islamic-green rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              
              <CardTitle className="text-2xl font-bold text-islamic-dark font-amiri">
                إنشاء حساب جديد
              </CardTitle>
              <p className="text-muted-foreground">
                انضم إلى أكاديمية القرآن الكريم وابدأ رحلتك التعليمية
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* نوع الحساب */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4 text-islamic-green" />
                    نوع الحساب
                  </Label>
                  <Select 
                    value={formData.accountType} 
                    onValueChange={(value) => handleSelectChange('accountType', value)}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر نوع الحساب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">طالب</SelectItem>
                      <SelectItem value="instructor">معلم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* المعلومات الأساسية */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* الاسم الكامل */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-islamic-green" />
                      الاسم الكامل
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="أدخل اسمك الكامل"
                      required
                      className="text-right"
                    />
                  </div>

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
                </div>

                {/* كلمات المرور */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  {/* تأكيد كلمة المرور */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-islamic-green" />
                      تأكيد كلمة المرور
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="أعد إدخال كلمة المرور"
                        required
                        className="text-right pl-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* معلومات التواصل */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* رقم الهاتف */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-islamic-green" />
                      رقم الهاتف
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="أدخل رقم هاتفك"
                      className="text-right"
                      dir="ltr"
                    />
                  </div>

                  {/* تاريخ الميلاد */}
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-islamic-green" />
                      تاريخ الميلاد
                    </Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="text-right"
                    />
                  </div>
                </div>

                {/* العنوان */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-islamic-green" />
                    العنوان
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="أدخل عنوانك"
                    rows={2}
                    className="text-right resize-none"
                  />
                </div>

                {/* المعلومات التعليمية */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* المؤهل التعليمي */}
                  <div className="space-y-2">
                    <Label htmlFor="certificate" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-islamic-green" />
                      المؤهل التعليمي
                    </Label>
                    <Select 
                      value={formData.certificate} 
                      onValueChange={(value) => handleSelectChange('certificate', value)}
                    >
                      <SelectTrigger className="text-right">
                        <SelectValue placeholder="اختر مؤهلك التعليمي" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">ابتدائي</SelectItem>
                        <SelectItem value="intermediate">متوسط</SelectItem>
                        <SelectItem value="secondary">ثانوي</SelectItem>
                        <SelectItem value="university">جامعي</SelectItem>
                        <SelectItem value="postgraduate">دراسات عليا</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* أجزاء القرآن المحفوظة */}
                  <div className="space-y-2">
                    <Label htmlFor="quranMemorized" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-islamic-green" />
                      أجزاء القرآن المحفوظة
                    </Label>
                    <Input
                      id="quranMemorized"
                      name="quranMemorized"
                      type="number"
                      min="0"
                      max="30"
                      value={formData.quranMemorized}
                      onChange={handleInputChange}
                      placeholder="عدد الأجزاء المحفوظة"
                      className="text-right"
                    />
                  </div>
                </div>

                {/* الموافقة على الشروط */}
                <div className="flex items-start space-x-2 space-x-reverse">
                  <Checkbox
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, agreeToTerms: checked }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                    أوافق على{' '}
                    <Link to="/terms" className="text-islamic-green hover:text-islamic-green-light">
                      الشروط والأحكام
                    </Link>
                    {' '}و{' '}
                    <Link to="/privacy" className="text-islamic-green hover:text-islamic-green-light">
                      سياسة الخصوصية
                    </Link>
                  </Label>
                </div>

                {/* زر إنشاء الحساب */}
                <Button 
                  type="submit" 
                  className="w-full bg-islamic-green hover:bg-islamic-green-light"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري إنشاء الحساب...
                    </div>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 ml-2" />
                      إنشاء الحساب
                    </>
                  )}
                </Button>

                {/* رابط تسجيل الدخول */}
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    لديك حساب بالفعل؟{' '}
                    <Link 
                      to="/login" 
                      className="text-islamic-green hover:text-islamic-green-light font-medium"
                    >
                      تسجيل الدخول
                    </Link>
                  </p>
                </div>
              </form>
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

export default Signup;