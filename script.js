const quoteContainer = document.getElementById("quote-container");
const quoteText = document.querySelector(".quote-text span");
const author = document.getElementById("author");
const tweetBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function fetchComplete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

async function getQuotes() {
  showLoading();
  const proxy = "https://secure-scrubland-49251.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxy + apiURL);
    const data = await response.json();
    console.log(data);

    if (data.quoteAuthor === "") {
      author.innerText = "Unknown";
    } else {
      author.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > 80) {
      quoteText.classList.add("long-quote");
      author.classList.add("long-quote");
    }

    quoteText.innerText = data.quoteText;
    fetchComplete();
  } catch (err) {
    getQuotes();
  }
}

// Tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const authorName = author.innerText;
  const tweetURL = `https://twitter.com/intent/tweet?text=${quote} - ${authorName}`;
  window.open(tweetURL, "_blank");

  console.log(`quote: ${quote}, author: ${authorName}`);
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuotes);
tweetBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
