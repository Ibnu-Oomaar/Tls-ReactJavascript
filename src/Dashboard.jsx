import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Class 1A",
      teacher: "Ahmed Ali", 
      students: 35,
      status: "Active",
    },
    {
      id: 2,
      name: "Class 2B",
      teacher: "Fatima Hassan",
      students: 28,
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    teacher: "",
    students: "",
  });

  const totalStudents = classes.reduce(
    (total, item) => total + Number(item.students),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.teacher.trim() || form.students === "") {
      return;
    }

    if (Number(form.students) < 0 || !Number.isInteger(Number(form.students))) {
      return;
    }

    setClasses([
      ...classes,
      {
        id: Date.now(),
        name: form.name,
        teacher: form.teacher,
        students: Number(form.students),
        status: "Active",
      },
    ]);

    setForm({ name: "", teacher: "", students: "" });
  };

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Class", path: "/class" },
    { name: "Students", path: "/students" },
    { name: "Finance", path: "/finance" },
    { name: "Staff", path: "/staff" },
    { name: "Registration", path: "/registration" },
  ];

  const pageConfig = {
    "/students": {
      title: "Student Registration",
      description: "Add and manage student information",
      submitLabel: "Add Student",
      fields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "studentId", label: "Student ID", type: "text", required: true },
        { name: "className", label: "Class", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      ],
    },
    "/finance": {
      title: "Finance",
      description: "Record student payments and fees",
      submitLabel: "Save Payment",
      fields: [
        { name: "studentId", label: "Student ID", type: "text", required: true },
        { name: "studentName", label: "Student Name", type: "text", required: true },
        { name: "amount", label: "Amount", type: "number", min: "0", step: "0.01", required: true },
        { name: "paymentType", label: "Payment Type", type: "select", options: ["Tuition", "Registration", "Exam", "Other"], required: true },
        { name: "paymentDate", label: "Payment Date", type: "date", required: true },
        { name: "reference", label: "Payment Reference", type: "text" },
      ],
    },
    "/staff": {
      title: "Staff",
      description: "Register and manage staff members",
      submitLabel: "Add Staff",
      fields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "staffId", label: "Staff ID", type: "text", required: true },
        { name: "role", label: "Role", type: "select", options: ["Teacher", "Administrator", "Accountant", "Other"], required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "salary", label: "Monthly Salary", type: "number", min: "0", step: "0.01", required: true },
      ],
    },
    "/registration": {
      title: "Registration",
      description: "Create a new school registration",
      submitLabel: "Submit Registration",
      fields: [
        { name: "studentName", label: "Student Name", type: "text", required: true },
        { name: "parentName", label: "Parent / Guardian", type: "text", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "className", label: "Class", type: "text", required: true },
        { name: "academicYear", label: "Academic Year", type: "text", placeholder: "2026-2027", required: true },
        { name: "registrationDate", label: "Registration Date", type: "date", required: true },
      ],
    },
  };

  const isClassPage = location.pathname === "/" || location.pathname === "/class";
  const currentPage = pageConfig[location.pathname];

  return (
    <div className="min-h-screen bg-[#f0f3f9] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-[270px] md:min-h-screen bg-[#a00000] p-7 shrink-0">
        <h2 className="text-white text-2xl font-bold text-center mb-10">
          Dashboard
        </h2>

        <nav className="flex flex-col gap-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 font-semibold transition ${
                  isActive
                    ? "bg-white text-[#a00000]"
                    : "bg-[#202c42] text-white hover:bg-[#34445f]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 md:p-10 min-w-0">
        <div className="max-w-[1250px] mx-auto">
          {!isClassPage && currentPage ? (
            <ManagementForm {...currentPage} />
          ) : (
            <>
          {/* Header */}
          <header className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#172033]">
              Class Management
            </h1>
          </header>

          <p className="text-gray-500 mb-6">
            Manage school classes easily
          </p>

          {/* Statistics */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 h-40 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900">
                Total Classes
              </h3>
              <p className="text-3xl font-bold text-blue-500 text-center mt-4">
                {classes.length}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 h-40 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900">
                Total Students
              </h3>
              <p className="text-3xl font-bold text-emerald-500 text-center mt-4">
                {totalStudents}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 h-40 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900">
                Teachers
              </h3>
              <p className="text-3xl font-bold text-amber-500 text-center mt-4">
                {new Set(classes.map((item) => item.teacher)).size}
              </p>
            </div>
          </section>

          {/* Add New Class Form */}
          <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-[#172033] mb-4">
              Add New Class
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Class Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:border-blue-500"
                  required
                />

                <input
                  type="text"
                  name="teacher"
                  placeholder="Teacher Name"
                  value={form.teacher}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:border-blue-500"
                  required
                />

                <input
                  type="number"
                  name="students"
                  placeholder="Students Count"
                  min="0"
                  step="1"
                  value={form.students}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg transition font-medium"
              >
                Add Class
              </button>
            </form>
          </section>

          {/* Class List */}
          <section className="bg-white rounded-2xl shadow-md p-6 overflow-hidden">
            <h2 className="text-xl font-bold text-[#172033] mb-4">
              Class List
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-[#e2e8f0] text-gray-900">
                    <th className="px-3 py-3 font-bold">Class</th>
                    <th className="px-3 py-3 font-bold">Teacher</th>
                    <th className="px-3 py-3 font-bold">Students</th>
                    <th className="px-3 py-3 font-bold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {classes.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-3 py-3">{item.name}</td>
                      <td className="px-3 py-3">{item.teacher}</td>
                      <td className="px-3 py-3">{item.students}</td>
                      <td className="px-3 py-3">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {classes.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No classes available.
                </p>
              )}
            </div>
          </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function ManagementForm({ title, description, submitLabel, fields }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section>
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#172033]">
          {title}
        </h1>
        <p className="text-gray-500 mt-2">{description}</p>
      </header>

      {submitted && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          The {title.toLowerCase()} information was saved successfully.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <label key={field.name} className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
              {field.label}
              {field.type === "select" ? (
                <select
                  name={field.name}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 font-normal outline-none focus:border-blue-500"
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder || field.label}
                  min={field.min}
                  step={field.step}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 font-normal outline-none focus:border-blue-500"
                  required={field.required}
                />
              )}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg transition font-medium"
        >
          {submitLabel}
        </button>
      </form>
    </section>
  );
}