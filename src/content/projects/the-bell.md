---
name: "The Bell"
tagline: "A round-based HIIT timer for Apple Watch"
order: 4
tile:
  group: "indie"
  image: "../../assets/images/the-bell.svg"
  imageAlt: "The Bell"
  platforms: "watchOS · Design"
color: "#333333"
accent: "#806600"
header:
  foreground: "#2e2a1a"
illustration:
  image: "../../assets/images/the-bell-showcase.svg"
  alt: "The Bell preview"
  layout: "phone"
  background: "#f7cd0a"
dates:
  from: "May 2020"
  to: "2024"
role: "Creator: design and development"
technologies:
  - heading: "First version (2020)"
    items:
      - "swift"
      - "watchkit"
      - "grdb"
  - heading: "SwiftUI rewrite (2023)"
    items:
      - "swift"
      - "swift-ui"
      - "grdb"
links:
  - kind: "watchos"
    href: "http://itunes.apple.com/us/app/apple-store/id1522205874?mt=8"
  - kind: "website"
    href: "https://github.com/ephread/TheBell"
    label: "View on GitHub"
---

The Bell is a watchOS app for timing and recording HIIT workouts. I designed it to feel like a natural part of the Apple Watch, closely mirroring the look and feel of the built-in Workout app.

Its minimalist design keeps the focus on what matters during a workout: the elapsed time, a sound and a tap on the wrist when a round changes, and every completed workout saved to the Activity app.

I first built it with WatchKit in 2020, then rewrote it with SwiftUI and modern Swift concurrency in 2023.
