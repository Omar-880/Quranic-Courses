import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, BookOpen, Calendar, MapPin, Phone, GraduationCap } from 'lucide-react';
import Layout from '@/components/Layout';
import { mockData } from '@/data/mockData';

// بطاقة الطالب
const StudentCard = ({ student }) => {
  // الحصول على الدورات المرتبطة بالطالب
  const studentCourses = student.related_courses || [];
  
  // تنسيق التاريخ
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

  const age = calculateAge(student.birth_date);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-islamic-green/20 h-40">
      <CardContent className="p-4 h-full">
        <div className="flex items-center gap-4 h-full">
          {/* صورة الطالب في إطار ذهبي دائري */}
          <div className="w-16 h-16 flex-shrink-0">
            {student.student_img ? (
              <img 
                src={student.student_img} 
                alt={student.name}
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
                {student.name ? student.name.charAt(0) : 'ط'}
              </span>
            </div>
          </div>

          {/* معلومات الطالب */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-islamic-gold font-amiri truncate">
              {student.name}
            </h3>
            <div className="text-sm text-muted-foreground space-y-1">
              {age && (
                <p>العمر: {age} سنة</p>
              )}
              {student.quran_memorized_parts && (
                <p className="truncate">محفوظ: {student.quran_memorized_parts} جزء</p>
              )}
            </div>
          </div>

          {/* زر عرض التفاصيل */}
          <div className="flex-shrink-0">
            <Link to={`/students/${student.id}`}>
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

// صفحة الطلاب
const Students = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* عنوان الصفحة */}
        <div className="bg-islamic-green text-center mb-12 py-16 -mx-4 px-4">
          <h1 className="text-4xl font-bold text-islamic-gold mb-4 font-amiri">
            طلاب القرآن الكريم
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            طلابنا الأعزاء الذين يسعون لحفظ وتعلم القرآن الكريم في بيئة تعليمية مثالية
          </p>
        </div>

        {/* عدد الطلاب */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            عدد الطلاب: {mockData.students.length} طالب
          </p>
        </div>

        {/* قائمة الطلاب */}
        {mockData.students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockData.students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">لا يوجد طلاب</h3>
            <p className="text-muted-foreground">لم يتم تسجيل أي طلاب بعد</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Students;