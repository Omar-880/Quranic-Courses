import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  User, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  GraduationCap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import Layout from '@/components/Layout';
import { mockData } from '@/data/mockData';

// تفاصيل الطالب
const StudentDetails = () => {
  const { id } = useParams();
  const [expandedCourses, setExpandedCourses] = useState({});
  
  // البحث عن الطالب المحدد
  const student = mockData.students.find(s => s.id === parseInt(id));
  
  if (!student) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">الطالب غير موجود</h2>
            <p className="text-muted-foreground mb-6">لم يتم العثور على الطالب المطلوب</p>
            <Link to="/students">
              <button className="bg-islamic-green text-white px-6 py-2 rounded-lg hover:bg-islamic-green-light">
                العودة إلى الطلاب
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // الحصول على الدورات المرتبطة بالطالب
  const studentCourses = student.related_courses || [];
  
  // الحصول على سجل الحضور للطالب
  const studentAttendance = student.attendances || [];
  
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

  // الحصول على سجل الحضور لدورة معينة
  const getCourseAttendance = (courseId) => {
    return studentAttendance.filter(att => {
      const lesson = mockData.lessons.find(l => l.id === att.lesson_id);
      if (!lesson) return false;
      
      const lessonCourses = lesson.related_Courses || [];
      return lessonCourses.some(course => course.id === courseId);
    });
  };

  // تحديد حالة الحضور
  const getAttendanceStatus = (attendance) => {
    return attendance === 1 ? 'حاضر' : 'غائب';
  };

  // تحديد لون حالة الحضور
  const getAttendanceColor = (attendance) => {
    return attendance === 1 ? 'text-green-600' : 'text-red-600';
  };

  // تحديد أيقونة حالة الحضور
  const getAttendanceIcon = (attendance) => {
    return attendance === 1 ? CheckCircle : XCircle;
  };

  // تحديد/إلغاء تحديد دورة معينة
  const toggleCourse = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const age = calculateAge(student.birth_date);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* رابط العودة */}
        <div className="mb-6">
          <Link to="/students" className="inline-flex items-center text-islamic-green hover:text-islamic-green-light">
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى الطلاب
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* معلومات الطالب الأساسية */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-islamic-gold/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                {/* صورة الطالب */}
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  {student.student_img ? (
                    <img 
                      src={student.student_img} 
                      alt={student.name}
                      className="w-full h-full object-cover rounded-full border-3 border-islamic-green shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div />
                  )}
                  <div className="hidden w-full h-full bg-gradient-to-br from-islamic-green to-islamic-green-light rounded-full border-3 border-islamic-green shadow-lg items-center justify-center">
                    <span className="text-white text-3xl font-bold font-amiri">
                      {student.name ? student.name.charAt(0) : 'ط'}
                    </span>
                  </div>
                </div>

                {/* اسم الطالب */}
                <CardTitle className="text-2xl font-bold text-islamic-gold font-amiri">
                  {student.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* معلومات الاتصال والتفاصيل الشخصية */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 space-y-3">
                  <h4 className="font-semibold text-[#C6953E] mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    المعلومات الشخصية
                  </h4>
                  {student.email && (
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <Mail className="h-4 w-4 text-islamic-green" />
                      <div className="flex-1">
                        <span className="text-xs text-gray-500 block">البريد الإلكتروني</span>
                        <span className="text-sm font-medium text-gray-800 break-all">{student.email}</span>
                      </div>
                    </div>
                  )}

                  {student.phone_number && (
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <Phone className="h-4 w-4 text-islamic-green" />
                      <div className="flex-1">
                        <span className="text-xs text-gray-500 block">الهاتف</span>
                        <span className="text-sm font-medium text-gray-800" dir="ltr">{student.phone_number}</span>
                      </div>
                    </div>
                  )}

                  {student.address && (
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <MapPin className="h-4 w-4 text-islamic-green" />
                      <div className="flex-1">
                        <span className="text-xs text-gray-500 block">العنوان</span>
                        <span className="text-sm font-medium text-gray-800">{student.address}</span>
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

                  {student.enroll_date && (
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <Calendar className="h-4 w-4 text-islamic-green" />
                      <div className="flex-1">
                        <span className="text-xs text-gray-500 block">تاريخ التسجيل</span>
                        <span className="text-sm font-medium text-gray-800">{formatDate(student.enroll_date)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-2 space-y-6">
            {/* المؤهلات وإنجازات القرآن */}
            <Card className="border-2 border-islamic-green/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-islamic-dark">
                  <BookOpen className="h-5 w-5 text-islamic-green" />
                  المؤهلات وإنجازات القرآن
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {student.certificate && (
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm">
                      <h4 className="font-semibold text-[#C6953E] mb-2 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        المؤهل التعليمي
                      </h4>
                      <p className="text-gray-700">{student.certificate}</p>
                    </div>
                  )}

                  {student.quran_memorized_parts && (
                    <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 shadow-sm">
                      <h4 className="font-semibold text-[#C6953E] mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        الأجزاء المحفوظة
                      </h4>
                      <p className="text-gray-700">{student.quran_memorized_parts} جزء من القرآن الكريم</p>
                    </div>
                  )}

                  {student.quran_passed_parts && (
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200 shadow-sm">
                      <h4 className="font-semibold text-[#C6953E] mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        الأجزاء المُجازة
                      </h4>
                      <p className="text-gray-700">{student.quran_passed_parts} جزء مُجاز فيها</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* الدورات المسجل فيها */}
            <Card className="border-2 border-islamic-green/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-islamic-dark">
                  <GraduationCap className="h-5 w-5 text-islamic-green" />
                  الدورات المسجل فيها ({studentCourses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studentCourses.length > 0 ? (
                  <div className="space-y-4">
                    {studentCourses.map((course) => {
                      const fullCourse = mockData.courses.find(c => c.id === course.id);
                      if (!fullCourse) return null;

                      const courseAttendance = getCourseAttendance(course.id);
                      const isExpanded = expandedCourses[course.id];
                      
                      return (
                        <Collapsible key={course.id}>
                          <CollapsibleTrigger 
                            onClick={() => toggleCourse(course.id)}
                            className="w-full"
                          >
                            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-islamic-green rounded-full flex items-center justify-center">
                                  <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <div className="text-right">
                                  <h4 className="font-semibold text-islamic-gold">{course.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {fullCourse.type === 'TahfeezCourse' ? 'دورة تحفيظ' : 'دورة تجويد'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                  {courseAttendance.length} حصة
                                </Badge>
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </div>
                            </div>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent>
                            <div className="p-4 border-t">
                              {/* معلومات الدورة */}
                              <div className="mb-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                                <h5 className="font-semibold text-[#C6953E] mb-3 flex items-center gap-2">
                                  <BookOpen className="h-4 w-4" />
                                  معلومات الدورة
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                                    <Calendar className="h-4 w-4 text-islamic-green" />
                                    <div>
                                      <span className="text-xs text-gray-500 block">تاريخ البداية</span>
                                      <span className="text-sm font-medium text-gray-800">{formatDate(fullCourse.startDate)}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                                    <Calendar className="h-4 w-4 text-islamic-green" />
                                    <div>
                                      <span className="text-xs text-gray-500 block">تاريخ الانتهاء</span>
                                      <span className="text-sm font-medium text-gray-800">{formatDate(fullCourse.expectedEndDate)}</span>
                                    </div>
                                  </div>
                                  {fullCourse.course_start_time && fullCourse.course_start_time !== "00:00:00" && (
                                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                                      <Clock className="h-4 w-4 text-islamic-green" />
                                      <div>
                                        <span className="text-xs text-gray-500 block">وقت البداية</span>
                                        <span className="text-sm font-medium text-gray-800">{fullCourse.course_start_time}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* سجل الحضور */}
                              {courseAttendance.length > 0 ? (
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                                  <h5 className="font-semibold text-[#C6953E] mb-3 flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    سجل الحضور
                                  </h5>
                                  <div className="space-y-2">
                                    {courseAttendance.map((attendance) => {
                                      const AttendanceIcon = getAttendanceIcon(attendance.student_attendance);
                                      return (
                                        <div 
                                          key={attendance.id} 
                                          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                                        >
                                          <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">
                                              الحصة في {formatDate(attendance.student_attendance_time || 'غير محدد')}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <AttendanceIcon 
                                              className={`h-4 w-4 ${getAttendanceColor(attendance.student_attendance)}`} 
                                            />
                                            <span 
                                              className={`text-sm font-medium ${getAttendanceColor(attendance.student_attendance)}`}
                                            >
                                              {getAttendanceStatus(attendance.student_attendance)}
                                            </span>
                                            {attendance.student_attendance_time && attendance.student_attendance === 1 && (
                                              <span className="text-xs text-muted-foreground">
                                                ({new Date(attendance.student_attendance_time).toLocaleTimeString('ar-SA')})
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : (
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                                  <p className="text-muted-foreground text-sm">
                                    لا يوجد سجل حضور لهذه الدورة
                                  </p>
                                </div>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
                    <p className="text-muted-foreground">الطالب غير مسجل في أي دورات حالياً</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* الامتحانات والدرجات */}
            {student.related_exams && student.related_exams.length > 0 && (
              <Card className="border-2 border-islamic-gold/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-islamic-dark">
                    <GraduationCap className="h-5 w-5 text-islamic-green" />
                    الامتحانات والدرجات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {student.related_exams.map((exam) => (
                      <div key={exam.id} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-[#C6953E] mb-1">{exam.title}</h4>
                            <p className="text-sm text-gray-600">
                              {formatDate(exam.exam_date)}
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-white">
                            الدرجة: {exam.student_mark}/{exam.max_mark}
                          </Badge>
                        </div>
                      </div>
                    ))}
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

export default StudentDetails;
```

src/pages/Students.jsx:
```
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
            <h3 className="text-lg font-bold text-[#C6953E] font-amiri truncate">
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
              طلاب القرآن الكريم
            </h1>
            <div className="w-24 h-1 bg-[#C6953E] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
              طلابنا الأعزاء الذين يسعون لحفظ وتعلم القرآن الكريم في بيئة تعليمية مثالية
            </p>
          </div>
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
```

src/pages/Courses.jsx:
```
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
            
            <h3 className="text-lg font-bold text-[#C6953E] font-amiri truncate">
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
```

src/pages/Instructors.jsx:
```
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
            <h3 className="text-lg font-bold text-[#C6953E] font-amiri truncate">
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
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* الدورات المسجل فيها */}
            <Card className="border-2 border-islamic-green/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-islamic-dark">
                  <GraduationCap className="h-5 w-5 text-islamic-green" />
                  الدورات المسجل فيها ({studentCourses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studentCourses.length > 0 ? (
                  <div className="space-y-4">
                    {studentCourses.map((course) => {
                      const fullCourse = mockData.courses.find(c => c.id === course.id);
                      if (!fullCourse) return null;

                      const courseAttendance = getCourseAttendance(course.id);
                      const isExpanded = expandedCourses[course.id];
                      
                      return (
                        <Collapsible key={course.id}>
                          <CollapsibleTrigger 
                            onClick={() => toggleCourse(course.id)}
                            className="w-full"
                          >
                            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-islamic-green rounded-full flex items-center justify-center">
                                  <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <div className="text-right">
                                  <h4 className="font-semibold text-islamic-gold">{course.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {fullCourse.type === 'TahfeezCourse' ? 'دورة تحفيظ' : 'دورة تجويد'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                  {courseAttendance.length} حصة
                                </Badge>
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </div>
                            </div>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent>
                            <div className="p-4 border-t">
                              {/* معلومات الدورة */}
                              <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">تاريخ البداية: </span>
                                    <span className="font-medium">{formatDate(fullCourse.startDate)}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">تاريخ الانتهاء: </span>
                                    <span className="font-medium">{formatDate(fullCourse.expectedEndDate)}</span>
                                  </div>
                                  {fullCourse.course_start_time && fullCourse.course_start_time !== "00:00:00" && (
                                    <div>
                                      <span className="text-muted-foreground">وقت البداية: </span>
                                      <span className="font-medium">{fullCourse.course_start_time}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* سجل الحضور */}
                              {courseAttendance.length > 0 ? (
                                <div>
                                  <h5 className="font-medium text-islamic-dark mb-3">
                                    سجل الحضور:
                                  </h5>
                                  <div className="space-y-2">
                                    {courseAttendance.map((attendance) => {
                                      const AttendanceIcon = getAttendanceIcon(attendance.student_attendance);
                                      return (
                                        <div 
                                          key={attendance.id} 
                                          className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                                        >
                                          <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                              الحصة في {formatDate(attendance.student_attendance_time || 'غير محدد')}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <AttendanceIcon 
                                              className={`h-4 w-4 ${getAttendanceColor(attendance.student_attendance)}`} 
                                            />
                                            <span 
                                              className={`text-sm font-medium ${getAttendanceColor(attendance.student_attendance)}`}
                                            >
                                              {getAttendanceStatus(attendance.student_attendance)}
                                            </span>
                                            {attendance.student_attendance_time && attendance.student_attendance === 1 && (
                                              <span className="text-xs text-muted-foreground">
                                                ({new Date(attendance.student_attendance_time).toLocaleTimeString('ar-SA')})
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : (
                                <p className="text-muted-foreground text-sm">
                                  لا يوجد سجل حضور لهذه الدورة
                                </p>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">الطالب غير مسجل في أي دورات حالياً</p>
                )}
              </CardContent>
            </Card>

            {/* الامتحانات والدرجات */}
            {student.related_exams && student.related_exams.length > 0 && (
              <Card className="border-2 border-islamic-gold/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-islamic-dark">
                    <GraduationCap className="h-5 w-5 text-islamic-green" />
                    الامتحانات والدرجات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {student.related_exams.map((exam) => (
                      <div key={exam.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-islamic-dark">{exam.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(exam.exam_date)}
                            </p>
                          </div>
                          <Badge variant="outline">
                            الدرجة: {exam.student_mark}/{exam.max_mark}
                          </Badge>
                        </div>
                      </div>
                    ))}
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

export default StudentDetails;