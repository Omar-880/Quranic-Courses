export const mockData = {
  courses: [
    {
      id: 39,
      type: "TahfeezCourse",
      title: "AlaaGroup",
      course_start_time: "00:00:00",
      startDate: "2025-05-08",
      expectedEndDate: "2025-06-01",
      description: "",
      level: "",
      image: "",
      relatedExams: null,
      courseFiles: [],
      relatedStudents: [
        {
          id: 23,
          name: "Mohammed_Hebo",
          pivot: {
            course_id: 39,
            student_id: 23
          }
        },
        {
          id: 24,
          name: "Faiad_Hasan",
          pivot: {
            course_id: 39,
            student_id: 24
          }
        },
        {
          id: 25,
          name: "Abdullah_Jamalah",
          pivot: {
            course_id: 39,
            student_id: 25
          }
        },
        {
          id: 36,
          name: "Mohammed_ALkadi",
          pivot: {
            course_id: 39,
            student_id: 36
          }
        }
      ],
      relatedInstructors: [
        {
          id: 21,
          name: "AllaBaidak",
          pivot: {
            course_id: 39,
            instructor_id: 21
          }
        }
      ],
      relatedLessons: [
        {
          id: 42,
          instructor_id: 21,
          lesson_title: "tahfeez_groups",
          lesson_date: "2025-05-07",
          created_at: "2025-05-07T10:36:54.000000Z",
          updated_at: "2025-05-07T10:36:54.000000Z",
          pivot: {
            course_id: 39,
            lesson_id: 42
          }
        }
      ]
    },
    {
      id: 40,
      type: "TahfeezCourse",
      title: "BilalGroup",
      course_start_time: "00:00:00",
      startDate: "2025-05-08",
      expectedEndDate: "2025-06-01",
      description: "",
      level: "",
      image: "",
      relatedExams: null,
      courseFiles: [],
      relatedStudents: [
        {
          id: 37,
          name: "Nawwar_alnahhas",
          pivot: {
            course_id: 40,
            student_id: 37
          }
        },
        {
          id: 38,
          name: "ZayyanALboukai",
          pivot: {
            course_id: 40,
            student_id: 38
          }
        }
      ],
      relatedInstructors: [
        {
          id: 23,
          name: "BilalDasouki",
          pivot: {
            course_id: 40,
            instructor_id: 23
          }
        }
      ],
      relatedLessons: [
        {
          id: 42,
          instructor_id: 23,
          lesson_title: "tahfeez_groups",
          lesson_date: "2025-05-07",
          created_at: "2025-05-07T10:36:54.000000Z",
          updated_at: "2025-05-07T10:36:54.000000Z",
          pivot: {
            course_id: 40,
            lesson_id: 42
          }
        }
      ]
    },
    {
      id: 42,
      type: "Tajweed",
      title: "AmerGroup",
      course_start_time: "10:00:00",
      startDate: "2026-06-02",
      expectedEndDate: "2026-07-02",
      description: "",
      level: "",
      image: "",
      relatedExams: null,
      courseFiles: [
        {
          id: 12,
          course_id: 42,
          file_name: "AmerFile",
          file_path: "C:\\Users\\moaaz\\AppData\\Local\\Temp\\phpCFEB.tmp",
          created_at: "2025-06-07T10:51:31.000000Z",
          updated_at: "2025-06-07T10:58:48.000000Z"
        }
      ],
      relatedStudents: [
        {
          id: 22,
          name: "TahseenJawish",
          pivot: {
            course_id: 42,
            student_id: 22
          }
        }
      ],
      relatedInstructors: [
        {
          id: 22,
          name: "admin12345",
          pivot: {
            course_id: 42,
            instructor_id: 22
          }
        }
      ],
      relatedLessons: [
        {
          id: 46,
          instructor_id: 23,
          lesson_title: "Praying",
          lesson_date: "2025-09-04",
          created_at: "2025-06-07T12:46:55.000000Z",
          updated_at: "2025-06-07T12:54:37.000000Z",
          pivot: {
            course_id: 42,
            lesson_id: 46
          }
        },
        {
          id: 49,
          instructor_id: 23,
          lesson_title: "blablabla",
          lesson_date: "2025-06-12",
          created_at: "2025-06-12T14:46:33.000000Z",
          updated_at: "2025-06-12T14:46:33.000000Z",
          pivot: {
            course_id: 42,
            lesson_id: 49
          }
        },
        {
          id: 50,
          instructor_id: 23,
          lesson_title: "ddddd",
          lesson_date: "2025-06-12",
          created_at: "2025-06-12T14:53:16.000000Z",
          updated_at: "2025-06-12T14:53:16.000000Z",
          pivot: {
            course_id: 42,
            lesson_id: 50
          }
        }
      ]
    }
  ],

  instructors: [
    {
      id: 21,
      name: "AllaBaidak",
      email: "moazoo@gmail.com",
      password: "$2y$12$BRJt7g2lYLVnzi7JYVX.9e5SwSilFCx3iIgto.BOEcMHKXlCmGOo6",
      certificate: "sdasdsadsd",
      instructor_img: "http://localhost:8080/storage/studentsImg/1746456516_n6Ll0yeWhMZKxZAPezrtC65TDxnLzO6GilaXEep2.jpg",
      phone_number: "0937747347",
      quran_memorized_parts: "12",
      quran_passed_parts: "23",
      religious_qualifications: "Primary stage",
      address: "Dummar",
      birth_date: "1979-01-26",
      role: "instructor",
      relatedCourses: [
        {
          id: 39,
          title: "AlaaGroup",
          pivot: {
            instructor_id: 21,
            course_id: 39
          }
        }
      ],
      relatedLessons: [
        {
          id: 43,
          instructor_id: 21,
          lesson_title: "Praying",
          lesson_date: "2025-06-07",
          created_at: "2025-06-07T12:41:53.000000Z",
          updated_at: "2025-06-07T12:41:53.000000Z"
        },
        {
          id: 44,
          instructor_id: 21,
          lesson_title: "Praying",
          lesson_date: "2025-06-07",
          created_at: "2025-06-07T12:42:14.000000Z",
          updated_at: "2025-06-07T12:42:14.000000Z"
        },
        {
          id: 45,
          instructor_id: 21,
          lesson_title: "Praying",
          lesson_date: "2025-06-07",
          created_at: "2025-06-07T12:45:13.000000Z",
          updated_at: "2025-06-07T12:45:13.000000Z"
        }
      ]
    },
    {
      id: 22,
      name: "admin12345",
      email: "admin@gmail.com",
      password: "$2y$12$FdUtdiZSIV97BXrFrwh25uA/AJzghMVFX5lOAgrHxxZtqKFPXDCAO",
      certificate: "sdasdsadsd",
      instructor_img: "http://localhost/storage/app/instructorsImg/1742589345_Screenshot 2024-06-24 133427.png",
      phone_number: "0937747347",
      quran_memorized_parts: "12",
      quran_passed_parts: "23",
      religious_qualifications: "Primary stage",
      address: "Dummar",
      birth_date: "1979-01-26",
      role: "admin",
      relatedCourses: [
        {
          id: 42,
          title: "AmerGroup",
          pivot: {
            instructor_id: 22,
            course_id: 42
          }
        }
      ],
      relatedLessons: []
    },
    {
      id: 23,
      name: "BilalDasouki",
      email: "bilal@gmail.com",
      password: "$2y$12$BRJt7g2lYLVnzi7JYVX.9e5SwSilFCx3iIgto.BOEcMHKXlCmGOo6",
      certificate: "IT",
      instructor_img: "http://localhost:8080/storage/studentsImg/1746456516_n6Ll0yeWhMZKxZAPezrtC65TDxnLzO6GilaXEep2.jpg",
      phone_number: "0937747347",
      quran_memorized_parts: "30",
      quran_passed_parts: "30",
      religious_qualifications: "Primary stage",
      address: "Dummar",
      birth_date: "1979-01-26",
      role: "instructor",
      relatedCourses: [
        {
          id: 40,
          title: "BilalGroup",
          pivot: {
            instructor_id: 23,
            course_id: 40
          }
        }
      ],
      relatedLessons: [
        {
          id: 42,
          instructor_id: 23,
          lesson_title: "tahfeez_groups",
          lesson_date: "2025-05-07",
          created_at: "2025-05-07T10:36:54.000000Z",
          updated_at: "2025-05-07T10:36:54.000000Z"
        },
        {
          id: 47,
          instructor_id: 23,
          lesson_title: "Praying",
          lesson_date: "2025-06-10",
          created_at: "2025-06-10T17:53:16.000000Z",
          updated_at: "2025-06-10T17:53:16.000000Z"
        },
        {
          id: 48,
          instructor_id: 23,
          lesson_title: "dqdwwe",
          lesson_date: "2025-06-12",
          created_at: "2025-06-12T14:44:12.000000Z",
          updated_at: "2025-06-12T14:44:12.000000Z"
        },
        {
          id: 49,
          instructor_id: 23,
          lesson_title: "blablabla",
          lesson_date: "2025-06-12",
          created_at: "2025-06-12T14:46:33.000000Z",
          updated_at: "2025-06-12T14:46:33.000000Z"
        },
        {
          id: 50,
          instructor_id: 23,
          lesson_title: "ddddd",
          lesson_date: "2025-06-12",
          created_at: "2025-06-12T14:53:16.000000Z",
          updated_at: "2025-06-12T14:53:16.000000Z"
        }
      ]
    }
  ],

  students: [
    {
      id: 22,
      name: "TahseenJawish",
      email: "mwodijwad@gmail.com",
      password: "$2y$12$a6BFyyUEdYRyHHE.VhesUOQQpOvp1SfyuizyzWgGjQCd3958Q9pxO",
      certificate: "Preparatory stage",
      student_img: "http://localhost:8080/storage/studentsImg/1746456516_n6Ll0yeWhMZKxZAPezrtC65TDxnLzO6GilaXEep2.jpg",
      birth_date: "1998-03-05",
      quran_memorized_parts: "23",
      quran_passed_parts: "22",
      phone_number: "09164646464",
      address: "Garrick",
      enroll_date: "1998-03-05",
      role: "student",
      reset_password_token: "null",
      attendances: [],
      related_courses: [
        {
          id: 42,
          title: "AmerGroup",
          pivot: {
            student_id: 22,
            course_id: 42
          }
        }
      ],
      related_exams: null
    },
    {
      id: 23,
      name: "Mohammed_Hebo",
      email: "moazsham19@gmail.com",
      password: "$2y$12$Mk4Mrkf0oeit8LLO2pC7m.tXLN4BIUooN/loZj6XIJvFQrjJgYf5a",
      certificate: "adwwdawdwd",
      student_img: "http://localhost:8080/storage/studentsImg/1746456516_n6Ll0yeWhMZKxZAPezrtC65TDxnLzO6GilaXEep2.jpg",
      birth_date: "1998-03-05",
      quran_memorized_parts: "2",
      quran_passed_parts: "2",
      phone_number: "23123231233",
      address: "dawwxacaca",
      enroll_date: "1998-03-05",
      role: "student",
      reset_password_token: "null",
      attendances: [],
      related_courses: [
        {
          id: 39,
          title: "AlaaGroup",
          pivot: {
            student_id: 23,
            course_id: 39
          }
        }
      ],
      related_exams: null
    },
    {
      id: 24,
      name: "Faiad_Hasan",
      email: "msoazsham19@gmail.com",
      password: "$2y$12$WtrEJPcSGHlEDeNyCkbXK.Vuq5p.k0EMajUqnMlflWc9jgmou98HW",
      certificate: "adwwdawdwd",
      student_img: "http://localhost:8080/storage/studentsImg/1746456516_n6Ll0yeWhMZKxZAPezrtC65TDxnLzO6GilaXEep2.jpg",
      birth_date: "1998-03-05",
      quran_memorized_parts: "2",
      quran_passed_parts: "2",
      phone_number: "23123231233",
      address: "dawwxacaca",
      enroll_date: "1998-03-05",
      role: "student",
      reset_password_token: "null",
      attendances: [],
      related_courses: [
        {
          id: 39,
          title: "AlaaGroup",
          pivot: {
            student_id: 24,
            course_id: 39
          }
        }
      ],
      related_exams: null
    },
    {
      id: 25,
      name: "Abdullah_Jamalah",
      email: "csmsoazsham19@gmail.com",
      password: "$2y$12$3OpK4TmCDq56WG0A91tfBuN2nQngx0OXPXe9sB1f3/ydMaLaHSV7u",
      certificate: "adwwdawdwd",
      student_img: "http://localhost:8080/storage/studentsImg/1746456516_n6Ll0yeWhMZKxZAPezrtC65TDxnLzO6GilaXEep2.jpg",
      birth_date: "1998-03-05",
      quran_memorized_parts: "2",
      quran_passed_parts: "2",
      phone_number: "23123231233",
      address: "dawwxacaca",
      enroll_date: "1998-03-05",
      role: "student",
      reset_password_token: "null",
      attendances: [],
      related_courses: [
        {
          id: 39,
          title: "AlaaGroup",
          pivot: {
            student_id: 25,
            course_id: 39
          }
        }
      ],
      related_exams: null
    },
    {
      id: 36,
      name: "Mohammed_ALkadi",
      email: "moazmoaz9@gmail.com",
      password: "$2y$12$MRJDiUTpHwlhNrpe9uJq/u0VQMhsjm1p82gUw12H1ZYQfUmkaKsoy",
      certificate: "adwwdawdwd",
      student_img: "http://localhost:8080/storage/studentsImg/1746459817_MScv1KdHbnv1I6aWPoKMEO5hS6Iidg0NSA4kMxyO.jpg",
      birth_date: "1998-03-05",
      quran_memorized_parts: "2",
      quran_passed_parts: "2",
      phone_number: "23123231233",
      address: "dawwxacaca",
      enroll_date: "1998-03-05",
      role: "student",
      reset_password_token: "null",
      attendances: [
        {
          id: 16,
          student_id: 36,
          student_attendance: 1,
          student_attendance_time: "2025-08-09 08:20:00",
          created_at: "2025-07-10T16:11:37.000000Z",
          updated_at: "2025-07-10T16:21:35.000000Z",
          lesson_id: 47
        }
      ],
      related_courses: [
        {
          id: 39,
          title: "AlaaGroup",
          pivot: {
            student_id: 36,
            course_id: 39
          }
        }
      ],
      related_exams: null
    },
    {
      id: 37,
      name: "Nawwar_alnahhas",
      email: "nawar9@gmail.com",
      password: "$2y$12$MRJDiUTpHwlhNrpe9uJq/u0VQMhsjm1p82gUw12H1ZYQfUmkaKsoy",
      certificate: "Preparatory stage",
      student_img: "http://localhost:8080/storage/studentsImg/1746459817_MScv1KdHbnv1I6aWPoKMEO5hS6Iidg0NSA4kMxyO.jpg",
      birth_date: "1998-03-05",
      quran_memorized_parts: "2",
      quran_passed_parts: "2",
      phone_number: "23123231233",
      address: "dawwxacaca",
      enroll_date: "1998-03-05",
      role: "student",
      reset_password_token: "null",
      attendances: [
        {
          id: 17,
          student_id: 37,
          student_attendance: 0,
          student_attendance_time: null,
          created_at: "2025-07-10T16:11:37.000000Z",
          updated_at: "2025-07-10T16:11:37.000000Z",
          lesson_id: 47
        }
      ],
      related_courses: [
        {
          id: 40,
          title: "BilalGroup",
          pivot: {
            student_id: 37,
            course_id: 40
          }
        }
      ],
      related_exams: null
    },
    {
      id: 38,
      name: "ZayyanALboukai",
      email: "zayan@gmail.com",
      password: "$2y$12$MRJDiUTpHwlhNrpe9uJq/u0VQMhsjm1p82gUw12H1ZYQfUmkaKsoy",
      certificate: "Preparatory stage",
      student_img: "http://localhost:8080/storage/studentsImg/1746459817_MScv1KdHbnv1I6aWPoKMEO5hS6Iidg0NSA4kMxyO.jpg",
      birth_date: "1998-03-05",
      quran_memorized_parts: "2",
      quran_passed_parts: "2",
      phone_number: "23123231233",
      address: "dawwxacaca",
      enroll_date: "1998-03-05",
      role: "student",
      reset_password_token: "null",
      attendances: [
        {
          id: 13,
          student_id: 38,
          student_attendance: 0,
          student_attendance_time: null,
          created_at: "2025-07-09T14:49:17.000000Z",
          updated_at: "2025-07-09T14:49:17.000000Z",
          lesson_id: 47
        },
        {
          id: 14,
          student_id: 38,
          student_attendance: 0,
          student_attendance_time: null,
          created_at: "2025-07-10T15:51:54.000000Z",
          updated_at: "2025-07-10T15:51:54.000000Z",
          lesson_id: 47
        },
        {
          id: 15,
          student_id: 38,
          student_attendance: 0,
          student_attendance_time: null,
          created_at: "2025-07-10T16:11:37.000000Z",
          updated_at: "2025-07-10T16:11:37.000000Z",
          lesson_id: 47
        }
      ],
      related_courses: [
        {
          id: 40,
          title: "BilalGroup",
          pivot: {
            student_id: 38,
            course_id: 40
          }
        }
      ],
      related_exams: null
    }
  ],

  lessons: [
    {
      id: 42,
      related_Courses: [
        {
          id: 39,
          title: "AlaaGroup",
          pivot: {
            lesson_id: 42,
            course_id: 39
          }
        },
        {
          id: 40,
          title: "BilalGroup",
          pivot: {
            lesson_id: 42,
            course_id: 40
          }
        }
      ],
      related_instructors: {
        id: 23,
        name: "BilalDasouki"
      },
      lesson_title: "tahfeez_groups",
      lesson_date: "2025-05-07",
      attendance: null
    },
    {
      id: 43,
      related_Courses: [],
      related_instructors: {
        id: 21,
        name: "AllaBaidak"
      },
      lesson_title: "Praying",
      lesson_date: "2025-06-07",
      attendance: null
    }
  ],

  exams: [
    {
      id: 21,
      relatedCourse: {
        id: 42,
        title: "AmerGroup"
      },
      title: "First exam",
      examDate: "2025-09-09 00:00:00",
      maxMark: 140,
      passingMark: 90
    }
  ],

  attendance: [
    {
      id: 13,
      lesson_details: {
        id: 47,
        instructor_id: 23,
        lesson_title: "Praying",
        lesson_date: "2025-06-10",
        created_at: "2025-06-10T17:53:16.000000Z",
        updated_at: "2025-06-10T17:53:16.000000Z"
      },
      student: {
        id: 38,
        name: "ZayyanALboukai"
      },
      student_attendance: 0,
      student_attendance_time: null
    },
    {
      id: 14,
      lesson_details: {
        id: 47,
        instructor_id: 23,
        lesson_title: "Praying",
        lesson_date: "2025-06-10",
        created_at: "2025-06-10T17:53:16.000000Z",
        updated_at: "2025-06-10T17:53:16.000000Z"
      },
      student: {
        id: 38,
        name: "ZayyanALboukai"
      },
      student_attendance: 0,
      student_attendance_time: null
    },
    {
      id: 15,
      lesson_details: {
        id: 47,
        instructor_id: 23,
        lesson_title: "Praying",
        lesson_date: "2025-06-10",
        created_at: "2025-06-10T17:53:16.000000Z",
        updated_at: "2025-06-10T17:53:16.000000Z"
      },
      student: {
        id: 38,
        name: "ZayyanALboukai"
      },
      student_attendance: 0,
      student_attendance_time: null
    },
    {
      id: 16,
      lesson_details: {
        id: 47,
        instructor_id: 23,
        lesson_title: "Praying",
        lesson_date: "2025-06-10",
        created_at: "2025-06-10T17:53:16.000000Z",
        updated_at: "2025-06-10T17:53:16.000000Z"
      },
      student: {
        id: 36,
        name: "Mohammed_ALkadi"
      },
      student_attendance: 1,
      student_attendance_time: "2025-08-09 08:20:00"
    },
    {
      id: 17,
      lesson_details: {
        id: 47,
        instructor_id: 23,
        lesson_title: "Praying",
        lesson_date: "2025-06-10",
        created_at: "2025-06-10T17:53:16.000000Z",
        updated_at: "2025-06-10T17:53:16.000000Z"
      },
      student: {
        id: 37,
        name: "Nawwar_alnahhas"
      },
      student_attendance: 0,
      student_attendance_time: null
    }
  ],

  studentExams: [
    {
      id: 21,
      studentId: {
        id: 37,
        name: "Nawwar_alnahhas"
      },
      examId: {
        id: 21,
        course_id: 42,
        title: "First exam",
        exam_date: "2025-09-09 00:00:00",
        max_mark: 140,
        passing_mark: 90,
        created_at: "2025-06-12T13:02:38.000000Z",
        updated_at: "2025-06-12T13:05:00.000000Z"
      },
      studentMark: 90
    }
  ],

  coursesFiles: [
    {
      id: 12,
      relatedCourse: {
        id: 42,
        title: "AmerGroup"
      },
      fileName: "AmerFile",
      filePath: "C:\\Users\\moaaz\\AppData\\Local\\Temp\\phpCFEB.tmp"
    }
  ],

  student_recitation: [
    {
      id: 24,
      student_id: 22,
      recitation_per_page: 54,
      recitation_evaluation: "Very Good",
      created_at: "2025-06-13T14:51:17.000000Z",
      updated_at: "2025-06-13T14:51:17.000000Z",
      lesson_id: 46
    },
    {
      id: 19,
      student_id: 38,
      recitation_per_page: 54,
      recitation_evaluation: "Very Good",
      created_at: "2025-06-13T14:04:19.000000Z",
      updated_at: "2025-06-13T14:04:19.000000Z",
      lesson_id: 47
    },
    {
      id: 18,
      student_id: 36,
      recitation_per_page: 555,
      recitation_evaluation: "So Bad",
      created_at: "2025-06-13T14:04:19.000000Z",
      updated_at: "2025-06-13T14:36:46.000000Z",
      lesson_id: 47
    }
  ]
};

export default mockData;