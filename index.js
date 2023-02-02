const fromEl = document.getElementById("cc-from");
const toEl = document.getElementById("cc-to");
const inputEl = document.getElementById("cc-input");
const convertBtn = document.getElementById("cc-btn");
const errorEl = document.getElementById("cc-error");
const answerEl = document.getElementById("cc-answer");
const currencies = ['EUR','USD','JPY','BGN','CZK','DKK','GBP','HUF','PLN','RON','SEK','CHF','ISK','NOK','HRK','RUB','TRY','AUD','BRL','CAD','CNY','HKD','IDR','ILS','INR','KRW','MXN','MYR','NZD','PHP','SGD','THB','ZAR'];
let currencyOptions = "";
let response = {};
let ratio = "";

for (let i = 0; i < currencies.length; i++) {
    currencyOptions += `<option value="${currencies[i]}">${currencies[i]}</option>`
}

fromEl.innerHTML = currencyOptions;
fromEl.value = "USD";
toEl.innerHTML = currencyOptions;
toEl.value = "INR";

convertBtn.addEventListener("click", function(){
    if (!inputEl.value || inputEl.value <= 0 ) {
        errorEl.textContent = "Enter an input greater than 0.";
    } else {
        errorEl.textContent = "";
        let input = inputEl.value;
        let from = fromEl.value;
        let to = toEl.value;

        let xchReq = new XMLHttpRequest();
        xchReq.addEventListener("load", function () {
            response = JSON.parse(this.responseText);
            ratio = response.data[to];
            answerEl.textContent = formatAnswer(input * ratio, to);
            answerEl.classList.add("can-copy");
        });
        xchReq.open("GET", `https://api.freecurrencyapi.com/v1/latest?currencies=${to}&base_currency=${from}`);
        xchReq.setRequestHeader("apikey", "jjxTHZXQf5zUbpj6ZgfT3FyzJ7nVIW42AmcZFcMK");
        xchReq.send();
    }
});

function formatAnswer(value, curr) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: curr }).format(value);
}

answerEl.addEventListener("click", function() {
    copyText = answerEl.textContent;
    if (!copyText) {
        return;
    } else {
        navigator.clipboard.writeText(copyText);
        answerEl.classList.add("copied");
        setTimeout(function() {
            answerEl.classList.remove("copied");
        }, 2000);
    }
});
