interface UserData {
  name: string | null;
  email: string | null;
  number: string | null;
  age: string | null;
  gender: "male" | "femail" | null;
}

// interface answer {
  // question ?: string[]
// }

// type Options = Record<string, string>;


// Options type: object where each option text points to a string (the next question id)
type Options = {
  [key: string]: string;
};

// Answer type: object where each question maps to an array of selected option(s)
type answer = {
  [key: string]: string[];
};
