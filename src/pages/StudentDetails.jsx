import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, BookOpen, Award, MapPin } from 'lucide-react';
import { students } from '../data/mockData';

const StudentDetails = () => {
  const { id } = useParams();
  const student = students.find(s => s.id === parseInt(id));

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Student Not Found</h1>
          <Link to="/students" className="text-blue-600 hover:text-blue-800">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          to="/students" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Students
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full mr-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{student.name}</h1>
                <p className="text-blue-100">Student ID: {student.id}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg border border-green-200">
                <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center text-green-700">
                    <Mail className="w-4 h-4 mr-3 text-green-600" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center text-green-700">
                    <Phone className="w-4 h-4 mr-3 text-green-600" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="flex items-center text-green-700">
                    <MapPin className="w-4 h-4 mr-3 text-green-600" />
                    <span>{student.address}</span>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-lg border border-purple-200">
                <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Academic Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center text-purple-700">
                    <Calendar className="w-4 h-4 mr-3 text-purple-600" />
                    <span>Enrollment Date: {student.enrollmentDate}</span>
                  </div>
                  <div className="flex items-center text-purple-700">
                    <Award className="w-4 h-4 mr-3 text-purple-600" />
                    <span>GPA: {student.gpa}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="mt-8">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-100 p-6 rounded-lg border border-orange-200">
                <h2 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Enrolled Courses
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {student.courses.map((course, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
                      <h3 className="font-medium text-orange-800">{course}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {student.bio && (
              <div className="mt-8">
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    About
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{student.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;