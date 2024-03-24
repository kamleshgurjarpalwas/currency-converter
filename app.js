const dropDowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let data;
const msg = document.querySelector(".msg");

for (let select of dropDowns) {
  for (currcCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcCode;
    newOption.value = currcCode;
    if (select.name === "from" && currcCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
  }
  let response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`
  );
  data = await response.json();
  let rate = data.rates[toCurr.value];
  let finalAmount = rate * amtVal;
  msg.innerText = `${amtVal}${fromCurr.value}=${finalAmount}${toCurr.value}`;
};

const updateFlag = (element) => {
  let currcCode = element.value;
  let countryCode = countryList[currcCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
