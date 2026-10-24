---
name: "DBLG2"
tagline: "A hybrid closed-loop system for Type 1 diabetes."
order: 2
tile:
  group: "featured"
  image: "../../assets/images/diabeloop.svg"
  imageAlt: "Diabeloop"
  platforms: "iOS · Android · Lead Mobile Developer"
  eyebrow: "Diabeloop · 2021 – 2022"
  logoWidth: "48%"
color: "#00a3e2"
accent: "#0072a0"
header:
  subtitle: "A hybrid closed-loop system for Type 1 diabetes, now on smartphones."
  logo: "../../assets/images/diabeloop.svg"
  logoAlt: "Diabeloop"
illustration:
  image: "../../assets/images/dblg2-showcase@2x.png"
  alt: "DBLG2 on Android: the home screen with glucose curve and insulin deliveries, and the authentication screen"
  layout: "device"
  maxWidth: "20rem"
  shadow: true
dates:
  from: "June 2021"
  to: "November 2022"
client: "Diabeloop, Grenoble"
role: "Senior iOS Developer, then Lead Mobile Developer"
details:
  - label: "Standards"
    value: "IEC 62304 · ISO 13485"
technologies:
  - heading: "iOS"
    items:
      - "swift"
      - "swift-ui"
      - "grdb"
      - "bluetooth"
  - heading: "Android"
    items:
      - "kotlin"
      - "jetpack-compose"
      - "bluetooth"
links:
  - kind: "android"
    href: "https://play.google.com/store/apps/details?id=com.diabeloop.dblg2"
  - kind: "website"
    href: "https://www.dbl-diabetes.com/dblg2-system"
---

DBLG2 automates insulin delivery for adults with Type 1 diabetes. It adjusts the dose at the right time, based on the patient’s profile, their current and predicted glucose, and the meals and physical activity they announce.

I joined Diabeloop to prototype this next-generation closed-loop system. The prototype grew into a full project, and as engineering lead I built and led a team of three iOS and four Android developers to take it to production. We used SwiftUI, async/await and an Elm/Redux-inspired architecture to build a safe, reliable system that complies with medical software standards.

We put a strong emphasis on testing and documentation throughout, and worked with cybersecurity experts to add obfuscation and follow OWASP practices. I also led the creation of the company-wide logging framework and its specification, and built a portable CI/CD stack from scratch with Fastlane, Gitleaks and MobSF that caught issues early.

I left the project before its release, when I relocated to Canada, but I’m very proud of what the team accomplished.
