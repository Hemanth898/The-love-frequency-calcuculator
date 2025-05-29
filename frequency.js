function countLettersCombined(name1, name2) {
  const combined = (name1 + name2).toLowerCase().replace(/[^a-z]/g, "");

  // Count occurrences of each letter
  const countsMap = {};
  for (let ch of combined) {
    countsMap[ch] = (countsMap[ch] || 0) + 1;
  }

  // Create a string of counts in the order of letters appearing (no duplicates)
  const seen = new Set();
  let countsStr = "";
  for (let ch of combined) {
    if (!seen.has(ch)) {
      countsStr += countsMap[ch];
      seen.add(ch);
    }
  }
  return countsStr;
}

// Add extreme digits until length <= 2
function reduceNumber(numStr) {
  while (numStr.length > 2) {
    let newStr = "";
    let i = 0;
    let j = numStr.length - 1;

    while (i <= j) {
      if (i === j) {
        newStr += numStr[i]; // Middle digit if odd length
      } else {
        const sum = Number(numStr[i]) + Number(numStr[j]);
        newStr += sum.toString();
      }
      i++;
      j--;
    }
    numStr = newStr;
  }
  return numStr;
}

function calculateLovePercentage(name1, name2) {
  const countsStr = countLettersCombined(name1, name2);
  const lovePercentStr = reduceNumber(countsStr);
  return Number(lovePercentStr);
}

// Interaction handler
function handleSubmit() {
  let name1 = document.getElementById("name1").value.trim();
  let name2 = document.getElementById("name2").value.trim();

  if (!name1) {
    name1 = prompt("Please enter the first partner's name:", "");
    if (name1) {
      document.getElementById("name1").value = name1;
    } else {
      alert("First partner's name is required.");
      return;
    }
  }

  if (!name2) {
    name2 = prompt("Please enter the second partner's name:", "");
    if (name2) {
      document.getElementById("name2").value = name2;
    } else {
      alert("Second partner's name is required.");
      return;
    }
  }

  const lovePercent = calculateLovePercentage(name1, name2);
  document.getElementById("result").textContent = `🎉 Congratulations! You got ${lovePercent}%`;
}
