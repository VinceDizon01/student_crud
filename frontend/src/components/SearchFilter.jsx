import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  availableCourses,
  totalResults,
}) {
  const hasActiveFilters = searchQuery.trim() !== '' || selectedCourse !== 'ALL';

  const handleClearAll = () => {
    onSearchChange('');
    onCourseChange('ALL');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by student name, course, or section..."
            className="w-full pl-10 pr-9 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Course Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCourse}
              onChange={(e) => onCourseChange(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition appearance-none cursor-pointer"
            >
              <option value="ALL">All Courses</option>
              {availableCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Reset
            </button>
          )}

          <div className="hidden sm:block text-xs font-medium text-slate-500 pl-1 whitespace-nowrap">
            Showing <strong className="text-slate-800">{totalResults}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
