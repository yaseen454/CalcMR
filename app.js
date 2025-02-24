document.addEventListener('DOMContentLoaded', function() {
    let mastery = null;

    // Function to calculate and display results
    async function updateResults(weapon_distribution) {
        if (!mastery) {
            console.warn("MasteryAccount not initialized yet.");
            return;
        }

        await mastery.loadData();
        mastery.calculateMR();

        let result = '<div class="section-header">OVERVIEW</div>';
        result += mastery.summary();

        result += '<div class="section-header">ITEMS NEEDED FOR EACH MASTERY RANK</div>';
        const itemsData = mastery.itemsNeeded(weapon_distribution);
        result += '<div class="distribution-text">(' + Math.round(weapon_distribution * 100) + '% Weapon XP Distribution) & (' + Math.round((1 - weapon_distribution) * 100) + '% Deployable XP Distribution)</div>';
        
        result += `<table border="1">
            <tr>
                <th>Rank Name</th>
                <th>Rank Number</th>
                <th>Weapon Count</th>
                <th>Deployable Count</th>
                <th>Weapons XP</th>
                <th>Deployables XP</th>
                <th>Total XP Achieved</th>
                <th>Total XP Required</th>
                <th>XP Difference</th>
            </tr>`;
        
        itemsData.forEach(row => {
            result += `<tr>
                <td>${row["Rank Name"]}</td>
                <td>${row["Rank Number"]}</td>
                <td>${row["Weapon Count"]}</td>
                <td>${row["Deployable Count"]}</td>
                <td>${row["Weapons XP"]}</td>
                <td>${row["Deployables XP"]}</td>
                <td>${row["Total XP Achieved"]}</td>
                <td>${row["Total XP Required"]}</td>
                <td style="color: ${row["XP Difference"] > 0 ? '#88f73a' : '#e13030'}">${row["XP Difference"] > 0 ? '+' + row["XP Difference"] : row["XP Difference"]}</td>
            </tr>`;
        });
        result += `</table>`;

        document.getElementById('results').innerHTML = result;
    }

    // Button click handler
    const calcButton = document.getElementById('mrCalc');
    if (calcButton) {
        calcButton.addEventListener('click', async function() {
            const xpInput = document.getElementById('mrInput').value;
            if (!xpInput || isNaN(xpInput)) {
                alert("Please enter a valid XP number");
                return;
            }

            mastery = new MasteryAccount(xpInput);
            const slider = document.getElementById('distSlider');
            if (!slider) {
                console.error("Slider element not found!");
                return;
            }
            const weapon_distribution = slider.value / 100;
            await updateResults(weapon_distribution);
        });
    } else {
        console.error("Calculate button not found!");
    }

    // Slider change handler
    const slider = document.getElementById('distSlider');
    if (slider) {
        slider.addEventListener('input', function() {
            const weapon_distribution = this.value / 100;
            document.getElementById('distValue').textContent = this.value;
            updateResults(weapon_distribution);
        });
    } else {
        console.error("Slider element not found!");
    }
});