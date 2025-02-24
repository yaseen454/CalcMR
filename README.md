# Warframe Mastery Rank Calculator (calcMr)

This is a web-based application that helps Warframe players calculate their current Mastery Rank (MR), track progress toward Legendary Rank 4 (LR4), and determine the optimal number of weapons and deployables needed to reach higher ranks based on a customizable XP distribution.

## Features

- **Mastery Rank Calculation**: Calculates your current Mastery Rank based on your total XP input.
- **Progress Tracking**: Shows your MR completion percentage toward Legendary Rank 4 (LR4).
- **Item Distribution**: Estimates the number of weapons (e.g., Primaries, Secondaries, Melees) and deployables (e.g., Warframes, Sentinels, Companions) needed to reach each higher rank, adjustable via a slider for weapon-to-deployable XP distribution (0%–100%).
- **Interactive Interface**: Features a modern, Warframe-themed design with a fixed slider for real-time adjustments, frozen table headers for easy reading, and mobile-responsive layout.

## How to Use

1. **Access the Application**:
   - Visit the hosted version on Netlify at [calcmr.netlify.app](https://calcmr.netlify.app/)
   - Alternatively, clone this repository and run locally using a static file server (see Installation below).

2. **Input Your Data**:
   - Enter your current Mastery Rank XP in the "Enter Current MR XP" field.
   - Click "Calculate" to generate results.

3. **Adjust Distribution**:
   - Use the "Weapon Distribution" slider (fixed on the left or top, depending on screen size) to set the percentage of XP allocated to weapons vs. deployables (0%–100%).
   - Slide in real-time to see how the distribution affects the number of items needed for each rank.

4. **View Results**:
   - See your current Mastery Rank, progress percentage, and a detailed table of items needed for each rank above your current MR.
   - Scroll through the table, and observe XP differences colored green (positive, with `+`) or red (negative).

## Installation

To run this web application locally:

1. **Clone the Repository**:
   - Use Git to clone this repository:

```
git clone https://github.com/yaseen454/CalcMR clone/path/here
```

- Navigate to the project directory:

```
cd cloned/path/here
```

2. **Install a Static File Server**:

- Install Node.js (if not already installed) from [nodejs.org](https://nodejs.org/).
- Install `http-server` globally:

```
npm install -g http-server
```

- Start the server in the project directory:

`npx http-server` or `http-server`

- Open your browser and navigate to `http://localhost:8080/web-page.html`.

3. **Access the Live Version**:

- The app is hosted on Netlify at [calcmr.netlify.app](https://calcmr.netlify.app/). No local setup is required to use the live version.

## Dependencies

- No server-side dependencies required—just static HTML, CSS, and JavaScript.
- Requires an internet connection to load Google Fonts (`Roboto` and `Orbitron`) unless hosted locally.
- Includes `masteryData.json` for Mastery Rank data—ensure it’s in the root directory or adjust paths.

## License

This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.

## Contributing

Feel free to fork this repository, submit issues, or pull requests on GitHub. Contributions are welcome to improve functionality, design, or documentation.

## Contact

For questions or feedback, contact [yaseenshahin2003@gmail.com](mailto:your-email@example.com) or open an issue on GitHub.
