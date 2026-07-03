# Spark Homes Submission Checklist
# Deadline: July 14, 2026

## Step 1 — Fix README encoding (2 min)
Open README.md in VS Code:
  File menu → Save with Encoding → UTF-8
Then save. This ensures GitHub renders it properly.

## Step 2 — Clear git lock and push (if not done yet)
Run these commands in the project folder:

  del .git\index.lock          (only if VS Code is holding the lock)
  git add -A
  git commit -m "feat: complete submission build - all fixes applied"
  git push origin main

## Step 3 — Enable GitHub Pages (5 min)
1. Go to your repo on github.com
2. Settings → Pages (left sidebar)
3. Source: "Deploy from a branch"
4. Branch: main / (root)
5. Save
6. Wait ~2 minutes, then your app is live at:
   https://[your-username].github.io/spark-repair-estimator/

## Step 4 — Convert writeup to PDF (3 min)
1. Open writeup-print-as-pdf.html in Chrome
2. Click the orange "Print / Save as PDF" button at the top
3. Change destination to "Save as PDF"
4. Margins: None (or Minimum)
5. Uncheck "Headers and footers"
6. Save as: spark-estimator-writeup.pdf

## Step 5 — Fill in the writeup footer (1 min)
Before printing, update the footer line in writeup-print-as-pdf.html:
  Replace [your-username] with your actual GitHub username
  The live URL and repo URL will then be correct in the footer

## Step 6 — Send submission email
To: James@sparkequitygroup.com
Subject: Spark Homes Developer Challenge Submission — Spark Repair Estimator
Body: (see SUBMISSION_EMAIL.md)
Attachments: spark-estimator-writeup.pdf

## What's in your submission
- index.html        → The app (single file, no build needed)
- sw.js             → Service worker for offline support
- manifest.json     → PWA manifest
- icon-192.png      → App icon
- icon-512.png      → App icon (large)
- README.md         → Approach, libraries, how to run

## Scoring breakdown (per brief)
- Mobile UX       30%  → Mobile-first, touch targets, bottom nav, progress bar
- Feature Complete 25%  → 75+ items, 7 sections, photos, export, multi-project
- Code Quality    20%  → Single state object, no frameworks, clean functions
- PWA             15%  → Service worker, manifest, installable, offline
- Creative        10%  → Deal Analyzer, BRRRR, Risk Score, OCR, Voice Notes
