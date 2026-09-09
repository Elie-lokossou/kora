# Kora 🌍

### Your Economic Identity
**Making economic activity visible.**

> **Équipe — commencez ici :** [docs/START-HERE.md](./docs/START-HERE.md) · [docs/PLAYBOOK.md](./docs/PLAYBOOK.md) · [docs/BACKLOG.md](./docs/BACKLOG.md)
>
> ```bash
> npm install
> npm run dev
> ```
> Ouvre `/dashboard`. Les 6 écrans du parcours démo tournent **sans backend**, avec le jeu Mariam. Convex vient ensuite (`npx convex dev`, jamais `deploy` pendant le hackathon).

Kora is a consent-based **Economic Data Passport** designed to help small businesses transform their real-world economic activity into structured, understandable and shareable data.

Today, an entrepreneur can have customers, revenue, suppliers and years of business activity — yet remain financially invisible because that information is fragmented across mobile money accounts, sales records, inventory systems, bank accounts and paper records.

Kora turns that fragmented activity into a portable economic identity.

---

## 🚨 The Problem

A small entrepreneur's economic life is scattered across multiple systems:

```text
                  SALES
                    │
                    ▼
             ┌───────────┐
             │ BUSINESS  │
             └───────────┘
               │   │   │
        ┌──────┘   │   └──────┐
        ▼          ▼          ▼
     Mobile       Bank    Inventory
      Money      Records
        │          │          │
        └──────────┼──────────┘
                   ▼
          DATA FRAGMENTATION
                   │
                   ▼
         ❌ Difficult to verify
         ❌ Difficult to share
         ❌ Difficult to reuse
```

The entrepreneur may be economically active without having a structured representation of that activity.

**The missing layer:** A portable, consent-based economic identity.

---

## 💡 Our Solution

Kora creates an Economic Data Passport from the entrepreneur's business activity.

```text
             Business Data
                   │
                   ▼
        ┌────────────────────┐
        │    KORA ENGINE     │
        │                    │
        │ • Data ingestion   │
        │ • Normalization    │
        │ • AI analysis      │
        │ • Insights         │
        └─────────┬──────────┘
                  │
                  ▼
        ┌────────────────────┐
        │ ECONOMIC PASSPORT  │
        │                    │
        │ • Revenue          │
        │ • Cash flow        │
        │ • Growth           │
        │ • Activity patterns│
        │ • Business signals │
        └─────────┬──────────┘
                  │
                  ▼
          CONSENTED SHARING
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
       Bank    Fintech   Supplier
```

The entrepreneur remains in control of what information is shared and with whom.

---

## ✨ What Kora Does

### 1. Connect economic data
Import or connect business information such as:
- Sales
- Transactions
- Cash flow
- Inventory
- Supplier payments
- Repayment history

### 2. Understand the activity
Kora transforms raw data into meaningful business insights:
- Revenue trends
- Activity consistency
- Growth
- Cash-flow patterns
- Anomalies
- Business risks and opportunities

### 3. Build the Economic Passport
Kora generates a structured profile representing the entrepreneur's economic activity.

### 4. Share with consent
The entrepreneur can selectively share information with a third party.

*Example:*
```text
┌──────────────────────────────────────────────┐
│           ABC BANK REQUESTS ACCESS           │
│                                              │
│  ✓  Revenue history                          │
│  ✓  Cash-flow summary                        │
│  ✓  Repayment history                        │
│  ✗  Customer-level transactions              │
│  ✗  Personal information                     │
│                                              │
│  Access duration: 30 days                    │
│                                              │
│                 [ AUTHORIZE ]                │
└──────────────────────────────────────────────┘
```

---

## 🤖 Where AI Fits

AI is **not** the decision maker.  
Kora uses AI to interpret economic data and make complex information understandable.

For example:
- **Raw data:** `June: 312,000 FCFA` | `July: 341,000 FCFA` | `August: 386,000 FCFA`
- **Kora:** *"Revenue increased by approximately 24% over the period, with a consistent upward trend."*

The goal is to transform data into evidence and insight, not an opaque automated credit decision.

---

## 🔐 Privacy by Design

Economic data is sensitive. Kora is designed around:
- **User consent**
- **Selective data sharing**
- **Access duration**
- **Data minimization**
- **Auditability**
- **Secure authentication**
- **Clear separation** between raw data and derived insights

The entrepreneur should not have to surrender their entire financial history just to prove one aspect of their business.

---

## 🧪 Current MVP

Our hackathon prototype demonstrates the complete journey:

```text
Entrepreneur ➔ Import business data ➔ Kora analyzes activity ➔ Economic Passport generated ➔ Entrepreneur selects what to share ➔ Third party receives authorized information
```

### MVP Screens
- 📊 **Entrepreneur Dashboard**
- 📥 **Data Import**
- 🧠 **AI Economic Analysis**
- 🪪 **Economic Passport**
- 🔒 **Consent & Sharing**
- 🏦 **Finance Partner View**

---

## 🏗️ Technology

The prototype is designed as a modern web application.

- **Frontend:**
  - React / Next.js
  - Tailwind CSS
  - Responsive interface
  - Data visualization
- **Backend:**
  - API-based architecture
  - Structured economic data
  - Authentication
  - Consent management
- **AI:**
  - LLM-powered data interpretation
  - Automated business insights
  - Anomaly detection
  - Natural-language explanations
- **Security:**
  - Authentication
  - Role-based access
  - Consent-based authorization
  - Minimal data exposure

---

## 🎯 Why Kora?

- Kora is **not** another budgeting app.
- Kora is **not** a traditional credit score.
- Kora is **not** a chatbot for entrepreneurs.

**Our thesis is different:**  
The entrepreneur should be able to own and control a portable representation of their economic activity.  
Banks, fintechs, insurers and suppliers can build their own decisions on top of that information.

---

## 🌍 Starting in Benin

We are starting with a simple question:  
*Can we make the economic activity of an entrepreneur visible without forcing them to become fully formal before they can access opportunities?*

Our first target is small businesses operating in Benin and, eventually, across African markets where economic activity is often more advanced than the financial data representing it.

---

## 🚀 Roadmap

- **Phase 1 — Hackathon MVP**
  - Economic data ingestion
  - AI analysis
  - Economic Passport
  - Consent-based sharing
- **Phase 2 — Local pilot**
  - Interview and onboard entrepreneurs
  - Validate real data sources
  - Test passport usefulness
  - Improve privacy and UX
- **Phase 3 — Financial ecosystem**
  - Integrate financial data providers
  - Partner with fintechs and financial institutions
  - Develop standardized economic data APIs
- **Phase 4 — African Economic Identity Layer**
  - Build infrastructure that allows entrepreneurs to carry their economic identity across financial services and business ecosystems.

---

## 🏆 Cursor Hackathon — Benin 2026

Built by **Kora Labs** for the **Cursor × Devs Days Hackathon** in Cotonou, Benin.

### Team
- **John Elie Lokossou** — Product Lead & Full-Stack Developer
- **Ronald Bill Hounnou** — Frontend Developer & Content Creator
- **Euloge Sozan** — Backend Developer
- **Hanniel Happy Zinsou** — AI/Data & Cybersecurity

---

## 🔗 Links

- **GitHub:** [https://github.com/Elie-lokossou/kora](https://github.com/Elie-lokossou/kora)
- **Portfolio:** [https://jel-portfolio.netlify.app/](https://jel-portfolio.netlify.app/)

---

## 💭 Our Vision

> *Every entrepreneur creates economic value.*  
> *Kora makes that value visible.*  
> 
> **Kora — Your Economic Identity.**
