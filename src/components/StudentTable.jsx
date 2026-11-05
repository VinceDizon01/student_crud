import React, { useState } from 'react';
import { Pencil, Trash2, AlertTriangle, User } from 'lucide-react';

export default function StudentTable({
  students,
  activeEditId,
  onEdit,
  onDelete,
  isDeletingId,
}) {
  // Track which row currently has delete confirmation active (INLINE, NO MODAL)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await onDelete(id);
    setConfirmDeleteId(null);
  };

  if (!students || students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <User className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No Student Records Found</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
          No students match the current filter, or no students have been registered yet. Add a student using the form.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4 text-center w-16">ID</th>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4">Course</th>
              <th className="py-3.5 px-4">Section</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {students.map((student) => {
              const isEditing = activeEditId === student.id;
              const isConfirming = confirmDeleteId === student.id;
              const isDeleting = isDeletingId === student.id;

              return (
                <tr
                  key={student.id}
                  className={`transition-colors ${
                    isEditing
                      ? 'bg-amber-50/70 border-l-4 border-l-amber-500'
                      : 'hover:bg-slate-50/70'
                  }`}
                >
                  {/* ID */}
                  <td className="py-3.5 px-4 text-center font-mono text-xs font-semibold text-slate-500">
                    #{student.id}
                  </td>

                  {/* Student Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                        {(student.firstname?.[0] || '').toUpperCase()}
                        {(student.lastname?.[0] || '').toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {student.firstname} {student.lastname}
                        </div>
                        {isEditing && (
                          <span className="inline-block text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                            Currently Editing
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {student.course}
                    </span>
                  </td>

                  {/* Section */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {student.section}
                    </span>
                  </td>

                  {/* Actions (NO MODAL: Inline Edit & Inline Delete Confirmation) */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    {isConfirming ? (
                      /* Inline Delete Confirmation Toggle */
                      <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-2 py-1 rounded-xl">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 hidden sm:inline" />
                        <span className="text-xs font-semibold text-rose-700">Confirm delete?</span>
                        <button
                          onClick={() => handleConfirmDelete(student.id)}
                          disabled={isDeleting}
                          title="Confirm Delete"
                          className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition disabled:opacity-50"
                        >
                          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                        </button>
                        <button
                          onClick={handleCancelDelete}
                          disabled={isDeleting}
                          title="Cancel"
                          className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      /* Standard Actions */
                      <div className="inline-flex items-center space-x-1">
                        <button
                          onClick={() => onEdit(student)}
                          className={`inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition ${
                            isEditing
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100 border-transparent hover:border-slate-200'
                          }`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteClick(student.id)}
                          className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
