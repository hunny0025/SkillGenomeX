#National Talent Intelligence Engine (SkillGenome X)

An AI-powered platform for national workforce intelligence, designed to identify hidden talent, predict skill gaps, and support data-driven policy decisions.

Overview

The National Talent Intelligence Engine transforms workforce analysis from simple degree counting into behavioral skill intelligence.

Instead of asking:

“What qualification does a person have?”

The system asks:

“What can this person actually do — regardless of degree, location, or digital presence?”

It analyzes 88 behavioral dimensions to build a Skill Genome for individuals and aggregates insights at state and national levels.

Problem Statement

India faces three major workforce challenges:

Hidden talent in rural and low-access regions

Skill mismatch between education and industry demand

Migration of skilled individuals due to lack of local opportunities

Over-reliance on digital signals (GitHub, LinkedIn) that ignore non-digital skills

This platform helps governments, NGOs, and planners:

Discover high-potential individuals

Identify digital divide zones

Predict migration risks

Design targeted skill and infrastructure interventions

Data Foundation

The system uses a high-fidelity synthetic national dataset:

12,500 individual profiles

20 Indian states

65% Rural / 35% Urban distribution

Digital Access levels: High / Limited / Offline

Opportunity Levels: High / Moderate / Low

24-month historical timeline for trend analysis

Dataset inspired by:

PLFS (Periodic Labour Force Survey)

NSSO skill distribution patterns

NSDC sector data

Anti-fraud logic includes anomaly detection using Isolation Forest.

Core Intelligence Architecture
1. Behavioral Skill Scoring

Each individual is scored (0–100) across behavioral vectors:

Creation Output (proof of work)

Learning Agility

Offline Capability

Digital Presence

Innovation & Problem Solving

Experience Consistency

Community Collaboration

Economic Activity

2. Domain-Specific Intelligence

Scoring logic adapts by sector:

Domain	Priority Signals
Technology	Digital presence, projects, GitHub
Agriculture	Offline capability, yield performance, field innovation
Creative	Portfolio output, originality
Business	Collaboration, economic activity
Skilled Trades	Experience consistency, offline work

This allows detection of:

Master craftsmen

Farmers with high productivity

Technicians without formal degrees

3. Hidden Talent Detection (Key Innovation)

Hidden Talent is identified when:

Skill Score > 70
AND (Rural OR Low Digital Access)


This helps identify:

High-potential individuals without digital footprints

Skilled workers outside formal systems

4. Growth & Trend Analysis

The system analyzes learning velocity:

Emerging Skills

Stable Skills

Declining Skills

Obsolescence Risk

Talent Velocity

5. National Risk Intelligence

State-level metrics include:

Digital Divide Risk

Skill Deficit

Migration Pressure

Composite Structural Risk:

Risk = 0.4 * Digital Divide
     + 0.4 * Skill Deficit
     + 0.2 * Migration Risk

Key Modules
Regional Intelligence Map

Interactive heatmap showing:

Hidden Talent Density

Structural Risk Zones

State Specialization

Market Pulse

Demand vs Supply analysis across domains:

Technology

Data & Research

Creative

Business

Skilled Trades

Social Impact

Identifies:

Talent shortages

Surplus sectors

Emerging pipelines

Skill Genome

Individual capability visualization:

Core Strength

Emerging Skills

Declining Skills

Cross-domain synergy

AI-based career transition pathways

Example:

Farmer → Sustainable Agriculture Consultant
Manual Tester → QA Automation Engineer

Policy Engine

Automatically generates recommendations:

Expand rural broadband

Launch state skill programs

Create local employment hubs

Promote remote work ecosystems

Alerts System

Real-time intelligence:

Structural risk warnings

Migration alerts

Skill decline signals

Technology Stack

Frontend

React (Vite)

Tailwind CSS

Framer Motion

Recharts

Lucide Icons

Backend

Python Flask

Pandas, NumPy

Scikit-learn

Gradient Boosting

Isolation Forest

Data

Synthetic national census generator

CSV / JSON based processing

Architecture

Monorepo Structure:

project/
│
├── backend/
│   app.py
│   models/
│   data/
│
├── frontend/
│   src/
│   components/
│
└── README.md

Running Locally
Backend
cd backend
pip install -r requirements.txt
python app.py


Runs on:

http://localhost:5000

Frontend
cd frontend
npm install
npm run dev


Runs on:

http://localhost:5173

Deployment

Frontend: Vercel
Backend: Render

Monorepo deployment with separate root directories.

Use Cases

Government workforce planning

State skill missions

NGO talent discovery

Rural employment programs

Digital divide assessment

Migration prevention strategies

Impact Vision

The system enables:

Discovery of hidden talent beyond degrees

Inclusion of non-digital workers

Data-driven policy instead of assumptions

Reduction of regional inequality

Smarter national workforce planning

Project Status

Prototype with:

Full-stack implementation

88 behavioral intelligence dimensions

National-level analytics

Real-time dashboards

Future Enhancements

Integration with real government datasets

ML-based demand forecasting

District-level intelligence

Mobile data collection app

Real-time labor market APIs
