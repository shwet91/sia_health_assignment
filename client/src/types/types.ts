interface UserData {
  name: string | null;
  email: string | null;
  number: string | null;
  age: string | null;
  gender: "male" | "femail" | null;
}

interface answer {
  question ?: string[]
}

type Options = Record<string, string>;