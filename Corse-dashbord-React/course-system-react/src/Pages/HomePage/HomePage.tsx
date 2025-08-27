import * as React from "react";
import HomeNavbar from "../../Components/Navbars/HomeNavbar";

export interface IHomePageProps { }

export default function HomePage(props: IHomePageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <HomeNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Learn Anytime, Anywhere 🚀
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of learners on <span className="font-semibold">MyPlatform</span>
          and build your skills in programming, design, and more.
        </p>
        <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition">
          Browse Courses
        </button>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-6 container mx-auto flex-1">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Featured Courses
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Course Card */}
          {[
            {
              title: "React Basics",
              desc: "Learn React fundamentals including components, props, and hooks.",
            },
            {
              title: ".NET Core API",
              desc: "Build RESTful APIs with ASP.NET Core and connect them to frontend apps.",
            },
            {
              title: "SQL Fundamentals",
              desc: "Understand databases, queries, and relational schema design.",
            },
            {
              title: "TypeScript Mastery",
              desc: "Level up your JavaScript skills with TypeScript best practices.",
            },
            {
              title: "UI/UX Design",
              desc: "Design user-friendly and modern interfaces with Figma.",
            },
            {
              title: "Data Structures",
              desc: "Learn algorithms and data structures for coding interviews.",
            },
          ].map((course, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-4">{course.desc}</p>
              <button className="text-blue-600 font-medium hover:underline">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto grid gap-8 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">🌍 Learn Anywhere</h3>
            <p className="text-gray-600">
              Access courses on desktop, tablet, or mobile – anytime you want.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">👨‍🏫 Expert Instructors</h3>
            <p className="text-gray-600">
              Learn from industry experts with years of real-world experience.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">🎓 Certificates</h3>
            <p className="text-gray-600">
              Earn shareable certificates to boost your career opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} MyPlatform. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
