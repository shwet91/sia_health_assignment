interface UserData {
  name: string | null;
  email: string | null;
  number: string | null;
  age: string | null;
  gender: "male" | "female" | null; // Fixed typo: "femail" -> "female"
}

// interface answer {
// question ?: string[]
// }

// type Options = Record<string, string>;

// Options type: object where each option text points to a string (the next question id)
type Options = {
  [key: string]: any; // Changed string to any
};

// Answer type: object where each question maps to an array of selected option(s)
interface AnswerType {
  question: any; // Changed string to any
  type: any; // Changed "singleSelection" | "multiSelection" to any
  answer: any[]; // Changed string[] to any[]
}
