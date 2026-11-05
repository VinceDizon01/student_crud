import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import SearchFilter from './components/SearchFilter';
import AlertBanner from './components/AlertBanner';
import LoadingSkeleton from './components/LoadingSkeleton';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './services/studentService';

const INITIAL_FORM = {
  firstname: '',
  lastname: '',
  course: '',
  section: '',
};

export default function App() {
  // Student records state
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Form & Editing state
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');

  // Feedback notifications
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
  };

  const dismissAlert = () => {
    setAlert(null);
  };

  // Fetch all students on mount
  const loadStudents = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await getAllStudents();
      // Ensure data is array
      setStudents(Array.isArray(data) ? data : []);
      if (isManualRefresh) {
        showAlert('Student records refreshed successfully.', 'info');
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      showAlert(
        `Failed to load students. Please verify Spring Boot is running on port 8080. (${err.message})`,
        'error'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Form field change handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.firstname.trim()) errors.firstname = 'First name is required';
    if (!formData.lastname.trim()) errors.lastname = 'Last name is required';
    if (!formData.course.trim()) errors.course = 'Course is required';
    if (!formData.section.trim()) errors.section = 'Section is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset form
  const handleResetForm = () => {
    setFormData(INITIAL_FORM);
    setFormErrors({});
  };

  // Form submit (Handles both Create and Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormLoading(true);
    try {
      if (editingId) {
        // Update existing student
        const updated = await updateStudent(editingId, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingId ? updated : s))
        );
        showAlert(`Student "${updated.firstname} ${updated.lastname}" updated successfully!`, 'success');
        setEditingId(null);
      } else {
        // Create new student
        const created = await createStudent(formData);
        setStudents((prev) => [created, ...prev]);
        showAlert(`Student "${created.firstname} ${created.lastname}" added successfully!`, 'success');
      }

      handleResetForm();
    } catch (err) {
      console.error('Save error:', err);
      showAlert(`Operation failed: ${err.message}`, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  // Trigger inline Edit
  const handleStartEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      firstname: student.firstname || '',
      lastname: student.lastname || '',
      course: student.course || '',
      section: student.section || '',
    });
    setFormErrors({});

    // Smoothly bring the form card into focus
    document.getElementById('student-form-card')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cancel Edit mode
  const handleCancelEdit = () => {
    setEditingId(null);
    handleResetForm();
  };

  // Inline Delete confirmation handler
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showAlert(`Student #${id} deleted successfully.`, 'info');

      // If the currently edited student was deleted, reset edit form
      if (editingId === id) {
        handleCancelEdit();
      }
    } catch (err) {
      console.error('Delete error:', err);
      showAlert(`Failed to delete student: ${err.message}`, 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Extract unique courses for filter dropdown
  const availableCourses = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.course && s.course.trim()) {
        set.add(s.course.trim().toUpperCase());
      }
    });
    return Array.from(set).sort();
  }, [students]);

  // Filtered students by search & course dropdown
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Course filter
      if (selectedCourse !== 'ALL') {
        const studentCourse = (student.course || '').trim().toUpperCase();
        if (studentCourse !== selectedCourse) return false;
      }

      // Keyword query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const fullName = `${student.firstname || ''} ${student.lastname || ''}`.toLowerCase();
        const course = (student.course || '').toLowerCase();
        const section = (student.section || '').toLowerCase();
        const id = String(student.id || '');

        return (
          fullName.includes(query) ||
          course.includes(query) ||
          section.includes(query) ||
          id.includes(query)
        );
      }

      return true;
    });
  }, [students, searchQuery, selectedCourse]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        totalStudents={students.length}
        onRefresh={() => loadStudents(true)}
        isRefreshing={refreshing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Alerts / Feedback Banners */}
        <AlertBanner alert={alert} onDismiss={dismissAlert} />

        {/* Dashboard Grid (Split Layout: Form on Left/Top, Table on Right/Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Inline Student Form (NO MODAL) */}
          <section className="lg:col-span-4 lg:sticky lg:top-24">
            <StudentForm
              formData={formData}
              errors={formErrors}
              isEditing={Boolean(editingId)}
              editingId={editingId}
              loading={formLoading}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancelEdit={handleCancelEdit}
              onResetForm={handleResetForm}
            />
          </section>

          {/* Right Column: Search, Course Filter, and Student Records Table */}
          <section className="lg:col-span-8 space-y-4">
            {/* Search & Course Filter */}
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
              availableCourses={availableCourses}
              totalResults={filteredStudents.length}
            />

            {/* Content: Skeleton Loader vs Records Table */}
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <StudentTable
                students={filteredStudents}
                activeEditId={editingId}
                onEdit={handleStartEdit}
                onDelete={handleDelete}
                isDeletingId={deletingId}
              />
            )}
          </section>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        Student CRUD System &bull; Vite React &bull; Tailwind CSS &bull; Spring Boot REST API
      </footer>
    </div>
  );
}
