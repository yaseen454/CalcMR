# Warframe Mastery Rank Calculator (calcMr)

This is a web-based application that helps Warframe players calculate their current Mastery Rank (MR), track progress toward Legendary Rank 4 (LR4), and determine the optimal number of weapons and deployables needed to reach higher ranks based on a customizable XP distribution.

## Features

- **Mastery Rank Calculation**: Calculates your current Mastery Rank based on your total XP input.
- **Progress Tracking**: Shows your MR completion percentage toward Legendary Rank 4 (LR4).
- **Item Distribution**: Estimates the number of weapons (e.g., Primaries, Secondaries, Melees) and deployables (e.g., Warframes, Sentinels, Companions) needed to reach each higher rank, adjustable via a slider for weapon-to-deployable XP distribution (0%–100%).
- **Interactive Interface**: Features a modern, Warframe-themed design with a fixed slider for real-time adjustments, frozen table headers for easy reading, and mobile-responsive layout.

## How to Use

1. **Access the Application**:
   - Visit the hosted version (if deployed, e.g., via GitHub Pages) or clone this repository and run locally using a static file server (see Installation below).
   - Open `web-page.html` in a web browser.

2. **Input Your Data**:
   - Enter your current Mastery Rank XP in the "Enter Current MR XP" field.
   - Click "Calculate" to generate results.

3. **Adjust Distribution**:
   - Use the "Weapon Distribution" slider (fixed on the left or top, depending on screen size) to set the percentage of XP allocated to weapons vs. deployables (0%–100%).
   - Slide in real-time to see how the distribution affects the number of items needed for each rank.

4. **View Results**:
   - See your current Mastery Rank, progress percentage, and a detailed table of items needed for each rank above your current MR.
   - Scroll through the table (headers stay fixed), and observe XP differences colored green (positive, with `+`) or red (negative).

5. **Mobile Support**:
   - The app is responsive, stacking elements vertically on mobile devices (below 800px) and adjusting sizes for smaller screens.

## Installation

To run this web application locally:

1. **Clone the Repository**:
   - Use Git to clone this repository:
