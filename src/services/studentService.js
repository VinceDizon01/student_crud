/**
 * Student API Service
 * Handles HTTP operations to the Spring Boot backend via Vite proxy (/dizon/students).
 */

const BASE_URL = '/dizon/students';

/**
 * Fetch all students from backend
 * @returns {Promise<Array>} List of students
 */
export async function getAllStudents() {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to fetch students (Status: ${response.status})`);
  }

  return await response.json();
}

/**
 * Fetch a single student by id
 * @param {number|string} id 
 * @returns {Promise<Object>} Student object
 */
export async function getStudentById(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Student with ID ${id} not found (Status: ${response.status})`);
  }

  return await response.json();
}

/**
 * Create a new student record
 * @param {Object} student - { firstname, lastname, course, section }
 * @returns {Promise<Object>} Created student
 */
export async function createStudent(student) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      firstname: student.firstname.trim(),
      lastname: student.lastname.trim(),
      course: student.course.trim(),
      section: student.section.trim(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create student (Status: ${response.status})`);
  }

  return await response.json();
}

/**
 * Update an existing student record
 * @param {number|string} id 
 * @param {Object} student - { firstname, lastname, course, section }
 * @returns {Promise<Object>} Updated student
 */
export async function updateStudent(id, student) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      firstname: student.firstname.trim(),
      lastname: student.lastname.trim(),
      course: student.course.trim(),
      section: student.section.trim(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to update student with ID ${id} (Status: ${response.status})`);
  }

  return await response.json();
}

/**
 * Delete a student record
 * @param {number|string} id 
 * @returns {Promise<string>} Confirmation message
 */
export async function deleteStudent(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to delete student with ID ${id} (Status: ${response.status})`);
  }

  return await response.text();
}
