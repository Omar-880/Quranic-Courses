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
                <div className="space-y-3">
                  {student.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-islamic-green" />
                      <span className="text-sm text-muted-foreground">البريد الإلكتروني:</span>
                      <span className="text-sm font-medium break-all">{student.email}</span>
                    </div>
                  )}

                  {student.phone_number && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-islamic-green" />
                      <span className="text-sm text-muted-foreground">الهاتف:</span>
                      <span className="text-sm font-medium" dir="ltr">{student.phone_number}</span>
                    </div>
                  )}

                  {student.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-islamic-green" />
                      <span className="text-sm text-muted-foreground">العنوان:</span>
                      <span className="text-sm font-medium">{student.address}</span>
                    </div>
                  )}

                  {age && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-islamic-green" />
                      <span className="text-sm text-muted-foreground">العمر:</span>
                      <span className="text-sm font-medium">{age} سنة</span>
                    </div>
                  )}

                  {student.enroll_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-islamic-green" />
                      <span className="text-sm text-muted-foreground">تاريخ التسجيل:</span>
                      <span className="text-sm font-medium">{formatDate(student.enroll_date)}</span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {student.certificate && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium text-islamic-dark mb-2">المؤهل التعليمي</h4>
                      <p className="text-muted-foreground">{student.certificate}</p>
                    </div>
                  )}

                  {student.quran_memorized_parts && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium text-islamic-dark mb-2">الأجزاء المحفوظة</h4>
                      <p className="text-muted-foreground">{student.quran_memorized_parts} جزء من القرآن الكريم</p>
                    </div>
                  )}

                  {student.quran_passed_parts && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium text-islamic-dark mb-2">الأجزاء المُجازة</h4>
                      <p className="text-muted-foreground">{student.quran_passed_parts} جزء مُجاز فيها</p>
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