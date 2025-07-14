import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Calendar, 
  Clock, 
  Users, 
  User, 
  ChevronDown, 
  ChevronUp, 
  BookOpen,
  ArrowRight,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Layout from '@/components/Layout';
import { mockData } from '@/data/mockData';

// تفاصيل الدورة التدريبية
const CourseDetails = () => {
  const { id } = useParams();
  const [expandedLessons, setExpandedLessons] = useState({});
  
  // البحث عن الدورة المحددة
  const course = mockData.courses.find(c => c.id === parseInt(id));
  
  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">الدورة غير موجودة</h2>
            <p className="text-muted-foreground mb-6">لم يتم العثور على الدورة المطلوبة</p>
            <Link to="/courses">
              <Button>العودة إلى الدورات</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // معلومات المعلم الأول
  const instructor = course.relatedInstructors?.[0] || {};
  
  // تنسيق التاريخ
  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
  };

  // الحصول على معلومات الحضور للدرس
  const getLessonAttendance = (lessonId) => {
    return mockData.attendance.filter(att => att.lesson_details.id === lessonId);
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

  // تحديد/إلغاء تحديد درس معين
  const toggleLesson = (lessonId) => {
    setExpandedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* رابط العودة */}
        <div className="mb-6">
          <Link to="/courses" className="inline-flex items-center text-islamic-green hover:text-islamic-green-light">
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى الدورات
          </Link>
        </div>

        {/* معلومات الدورة الأساسية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* تفاصيل الدورة */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-islamic-green/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getCourseTypeColor(course.type)}>
                    {getCourseTypeText(course.type)}
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-bold text-islamic-gold font-amiri">
                  {course.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* الوصف */}
                {course.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">وصف الدورة</h3>
                    <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                  </div>
                )}

                {/* المعلومات الأساسية */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-islamic-green" />
                      <span className="text-muted-foreground">تاريخ البداية:</span>
                      <span className="font-medium">{formatDate(course.startDate)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-islamic-green" />
                      <span className="text-muted-foreground">تاريخ الانتهاء:</span>
                      <span className="font-medium">{formatDate(course.expectedEndDate)}</span>
                    </div>
                    
                    {course.course_start_time && course.course_start_time !== "00:00:00" && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-islamic-green" />
                        <span className="text-muted-foreground">وقت البداية:</span>
                        <span className="font-medium">{course.course_start_time}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-islamic-green" />
                      <span className="text-muted-foreground">المعلم:</span>
                      <Link 
                        to={`/instructors/${instructor.id}`}
                        className="font-medium text-islamic-gold hover:text-islamic-green"
                      >
                        {instructor.name || 'غير محدد'}
                      </Link>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-islamic-green" />
                      <span className="text-muted-foreground">عدد الطلاب:</span>
                      <span className="font-medium">{course.relatedStudents?.length || 0} طالب</span>
                    </div>

                    {course.level && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-islamic-green" />
                        <span className="text-muted-foreground">المستوى:</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* معلومات جانبية */}
          <div className="space-y-6">
            {/* قائمة الطلاب */}
            <Card className="border-2 border-islamic-gold/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-islamic-dark">
                  الطلاب المسجلين ({course.relatedStudents?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.relatedStudents && course.relatedStudents.length > 0 ? (
                  <div className="space-y-2">
                    {course.relatedStudents.map((student) => (
                      <Link
                        key={student.id}
                        to={`/students/${student.id}`}
                        className="block p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-islamic-green rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium">{student.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">لا يوجد طلاب مسجلين بعد</p>
                )}
              </CardContent>
            </Card>

            {/* ملفات الدورة */}
            {course.courseFiles && course.courseFiles.length > 0 && (
              <Card className="border-2 border-islamic-gold/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-islamic-dark">
                    ملفات الدورة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course.courseFiles.map((file) => (
                      <div key={file.id} className="p-2 rounded-lg border">
                        <span className="text-sm font-medium">{file.file_name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* الدروس والحضور */}
        {course.relatedLessons && course.relatedLessons.length > 0 && (
          <Card className="border-2 border-islamic-green/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-islamic-dark">
                الدروس والحضور ({course.relatedLessons.length} درس)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.relatedLessons.map((lesson) => {
                  const lessonAttendance = getLessonAttendance(lesson.id);
                  const isExpanded = expandedLessons[lesson.id];
                  
                  return (
                    <Collapsible key={lesson.id}>
                      <CollapsibleTrigger 
                        onClick={() => toggleLesson(lesson.id)}
                        className="w-full"
                      >
                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-islamic-green rounded-full flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                              <h4 className="font-semibold text-islamic-dark">{lesson.lesson_title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(lesson.lesson_date)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {lessonAttendance.length} طالب
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
                          {lessonAttendance.length > 0 ? (
                            <div className="space-y-2">
                              <h5 className="font-medium text-islamic-dark mb-3">
                                حضور الطلاب:
                              </h5>
                              {lessonAttendance.map((attendance) => {
                                const AttendanceIcon = getAttendanceIcon(attendance.student_attendance);
                                return (
                                  <div 
                                    key={attendance.id} 
                                    className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Link
                                        to={`/students/${attendance.student.id}`}
                                        className="font-medium text-islamic-gold hover:text-islamic-green"
                                      >
                                        {attendance.student.name}
                                      </Link>
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
                                      {attendance.student_attendance_time && (
                                        <span className="text-xs text-muted-foreground">
                                          ({new Date(attendance.student_attendance_time).toLocaleTimeString('ar-SA')})
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              لا يوجد سجل حضور لهذا الدرس
                            </p>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CourseDetails;