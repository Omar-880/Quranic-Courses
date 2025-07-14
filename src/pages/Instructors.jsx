import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, BookOpen, Calendar, Award, Phone, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import { mockData } from '@/data/mockData';

// بطاقة المعلم
const InstructorCard = ({ instructor }) => {
  // الحصول على الدورات المرتبطة بالمعلم
  const instructorCourses = instructor.relatedCourses || [];
  
  // تنسيق تاريخ الميلاد
  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
  };

  // حساب العمر
  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(instructor.birth_date);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-islamic-green/20 h-40">
      <CardContent className="p-4 h-full">
        <div className="flex items-center gap-4 h-full">
          {/* صورة المعلم في إطار ذهبي دائري */}
          <div className="w-16 h-16 flex-shrink-0 relative">
            {instructor.instructor_img ? (
              <img 
                src={instructor.instructor_img} 
                alt={instructor.name}
                className="w-full h-full object-cover rounded-full border-3 border-islamic-gold shadow-md"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : (
              <div />
            )}
            <div className="hidden w-full h-full bg-gradient-to-br from-islamic-green to-islamic-green-light rounded-full border-3 border-islamic-gold shadow-md items-center justify-center">
              <span className="text-white text-xl font-bold font-amiri">
                {instructor.name ? instructor.name.charAt(0) : 'م'}
              </span>
            </div>
            
            {/* شارة الدور */}
            <div className="absolute -bottom-1 -right-1">
              <Badge className={instructor.role === 'admin' ? 'bg-islamic-gold text-white text-xs' : 'bg-islamic-green text-white text-xs'}>
                {instructor.role === 'admin' ? 'مدير' : 'معلم'}
              </Badge>
            </div>
          </div>

          {/* معلومات المعلم */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-islamic-gold font-amiri truncate">
              {instructor.name}
            </h3>
            <div className="text-sm text-muted-foreground">
              {instructorCourses.length > 0 ? (
                <p className="truncate">الدورات: {instructorCourses[0].title}</p>
              ) : (
                <p>لا توجد دورات</p>
              )}
              {instructorCourses.length > 1 && (
                <p className="text-xs">+{instructorCourses.length - 1} دورة أخرى</p>
              )}
            </div>
          </div>

          {/* زر عرض التفاصيل */}
          <div className="flex-shrink-0">
            <Link to={`/instructors/${instructor.id}`}>
              <Button size="sm" className="bg-islamic-green hover:bg-islamic-green-light text-white">
                التفاصيل
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// صفحة المعلمين
const Instructors = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* عنوان الصفحة */}
        <div className="bg-[#0e4d3c] text-center mb-12 py-20 -mx-4 px-4 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
            <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-[#C6953E] mb-6 font-amiri drop-shadow-lg">
            معلمو القرآن الكريم
          </h1>
            <div className="w-24 h-1 bg-[#C6953E] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
            فريق متميز من المعلمين المختصين في تحفيظ وتجويد القرآن الكريم مع خبرة واسعة في التعليم
          </p>
          </div>
        </div>

        {/* عدد المعلمين */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            عدد المعلمين: {mockData.instructors.length} معلم
          </p>
        </div>

        {/* قائمة المعلمين */}
        {mockData.instructors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockData.instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">لا يوجد معلمين</h3>
            <p className="text-muted-foreground">لم يتم إضافة أي معلمين بعد</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Instructors;