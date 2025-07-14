import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  BookOpen, 
  Calendar, 
  Award, 
  Phone, 
  MapPin, 
  Mail,
  ArrowRight,
  Users,
  GraduationCap
} from 'lucide-react';
import Layout from '@/components/Layout';
import { mockData } from '@/data/mockData';

// تفاصيل المعلم
const InstructorDetails = () => {
  const { id } = useParams();
  
  // البحث عن المعلم المحدد
  const instructor = mockData.instructors.find(i => i.id === parseInt(id));
  
  if (!instructor) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">المعلم غير موجود</h2>
            <p className="text-muted-foreground mb-6">لم يتم العثور على المعلم المطلوب</p>
            <Link to="/instructors">
              <button className="bg-islamic-green text-white px-6 py-2 rounded-lg hover:bg-islamic-green-light">
                العودة إلى المعلمين
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // الحصول على الدورات المرتبطة بالمعلم
  const instructorCourses = instructor.relatedCourses || [];
  
  // الحصول على الطلاب المسجلين في دورات التحفيظ
  const getTahfeezStudents = () => {
    const tahfeezCourses = instructorCourses.filter(course => {
      const fullCourse = mockData.courses.find(c => c.id === course.id);
      return fullCourse && fullCourse.type === 'TahfeezCourse';
    });
    
    const students = [];
    tahfeezCourses.forEach(course => {
      const fullCourse = mockData.courses.find(c => c.id === course.id);
      if (fullCourse && fullCourse.relatedStudents) {
        students.push(...fullCourse.relatedStudents);
      }
    });
    
    // إزالة الطلاب المكررين
    const uniqueStudents = students.filter((student, index, self) => 
      index === self.findIndex(s => s.id === student.id)
    );
    
    return uniqueStudents;
  };

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

  const age = calculateAge(instructor.birth_date);
  const tahfeezStudents = getTahfeezStudents();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* رابط العودة */}
        <div className="mb-6">
          <Link to="/instructors" className="inline-flex items-center text-islamic-green hover:text-islamic-green-light">
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى المعلمين
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* معلومات المعلم الأساسية */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-islamic-gold/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                {/* صورة المعلم في إطار ذهبي */}
                <div className="w-40 h-40 mx-auto mb-6 relative">
                  {instructor.instructor_img ? (
                    <img 
                      src={instructor.instructor_img} 
                      alt={instructor.name}
                      className="w-full h-full object-cover rounded-full border-4 border-islamic-gold shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div />
                  )}
                  <div className="hidden w-full h-full bg-gradient-to-br from-islamic-green to-islamic-green-light rounded-full border-4 border-islamic-gold shadow-lg items-center justify-center">
                    <span className="text-white text-4xl font-bold font-amiri">
                      {instructor.name ? instructor.name.charAt(0) : 'م'}
                    </span>
                  </div>
                  
                  {/* شارة الدور */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className={instructor.role === 'admin' ? 'bg-islamic-gold text-white' : 'bg-islamic-green text-white'}>
                      {instructor.role === 'admin' ? 'مدير' : 'معلم'}
                    </Badge>
                  </div>
                </div>

                {/* اسم المعلم */}
                <CardTitle className="text-2xl font-bold text-islamic-gold font-amiri">
                  {instructor.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* معلومات الاتصال */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 space-y-3">
                  <h4 className="font-semibold text-[#C6953E] mb-3 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    معلومات التواصل
                  </h4>
                  {instructor.email && (
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <Mail className="h-4 w-4 text-islamic-green" />
                      <div className="flex-1">
                        <span className="text-xs text-gray-500 block">البريد الإلكتروني</span>
                        <span className="text-sm font-medium text-gray-800 break-all">{instructor.email}</span>
                      </div>
                    </div>
                  )}

                  {instructor.phone_number && (
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <Phone className="h-4 w-4 text-islamic-green" />
                      <div className="flex-1">
                        <span className="text-xs text-gray-500 block">الهاتف</span>
                        <span className="text-sm font-medium text-gray-800" dir="ltr">{instructor.phone_number}</span>
                      </div>
                    </div>
                  )}

                  {instructor.address && (
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <MapPin className="h-4 w-4 text-islamic-green" />
                      <div className="flex-1">
                        <span className="text-xs text-gray-500 block">العنوان</span>
                        <span className="text-sm font-medium text-gray-800">{instructor.address}</span>
                      </div>
                    </div>
                  )}

                  {age && (
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <Calendar className="h-4 w-4 text-islamic-green" />
                      <div className="flex-1">
                        <span className="text-xs text-gray-500 block">العمر</span>
                        <span className="text-sm font-medium text-gray-800">{age} سنة</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-2 space-y-6">
            {/* المؤهلات والإنجازات */}
            <Card className="border-2 border-islamic-green/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-islamic-dark">
                  <Award className="h-5 w-5 text-islamic-green" />
                  المؤهلات والإنجازات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {instructor.religious_qualifications && (
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm">
                      <h4 className="font-semibold text-[#C6953E] mb-2 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        المؤهل الديني
                      </h4>
                      <p className="text-gray-700">{instructor.religious_qualifications}</p>
                    </div>
                  )}

                  {instructor.certificate && (
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 shadow-sm">
                      <h4 className="font-semibold text-[#C6953E] mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        الشهادة
                      </h4>
                      <p className="text-gray-700">{instructor.certificate}</p>
                    </div>
                  )}

                  {instructor.quran_memorized_parts && (
                    <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 shadow-sm">
                      <h4 className="font-semibold text-[#C6953E] mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        الأجزاء المحفوظة
                      </h4>
                      <p className="text-gray-700">{instructor.quran_memorized_parts} جزء من القرآن الكريم</p>
                    </div>
                  )}

                  {instructor.quran_passed_parts && (
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200 shadow-sm">
                      <h4 className="font-semibold text-[#C6953E] mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        الأجزاء المُجازة
                      </h4>
                      <p className="text-gray-700">{instructor.quran_passed_parts} جزء مُجاز فيها</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* الدورات المدرسة */}
            <Card className="border-2 border-islamic-green/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-islamic-dark">
                  <BookOpen className="h-5 w-5 text-islamic-green" />
                  الدورات المدرسة ({instructorCourses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {instructorCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {instructorCourses.map((course) => {
                      const fullCourse = mockData.courses.find(c => c.id === course.id);
                      if (!fullCourse) return null;

                      return (
                        <Link key={course.id} to={`/courses/${course.id}`}>
                          <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <h4 className="font-medium text-islamic-gold mb-2">{course.title}</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p>النوع: {fullCourse.type === 'TahfeezCourse' ? 'تحفيظ' : 'تجويد'}</p>
                              <p>عدد الطلاب: {fullCourse.relatedStudents?.length || 0}</p>
                              {fullCourse.startDate && (
                                <p>تاريخ البداية: {formatDate(fullCourse.startDate)}</p>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">لا توجد دورات مُدرسة حالياً</p>
                )}
              </CardContent>
            </Card>

            {/* طلاب التحفيظ */}
            {tahfeezStudents.length > 0 && (
              <Card className="border-2 border-islamic-gold/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-islamic-dark">
                    <Users className="h-5 w-5 text-islamic-green" />
                    طلاب التحفيظ ({tahfeezStudents.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tahfeezStudents.map((student) => (
                      <Link key={student.id} to={`/students/${student.id}`}>
                        <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-islamic-green rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-islamic-dark">{student.name}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* الدروس المُعطاة */}
            {instructor.relatedLessons && instructor.relatedLessons.length > 0 && (
              <Card className="border-2 border-islamic-green/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-islamic-dark">
                    <GraduationCap className="h-5 w-5 text-islamic-green" />
                    الدروس المُعطاة ({instructor.relatedLessons.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {instructor.relatedLessons.slice(0, 5).map((lesson) => (
                      <div key={lesson.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-islamic-dark">{lesson.lesson_title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(lesson.lesson_date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {instructor.relatedLessons.length > 5 && (
                      <p className="text-sm text-muted-foreground text-center">
                        و {instructor.relatedLessons.length - 5} دروس أخرى...
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstructorDetails;