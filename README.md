# MedBuddy

MedBuddy is a React-based health-safety companion for quick medicine checks, first-aid guidance, and local medicine safety alerts. It is designed for situations where a user may need clear next steps quickly, including areas with limited or unreliable internet access.

> MedBuddy is a decision-support tool, not a replacement for a qualified doctor or emergency service.

## What the website does

MedBuddy brings three practical tools into one simple workspace:

- **Medicine verifier:** Search for a medicine by name without a QR code, optionally enter its expiry month, and receive a clear result such as safe to review, check again, expired, or banned/restricted match.
- **Offline first-aid guide:** Select a situation such as a burn, cut, fever, snake bite, fainting, or chest pain and follow short step-by-step guidance. The guide also explains when professional help is needed.
- **Community medicine alerts:** View anonymous medicine concerns from a selected area and submit a report about suspicious packaging, an unexpected reaction, an expired medicine, or another concern.

The dashboard also includes an offline-data view, notifications, language selection, and account settings for profile, security, notification, and privacy preferences.

## How it works

1. Open the landing page and choose **Open MedBuddy**.
2. Create an account or sign in.
3. From the dashboard, choose the tool needed:
	- Search a medicine name and optionally check its expiry date.
	- Choose a first-aid scenario to see immediate steps and warning signs.
	- Review local alerts or submit an anonymous medicine concern.
4. Use the language selector to switch between English, Hindi, Bengali, Tamil, and Telugu.
5. Use **Offline data** to confirm which core first-aid and demo medicine content is available on the device.

## Current demo behavior

The current frontend is a working demo. Medicine verification uses a local sample dataset containing medicines such as Paracetamol, Dolo 650, Amoxicillin, and Nimesulide. Community alerts, account data, notifications, and settings are also represented locally in the UI; they are not connected to a production backend yet.

## Technology

- React 19
- Vite
- React Router
- Tailwind CSS tooling
- Framer Motion
- Lucide React icons
- Oxlint

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Other commands

```bash
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint    # Run Oxlint
```

## Project structure

```text
src/
├── App.jsx                 # Application routes and language provider
├── pages/
│   ├── LandingPage.jsx     # Public introduction and feature overview
│   ├── LoginPage.jsx       # Sign-in screen
│   ├── SignupPage.jsx      # Account creation screen
│   └── Dashboard.jsx       # Medicine, first-aid, alerts, offline data, settings
├── context/
│   └── LanguageContext.jsx # Shared language state
├── App.css                 # Application component styles
└── index.css               # Global styles
```

## Safety note

Medicine results and first-aid content are informational examples for the demo. Always read the medicine packaging, follow a qualified professional's advice, and contact local emergency services for serious or worsening symptoms.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
