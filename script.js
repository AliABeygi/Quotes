const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loadin
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show New Quote
function newQuotes() {
  loading();
  // Pick a random quote fom apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Authorfield is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check the length to determine styling

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set quote, Hide loader
  quoteText.textContent = quote.text;
  complete();
}
// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const respose = await fetch(apiUrl);
    apiQuotes = await respose.json();
    newQuotes();
  } catch (error) {
    //  Catch Error Here
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();
