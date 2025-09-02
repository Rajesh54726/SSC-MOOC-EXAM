SSC Mock Examination Platform
This project is a web-based mock test platform designed for SSC (Staff Selection Commission) aspirants. It provides a realistic exam simulation with features like a timer, categorized question navigation, and detailed performance analysis.

The application is built with vanilla HTML, CSS, and JavaScript, using Tailwind CSS for styling.

✨ Features
Realistic Exam Interface: Mimics the layout and functionality of major online examination platforms.

Countdown Timer: A timed test environment that auto-submits when the time expires.

Dynamic Question Palette: A side panel that categorizes questions by their status:

Answered

Not Answered

Not Visited

Marked for Review

Answered & Marked for Review

Statistical Results: After submission, users get a detailed breakdown of their performance, including total marks, correct answers, and incorrect answers.

Detailed Answer Review: Users can review every question with their selected answer, the correct answer, and a detailed explanation.

Modular Code: The project is structured with separated HTML, CSS, and JavaScript files for better maintainability.

📁 Project Structure
The project is organized into the following directories and files:

ssc-mock-test/
├── 📂 data/
│   └── questions.js      # Contains the question data
├── 📂 public/
│   ├── css/
│   │   └── style.css     # Custom styles
│   ├── js/
│   │   ├── app.js        # Core application logic (timer, scoring, state)
│   │   └── ui.js         # DOM manipulation and UI updates
│   └── index.html        # Main HTML file
├── .gitignore            # Specifies files to be ignored by Git
└── README.md             # Project documentation

🚀 Getting Started
Clone the repository:

git clone [https://github.com/your-username/ssc-mock-test.git](https://github.com/your-username/ssc-mock-test.git)

Navigate to the project directory:

cd ssc-mock-test

Open public/index.html in your web browser.

You can simply double-click the file, or use a live server extension in your code editor (like VS Code's Live Server) for a better development experience.

✍️ How to Add Questions
The questions are stored in an array within the data/questions.js file. To add or modify questions, simply edit this file following the existing object structure for each question.

// Example Question Object in data/questions.js
{
  id: 1,
  question: "Your question text goes here...",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: 0, // Index of the correct option (0-based)
  explanation: "A detailed explanation for the answer.",
  status: 'notVisited',
  selectedOption: null
}
