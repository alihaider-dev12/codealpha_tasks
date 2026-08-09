# Task 1: Flashcard Quiz App

An interactive, feature-rich web-based study application built for the **CodeAlpha App Development Internship** program. This app utilizes the **Leitner Spaced Repetition System (SRS)**, active recall mechanics, custom exam modes, and real-time performance analytics to optimize learning and retention.

---

## 🚀 Key Features

* **🧠 Leitner Spaced Repetition System (SRS):** Dynamic box-based sorting algorithm that organizes cards based on user proficiency for optimized revision.
* **🎯 Multiple Learning Modes:**
  * **Practice Mode:** Interactive flashcard flipping with custom flip animations and instant self-assessment.
  * **MCQ Mode:** Multiple-choice quiz interface with immediate feedback.
  * **Exam Mode:** Timed assessment mode simulating actual testing conditions.
* **📊 Analytics & Progress Tracking:** Detailed dashboard displaying accuracy rates, study time, mastered cards, and historical test statistics.
* **📜 Certificate Generator:** Dynamically creates downloadable PDF completion certificates upon successfully passing test benchmarks.
* **🔊 Audio & Visual Feedback:** Custom sound effects, score indicators, and smooth animations to enhance user engagement.
* **💾 Persistent Storage:** Complete offline persistence using `LocalStorage` to save deck progress, custom cards, and user settings.
* **📱 Responsive Design:** Modern, accessible UI tailored seamlessly across desktop, tablet, and mobile views.

---

## 🛠️ Tech Stack & Tools

| Component | Technology / Library |
| :--- | :--- |
| **Frontend UI** | HTML5, CSS3 (Custom Flexbox/Grid, Animations) |
| **Application Logic** | JavaScript (ES6+ Modules / OOP Concept) |
| **Data Persistence** | Web Storage API (`LocalStorage`) |
| **Export Utilities** | jsPDF / Canvas API (for certificate generation) |
| **Styling Framework** | Custom Responsive CSS (No heavy framework dependencies) |

---

## 📂 Project Structure

```text
Task-1-FlashcardQuizApp/
├── index.html       # Primary application entry point & layout
├── style.css        # Core styling, responsive design rules & animations
├── script.js       # App architecture, SRS logic, state management & handlers
└── README.md        # Task documentation

⚙️ How to Run Locally
Clone or Download the Repository:
git clone [https://github.com/alihaider-dev12/codealpha_tasks.git](https://github.com/alihaider-dev12/codealpha_tasks.git)

Navigate to the Project Directory:
cd codealpha_tasks/Task-1-FlashcardQuizApp

Launch the Application:
Open index.html directly in any standard modern web browser (Chrome, Edge, Firefox, Safari, Opera).

🙋‍♂️ Author
Developer: Ali Haider
GitHub: @alihaider-dev12
Program: CodeAlpha App Development Internship

