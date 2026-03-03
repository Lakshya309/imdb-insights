# CineAI - AI-Powered Movie Explorer

CineAI is a modern, interactive movie exploration web app that leverages AI to analyze audience reviews and provide concise insights. Users can browse movie posters, explore hidden gems, and see a sentiment-based AI summary of audience opinions.

---

## 🚀 Features

- Input IMDb movie ID to fetch movie details.
- Display poster, cast, metadata, and audience reviews.
- AI-powered summary of audience sentiment.
- Overall sentiment classification: Positive / Mixed / Negative.
- Responsive design with smooth animations and interactive floating movie posters.
- Clean and modern UI with Framer Motion animations.
- Mobile-optimized layouts to prevent overlapping posters.

---

## 🛠 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | **Next.js 14 (App Router)** | Provides SSR/ISR for faster page loads, modern React features, and seamless API integration. |
| Styling & Animations | **TailwindCSS** + **Framer Motion** | Tailwind allows rapid, responsive design; Framer Motion handles smooth transitions and scroll/mouse parallax effects. |
| Backend API | **Next.js API Routes** | Handles fetching movie data and AI processing in a serverless, scalable way. |
| Movie Data | **TMDb API** | Used to fetch posters, metadata, and audience reviews via free API keys. |
| AI Analysis | **Google Gemini (Generative AI)** | Summarizes audience reviews, extracts sentiment, praised and criticized aspects using natural language understanding. |

---

## 🎯 How AI Summary Works

1. **Fetch Reviews**:  
   - The app retrieves top audience reviews for a movie from TMDb.
2. **Prepare AI Prompt**:  
   - Reviews are sent to Google Gemini with a structured prompt requesting:
     - Overall sentiment (Positive / Mixed / Negative)
     - Key praised aspects
     - Key criticized aspects
     - Short AI-generated summary
3. **AI Response Processing**:  
   - The AI response is parsed and displayed as:
     - **Overall sentiment badge**
     - **Tags for praised/criticized aspects**
     - **Typing animation for AI summary**
4. **Frontend Rendering**:  
   - The summary and reviews are displayed in a **responsive, animated UI**, optimized for both mobile and desktop.

**Example AI Output:**
```json
{
  "overall_sentiment": "Positive",
  "praised_aspects": ["Performance", "Storytelling", "Cinematography"],
  "criticized_aspects": ["Pacing"],
  "summary": "Audience loved the storytelling and performances, though pacing could be improved. Overall, a highly enjoyable movie experience."
}
