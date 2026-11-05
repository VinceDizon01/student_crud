import React from 'react';
import { UserPlus, Save, X, RotateCcw } from 'lucide-react';

export default function StudentForm({
  formData,
  errors,
  isEditing,
  editingId,
  loading,
  onChange,
  onSubmit,
  onCancelEdit,
  onResetForm,
}) {
  return (
    <div id="student-form-card" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              isEditing ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            {isEditing ? <Save className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditing ? `Edit Student #${editingId}` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing
                ? 'Update student details and save changes'
                : 'Fill in the information to register a new student'}
            </p>
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={(e) => onChange('firstname', e.target.value)}
              placeholder="e.g. John"
              className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition ${
                errors.firstname
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.firstname && (
              <p className="mt-1 text-xs text-rose-500">{errors.firstname}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={(e) => onChange('lastname', e.target.value)}
              placeholder="e.g. Doe"
              className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition ${
                errors.lastname
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.lastname && (
              <p className="mt-1 text-xs text-rose-500">{errors.lastname}</p>
            )}
          </div>
        </div>

        {/* Course & Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={(e) => onChange('course', e.target.value)}
              placeholder="e.g. BSIT, BSCS, BSEE"
              className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition ${
                errors.course
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.course && (
              <p className="mt-1 text-xs text-rose-500">{errors.course}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={(e) => onChange('section', e.target.value)}
              placeholder="e.g. 3A, 2B, 4C"
              className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition ${
                errors.section
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.section && (
              <p className="mt-1 text-xs text-rose-500">{errors.section}</p>
            )}
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 min-w-[140px] inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white shadow-sm transition disabled:opacity-50 ${
              isEditing
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {isEditing ? <Save className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>
              {loading
                ? isEditing
                  ? 'Updating...'
                  : 'Adding...'
                : isEditing
                ? 'Update Student'
                : 'Add Student'}
            </span>
          </button>

          {isEditing ? (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={loading}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onResetForm}
              disabled={loading}
              title="Reset inputs"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
