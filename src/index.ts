// Part 5 – Student model and formatter
interface Student {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

function formatStudent(student: Student): string {
  return `${student.id} - ${student.name} (${student.status})`;
}

// Sample student
const sampleStudent: Student = {
  id: 1,
  name: "Juan Dela Cruz",
  email: "juan.delacruz@example.com",
  status: "active",
};

// Display the result
console.log(formatStudent(sampleStudent));

// Part 6 – Generic API Response Type
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Example: single student response
const studentResponse: ApiResponse<Student> = {
  success: true,
  data: sampleStudent,
};

// Example: array of students response
const studentsResponse: ApiResponse<Student[]> = {
  success: true,
  data: [sampleStudent],
};

console.log(studentResponse);
console.log(studentsResponse);

// Part 7 – Runtime Validation

// Type guard function that accepts unknown
function isStudent(value: unknown): value is Student {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    (obj.status === "active" || obj.status === "inactive")
  );
}

// 1. Valid object
const validStudent = {
  id: 1,
  name: "Juan Dela Cruz",
  email: "juan.delacruz@example.com",
  status: "active",
};

// 2. Invalid object – incorrect id (string instead of number)
const invalidIdStudent = {
  id: "1", // wrong type
  name: "Maria Santos",
  email: "maria.santos@example.com",
  status: "inactive",
};

// 3. Invalid object – missing name
const missingNameStudent = {
  id: 3,
  email: "pedro.reyes@example.com",
  status: "active",
};

// Test the validation
console.log("Valid student:", isStudent(validStudent)); // true
console.log("Invalid id:", isStudent(invalidIdStudent)); // false
console.log("Missing name:", isStudent(missingNameStudent)); // false

// Safe usage example
function processStudentData(data: unknown) {
  if (isStudent(data)) {
    console.log("Valid student received:", formatStudent(data));
  } else {
    console.log("Invalid student data received");
  }
}

processStudentData(validStudent);
processStudentData(invalidIdStudent);
processStudentData(missingNameStudent);

// Part 18 – Student status formatter

type StudentStatus = "active" | "inactive";

function getStudentStatusLabel(status: StudentStatus): string {
  if (status === "active") {
    return "Active Student";
  }

  return "Inactive Student";
}

// Test the student status formatter
console.log("Active status:", getStudentStatusLabel("active"));
console.log("Inactive status:", getStudentStatusLabel("inactive"));
