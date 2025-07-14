import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { mockData } from '@/data/mockData';

// بطاقة الدورة التدريبية
const CourseCard = ({ course }) => {
  // الحصول على معلومات المعلم الأول
  const instructor = course.relatedInstructors?.[0] || {};
  
  // حساب عدد الطلاب
  const studentsCount = course.relatedStudents?.length || 0;
  
  // تنسيق التاريخ
  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
  };

  // الحصول على لون نوع الدورة
  const getCourseTypeColor = (type) => {
    switch (type) {
      case 'TahfeezCourse':
        return 'bg-islamic-green text-white';
      case 'Tajweed':
        return 'bg-islamic-gold text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // الحصول على نص نوع الدورة
  const getCourseTypeText = (type) => {
    switch (type) {
      case 'TahfeezCourse':
        return 'تحفيظ القرآن';
      case 'Tajweed':
        return 'تجويد القرآن';
      default:
        return type;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-islamic-green/20 h-40">
      <CardContent className="p-4 h-full">
        <div className="flex items-center gap-4 h-full">
          {/* صورة الدورة في إطار ذهبي دائري */}
          <div className="w-16 h-16 flex-shrink-0">
            {course.image ? (
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover rounded-full border-3 border-islamic-gold shadow-md"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-islamic-green to-islamic-green-light rounded-full border-3 border-islamic-gold shadow-md flex items-center justify-center">
                <span className="text-white text-xl font-bold font-amiri">ق</span>
              </div>
            )}
          </div>

          {/* معلومات الدورة */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <Badge className={getCourseTypeColor(course.type)} variant="secondary">
                {getCourseTypeText(course.type)}
              </Badge>
            </div>
            
            <h3 className="text-lg font-bold text-islamic-gold font-amiri truncate">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              المعلم: {instructor.name || 'غير محدد'}
            </p>
          </div>

          {/* زر عرض التفاصيل */}
          <div className="flex-shrink-0">
            <Link to={`/courses/${course.id}`}>
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

// صفحة الدورات
const Courses = () => {
  const [selectedType, setSelectedType] = useState('all');
  
  // فلترة الدورات حسب النوع
  const filteredCourses = selectedType === 'all' 
    ? mockData.courses 
    : mockData.courses.filter(course => course.type === selectedType);

  // أنواع الدورات المتاحة
  const courseTypes = [
    { value: 'all', label: 'جميع الدورات' },
    { value: 'TahfeezCourse', label: 'دورات التحفيظ' },
    { value: 'Tajweed', label: 'دورات التجويد' },
  ];

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
            دورات القرآن الكريم
          </h1>
            <div className="w-24 h-1 bg-[#C6953E] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
            اختر من بين مجموعة متنوعة من دورات تحفيظ وتجويد القرآن الكريم المصممة لجميع الأعمار والمستويات
          </p>
          </div>
        </div>

        {/* فلتر أنواع الدورات */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {courseTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? "default" : "outline"}
              onClick={() => setSelectedType(type.value)}
              className={selectedType === type.value ? "bg-islamic-green hover:bg-islamic-green-light" : ""}
            >
              {type.label}
            </Button>
          ))}
        </div>

        {/* عدد النتائج */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            عدد الدورات المتاحة: {filteredCourses.length} دورة
          </p>
        </div>

        {/* قائمة الدورات */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-muted-foreground text-3xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">لا توجد دورات متاحة</h3>
            <p className="text-muted-foreground">لم يتم العثور على دورات تطابق الفلتر المحدد</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Courses;