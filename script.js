//TODO: Categorise affirmations
function seededIndex(seed, length) {
  return Math.abs(Math.floor(Math.sin(seed) * 10000)) % length;
}

async function loadAffirmation() {
    const todayKey = new Date().toDateString();
    const savedDate = localStorage.getItem("affirmationDate");
    const savedText = localStorage.getItem("affirmationText");

    //Use saved affirmation if already generated today
    if (savedDate === todayKey && savedText) {
        document.getElementById("affirmation").textContent = savedText;
        return;
    }

    try {
        //Fetch text file
        const response = await fetch("affirmations.txt");
        const text = await response.text();

        //Convert to array (split by new lines)
        const affirmations = text
        .split("\n")
        .map(a => a.trim())
        .filter(a => a.length > 0);

        //Pick one based on date
        const seed = new Date(todayKey).getTime();
        const index = seededIndex(seed, affirmations.length);

        const affirmation = affirmations[index];

        //Save for the day
        localStorage.setItem("affirmationDate", todayKey);
        localStorage.setItem("affirmationText", affirmation);
        document.getElementById("affirmation").textContent = affirmation;

    } catch (error) {
        document.getElementById("affirmation").textContent = "I am doing my best, and that is enough.";
    }
}

loadAffirmation();