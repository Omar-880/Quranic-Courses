import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, GraduationCap, Award, Clock, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';

// القسم الرئيسي للصفحة
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-l from-islamic-green to-islamic-green-light text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-amiri">
            أهلاً وسهلاً بكم في أكاديمية القرآن الكريم
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            تعلم القرآن الكريم مع أفضل المعلمين المختصين في التحفيظ والتجويد
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <BookOpen className="ml-2 h-5 w-5" />
                استكشف الدورات
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-islamic-green">
                تواصل معنا
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// قسم إحصائيات الأكاديمية
const StatsSection = () => {
  const stats = [
    { icon: BookOpen, title: 'الدورات المتاحة', value: '12+', color: 'text-islamic-gold' },
    { icon: GraduationCap, title: 'المعلمين المختصين', value: '25+', color: 'text-islamic-green' },
    { icon: Users, title: 'الطلاب المسجلين', value: '500+', color: 'text-blue-600' },
    { icon: Award, title: 'الطلاب المتخرجين', value: '200+', color: 'text-purple-600' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-islamic-dark font-amiri">
          إنجازات الأكاديمية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <h3 className="text-3xl font-bold mb-2 text-islamic-dark">{stat.value}</h3>
                  <p className="text-muted-foreground font-medium">{stat.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// قسم المميزات
const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'دورات متنوعة',
      description: 'دورات تحفيظ وتجويد مناسبة لجميع الأعمار والمستويات',
      color: 'bg-islamic-green/10 text-islamic-green'
    },
    {
      icon: GraduationCap,
      title: 'معلمون مختصون',
      description: 'فريق من أفضل المعلمين المتخصصين في علوم القرآن الكريم',
      color: 'bg-islamic-gold/10 text-islamic-gold'
    },
    {
      icon: Clock,
      title: 'مرونة في التوقيت',
      description: 'جدولة مرنة تناسب ظروف الطلاب المختلفة',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: MapPin,
      title: 'موقع مميز',
      description: 'مبنى حديث ومجهز بأحدث التقنيات التعليمية',
      color: 'bg-purple-50 text-purple-600'
    },
  ];

  return (
    <section className="py-16 bg-islamic-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-islamic-dark font-amiri">
          لماذا تختار أكاديميتنا؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white">
                <CardContent className="pt-6">
                  <div className={`h-16 w-16 mx-auto mb-4 rounded-full ${feature.color} flex items-center justify-center`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-islamic-dark">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// قسم دعوة للعمل
const CTASection = () => {
  return (
    <section className="py-16 bg-islamic-green text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 font-amiri">
          ابدأ رحلتك مع القرآن الكريم اليوم
        </h2>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          انضم إلى آلاف الطلاب الذين يتعلمون القرآن الكريم في بيئة تعليمية مميزة
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/courses">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              <BookOpen className="ml-2 h-5 w-5" />
              تصفح الدورات
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-islamic-green">
              احجز استشارة مجانية
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// الصفحة الرئيسية
const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
};

export default Home;