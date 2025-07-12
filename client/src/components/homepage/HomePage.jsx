import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-cyan-100 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between px-10 py-20 mt-16 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-extrabold mb-6 text-teal-700">
            Welcome to <span className="text-cyan-600">CLgErp</span>
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Smart ERP System to manage college academics, students, and staff seamlessly.
          </p>
          <Link
            to="/login"
            className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-xl hover:from-cyan-600 hover:to-teal-600 transition duration-300"
          >
            Get Started
          </Link>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://www.allaboutlean.com/wp-content/uploads/2022/05/ERP-System-Illustration.jpg"
            alt="ERP Dashboard Illustration"
            className="w-full max-w-md mx-auto drop-shadow-xl rounded-2xl"
          />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-cyan-50">
        <h2 className="text-3xl font-semibold text-center mb-12 text-teal-700">
          🚀 Key Features
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-8">
          {[
            {
              Icon: DashboardIcon,
              title: "Admin Panel",
              desc: "Manage users, subjects, notices & more.",
            },
            {
              Icon: PeopleIcon,
              title: "Student Management",
              desc: "Add, view, and track student data.",
            },
            {
              Icon: MenuBookIcon,
              title: "Subjects",
              desc: "Manage subject allocation & lectures.",
            },
            {
              Icon: SchoolIcon,
              title: "Faculty Access",
              desc: "Allow faculty to mark attendance & track students.",
            },
          ].map(({ Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl border border-cyan-100 transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <Icon fontSize="large" className="text-teal-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-center py-6 mt-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CLgErp. Built with 💙 using MERN Stack.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
