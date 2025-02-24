class MasteryAccount {
    constructor(current_xp) {
        this.current_xp = parseInt(current_xp);
        this.name = '';
        this.rank = 0;
        this.ranks_left = 0;
        this.wDistribution = 0;
        this.itemsDictionary = {};
        this.masteryData = [];
        this.filteredData = [];
        this.itemsData = [];
        this.loadData().then(() => this.calculateMR());
    }

    async loadData() {
        try {
            const response = await fetch('./data/masteryData.json');
            if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
            this.masteryData = await response.json();
        } catch (error) {
            console.error("Error loading mastery data:", error);
        }
    }

    calculateMR() {
        if (this.masteryData.length === 0) {
            console.warn("Mastery data not loaded yet.");
            return;
        }
        for (let i = 0; i < this.masteryData.length - 1; i++) {
            if (this.current_xp >= this.masteryData[i]["Total XP Required"] && 
                this.current_xp < this.masteryData[i + 1]["Total XP Required"]) {
                this.rank = this.masteryData[i]["Rank Number"];
                this.name = this.masteryData[i]["Rank Name"];
                this.ranks_left = this.masteryData.length - i - 1;
                break;
            }
        }
        if (this.current_xp >= this.masteryData[this.masteryData.length - 1]["Total XP Required"]) {
            this.rank = this.masteryData[this.masteryData.length - 1]["Rank Number"];
            this.name = this.masteryData[this.masteryData.length - 1]["Rank Name"];
            this.ranks_left = 0;
        }
    }

    xpNeeded(rank) {
        if (rank <= this.rank) return 0;
        let targetXP = this.masteryData.find(data => data["Rank Number"] === rank)?.["Total XP Required"] || 0;
        return targetXP - this.current_xp;
    }

    totalMRCompletion() {
        const maxXP = 2840000;
        return Math.round((this.current_xp / maxXP) * 100, 2);
    }

    summary() {
        let output = '<div class="summary-text">';
        if (this.current_xp >= 2840000) {
            output += 'You have achieved maximum mastery (LR4)';
        } else {
            output += `You are: ${this.name}: Mastery Rank ${this.rank}`;
            output += `<br>Achieved ${this.totalMRCompletion()}% MR completion (LR4)`;
        }
        output += '</div>';
        return output;
    }

    optimalItemsDistribution(target_rank, weapon_distribution = 0.5) {
        const deployable_distribution = 1 - weapon_distribution;
        const total_xp_needed = this.xpNeeded(target_rank);
        if (total_xp_needed <= 0) return { weapons: 0, deployables: 0, weaponsXP: 0, deployablesXP: 0, totalXPAchieved: 0 };

        const itemXP = { 'Weapons': 3058, 'Deployables': 6000 };
        const maxCounts = { 'Weapons': 619, 'Deployables': 157 };

        let weaponsXP = total_xp_needed * weapon_distribution;
        let weapons = Math.min(Math.ceil(weaponsXP / itemXP['Weapons']), maxCounts['Weapons']);
        let achievedWeaponsXP = weapons * itemXP['Weapons'];

        let remainingXP = total_xp_needed - achievedWeaponsXP;
        let deployables = Math.min(Math.ceil(remainingXP / itemXP['Deployables']), maxCounts['Deployables']);
        let achievedDeployablesXP = deployables * itemXP['Deployables'];

        let totalXPAchieved = achievedWeaponsXP + achievedDeployablesXP;

        return { weapons, deployables, weaponsXP: achievedWeaponsXP, deployablesXP: achievedDeployablesXP, totalXPAchieved };
    }

    filterDataSet() {
        this.filteredData = this.masteryData.slice(this.masteryData.findIndex(data => data["Rank Number"] === this.rank) + 1)
            .map(data => ({
                ...data,
                "Total XP Required": data["Total XP Required"] - this.current_xp
            }));
        return this.filteredData;
    }

    itemsNeeded(weapon_distribution = 0.5) {
        if (this.masteryData.length === 0) {
            console.warn("Mastery data not loaded yet.");
            return [];
        }

        this.wDistribution = Math.round(weapon_distribution * 100);
        const ranks = this.filterDataSet().map(data => data["Rank Number"]);
        const wep_counts = [];
        const dep_counts = [];
        const wep_xp = [];
        const dep_xp = [];
        const xp_achieved = [];

        for (let rank of ranks) {
            const dist = this.optimalItemsDistribution(rank, weapon_distribution);
            wep_counts.push(dist.weapons);
            dep_counts.push(dist.deployables);
            wep_xp.push(dist.weaponsXP);
            dep_xp.push(dist.deployablesXP);
            xp_achieved.push(dist.totalXPAchieved);
        }

        this.itemsDictionary = {
            "Weapon Count": wep_counts,
            "Deployable Count": dep_counts,
            "Weapons XP": wep_xp,
            "Deployables XP": dep_xp,
            "Total XP Achieved": xp_achieved
        };

        this.itemsData = this.filteredData.map((data, index) => ({
            "Rank Name": data["Rank Name"],
            "Rank Number": data["Rank Number"],
            "Weapon Count": wep_counts[index],
            "Deployable Count": dep_counts[index],
            "Weapons XP": wep_xp[index],
            "Deployables XP": dep_xp[index],
            "Total XP Achieved": xp_achieved[index],
            "Total XP Required": data["Total XP Required"],
            "XP Difference": xp_achieved[index] - data["Total XP Required"]
        }));

        return this.itemsData;
    }
}