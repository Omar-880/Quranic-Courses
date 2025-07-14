import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle
} from 'lucide-react';
import Layout from '@/components/Layout';

// صفحة التواصل
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // التعامل مع تغيير قيم النموذج
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    // في التطبيق الحقيقي، سيتم إرسال البيانات إلى الخادم
    console.log('Form data:', formData);
    setIsSubmitted(true);
    
    // إعادة تعيين النموذج بعد 3 ثوانٍ
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* عنوان الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-islamic-dark mb-4 font-amiri">
            تواصل معنا
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نحن هنا لخدمتكم والإجابة على جميع استفساراتكم حول دورات القرآن الكريم
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* معلومات التواصل */}
          <div className="space-y-6">
            {/* بطاقة معلومات التواصل */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-islamic-dark">
                  <MessageSquare className="h-5 w-5 text-islamic-green" />
                  معلومات التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* العنوان */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-islamic-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-islamic-dark mb-1">العنوان</h4>
                    <p className="text-muted-foreground">
                      الرياض، حي السليمانية<br />
                      شارع الأمير محمد بن عبدالعزيز<br />
                      المملكة العربية السعودية
                    </p>
                  </div>
                </div>

                {/* الهاتف */}
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-islamic-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-islamic-dark mb-1">الهاتف</h4>
                    <p className="text-muted-foreground" dir="ltr">+966 50 123 4567</p>
                  </div>
                </div>

                {/* البريد الإلكتروني */}
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-islamic-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-islamic-dark mb-1">البريد الإلكتروني</h4>
                    <p className="text-muted-foreground">info@quranacademy.com</p>
                  </div>
                </div>

                {/* أوقات العمل */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-islamic-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-islamic-dark mb-1">أوقات العمل</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>السبت - الخميس: 8:00 ص - 10:00 م</p>
                      <p>الجمعة: 2:00 م - 10:00 م</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* خريطة موهمة */}
            <Card>
              <CardHeader>
                <CardTitle className="text-islamic-dark">موقعنا على الخريطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gradient-to-br from-islamic-green/10 to-islamic-green-light/10 rounded-lg flex items-center justify-center border-2 border-dashed border-islamic-green/20">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-islamic-green mx-auto mb-4" />
                    <p className="text-muted-foreground">خريطة الموقع</p>
                    <p className="text-sm text-muted-foreground">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* نموذج التواصل */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-islamic-dark">
                  <Send className="h-5 w-5 text-islamic-green" />
                  أرسل لنا رسالة
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-islamic-dark mb-2">
                      تم إرسال رسالتك بنجاح!
                    </h3>
                    <p className="text-muted-foreground">
                      شكراً لتواصلكم معنا. سنقوم بالرد عليكم في أقرب وقت ممكن.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* الاسم الكامل */}
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
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
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
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

                    {/* رقم الهاتف */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
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

                    {/* موضوع الرسالة */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">موضوع الرسالة *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="أدخل موضوع رسالتك"
                        required
                        className="text-right"
                      />
                    </div>

                    {/* نص الرسالة */}
                    <div className="space-y-2">
                      <Label htmlFor="message">نص الرسالة *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="اكتب رسالتك هنا..."
                        required
                        rows={5}
                        className="text-right resize-none"
                      />
                    </div>

                    {/* زر الإرسال */}
                    <Button 
                      type="submit" 
                      className="w-full bg-islamic-green hover:bg-islamic-green-light"
                      size="lg"
                    >
                      <Send className="h-4 w-4 ml-2" />
                      إرسال الرسالة
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-12">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-islamic-dark mb-4 font-amiri">
                  نحن في خدمتكم دائماً
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  فريقنا المختص متواجد للإجابة على جميع استفساراتكم حول برامج التحفيظ والتجويد،
                  ومساعدتكم في اختيار الدورة الأنسب لكم أو لأطفالكم. لا تترددوا في التواصل معنا
                  في أي وقت، فنحن نسعد بخدمتكم ومساعدتكم في رحلتكم مع القرآن الكريم.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;