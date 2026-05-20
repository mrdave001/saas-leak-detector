# SaaS Leak Detector: AI-Powered Subscription Intelligence

## 🚀 Overview
A high-performance system designed to identify redundant SaaS expenditures and hidden financial waste within corporate billing cycles. This implementation leverages LLMs to categorize unstructured banking data and identify overlapping service capabilities across different vendors.

## 🛠 Engineering Architecture
- **Frontend**: Next.js 15 with React Server Components (RSC) for optimized data fetching.
- **AI Orchestration**: OpenAI GPT-4o for semantic analysis of transaction descriptions.
- **Data Pipeline**: Structured processing of CSV/PDF billing exports into a normalized schema.
- **State Management**: Type-safe data flow using TypeScript and Zod for runtime validation.

## 🧠 Technical Challenges & Solutions
- **Noise Reduction**: Implemented a custom filtering layer to strip common transaction noise before passing data to the LLM, reducing token consumption by 40%.
- **Overlap Detection**: Developed a capability-mapping logic that identifies when two different subscriptions (e.g., Zoom and Google Meet) provide redundant utility.
- **Scalability**: Architected the system to handle large-scale corporate exports without hitting Vercel's serverless timeout limits.

## ⚡ Key Features
- **Automated Waste Discovery**: Identifies 'ghost' subscriptions and underutilized seats.
- **Semantic Categorization**: Groups spending by function rather than just vendor name.
- **Financial Impact Analysis**: Calculates precise monthly/annual leakage in real-time.

## 🏗 Installation & Setup
```bash
npm install
npm run dev
```
Configure environment variables in `.env.local`:
- `OPENAI_API_KEY`: Your OpenAI API key.
- `DATABASE_URL`: Connection string for the data store.

## 📜 License
MIT
