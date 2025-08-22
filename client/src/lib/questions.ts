const questions = {
  // use component-1 for q1, q2, q3, q4
  q1: {
    question: "What brings you here today?",
    type: "multiSelection",
    next: "q2",
    answer: {
      "I want to check if I have a hormonal imbalance": "q3",
      "I am struggling with weight gain": "q3",
      "I have skin or hair concerns": "q3",
      "I am planning for pregnancy": "q3",
      "I am currently pregnant and want to support my body": "q3",
      "I think I may be in perimenopause or menopause": "q3",
      "I feel tired or not like myself": "q3",
      "I have been diagnosed before and need support": "",
      "Just curious": "q3",
    },
  },
  q2: {
    question: "What have you been diagnosed with?",
    type: "singleSelection",
    next: "q5",
    answer: {
      PCOS: "q5",
      Hypothyroidism: "q5",
      "Hashimoto's": "q5",
      "Insulin resistance": "q5",
      Endometriosis: "q5",
      "Premature menopause": "q5",
      Other: "q5",
    },
  },
  q3: {
    question: "Do you experience any of the following hormonal health issues?",
    type: "multiSelection",
    next: "q4",
    answer: {
      "PCOS / PCOD": "q5",
      "Thyroid disorders (Hypothyroid, Hashimoto's)": "q5",
      "Menstrual irregularities": "q5",
      "Weight fluctuations": "q5",
      Endometriosis: "q5",
      "Menopause (post/peri)": "q5",
      "Insulin resistance": "q5",
      "None / Not sure": "",
    },
  },
  q4: {
    question:
      "Have you ever been recommended a hormone test, thyroid test, or ultrasound?",
    type: "singleSelection",
    next: "q5",
    answer: {
      "Yes, and did the tests": "q5",
      "Yes, but didn't do it": "q5",
      "No, never": "q5",
    },
  },

  // use component - 2 for for q5

  q5: {
    type: "GroupSelection",
    next: "q6",
    catogories: {
      cat1: {
        question: "🩸 Menstrual Health",
        answer: [
          "Irregular cycles (<21 or >35 days)",
          "Very painful periods",
          "Heavy bleeding or clotting",
          "Missed periods",
          "Decreased frequency of menses",
        ],
      },
      cat2: {
        question: "🧖 Skin & Hair",
        answer: [
          "Acne (jawline or chin)",
          "Hair thinning or hair fall",
          "Excess facial or body hair",
        ],
      },
      cat3: {
        question: "🧠 Energy & Mood",
        answer: [
          "Constant fatigue / low energy",
          "Brain fog",
          "Mood swings or irritability",
        ],
      },
      cat4: {
        question: "⚖️ Weight & Metabolism",
        answer: [
          "Sudden or stubborn weight gain",
          "Difficulty losing weight",
          "Sugar cravings / feel hangry",
          "Frequent bowel movements",
        ],
      },
      cat5: {
        question: "💤 Sleep & Body",
        answer: [
          "Trouble falling asleep",
          "Waking up tired",
          "Hot flashes or night sweats",
          "Joint pain or body aches",
          "Low libido",
          "Frequent urination",
        ],
      },
    },
  },

  // use component - 1 for q6

  q6: {
    question: "Symptom Duration",
    type: "singleSelection",
    next: "choice",
    answer: {
      "Less than 3 months": "",
      "3 - 12 months": "",
      "1 - 3 years": "",
      "More than 3 years": "",
      "Can't remember": "",
    },
  },

  // use separate componenet-1 for q7, q8, q9

  q7: {
    question: "Do any of these apply?",
    type: "singleSelection",
    next: "q10",
    answer: {
      "Diagnosed via ultrasound (cysts seen)": "",
      "High AMH": "",
      "High androgens (acne/hair)": "",
      "Diagnosed insulin resistance": "",
      "Not sure": "",
    },
  },
  q8: {
    question: "Do any of these apply?",
    next: "q10",
    type: "singleSelection",
    answer: {
      "Periods reducing in frequency": "",
      "Hot flashes": "",
      "Vaginal dryness/discomfort": "",
      "Disturbed sleep": "",
      "Periods stopped before age 40": "",
      "Not sure": "",
    },
  },
  q9: {
    question: "What do you want support with?",
    next: "q10",
    type: "singleSelection",
    answer: {
      "Nutrition in pregnancy": "",
      "PCOS/thyroid management in pregnancy": "",
      "Healthy weight gain": "",
      "Gut or digestion issues": "",
      "Not sure": "",
    },
  },
  // use separate component - 1 for q10
  q10: {
    question:
      "Would you like a personalized summary or expert guidance based on your responses?",
    type: "singleSelection",
    next: "end",
    answer: {
      "Yes, book a free call": "",
      "Yes, WhatsApp me": "",
      "Maybe later": "",
      "No thanks": "",
    },
  },
};

export default questions;

export const conditions = {
  conditionA: [
    "PCOS",
    // "PCOS / PCOD",
    "Acne (jawline or chin)",
    "Irregular cycles (<21 or >35 days)",
    "Constant fatigue / low energy",
  ],

  conditionB: ["Premature menopause", "Menopause (post/peri)"],
  conditionC: [
    "Trouble falling asleep",
    "Hot flashes or night sweats",
    "Hot flashes",
  ],
  conditionD: ["I am planning for pregnancy"],
  conditionE: ["I am currently pregnant and want to support my body"],
};
