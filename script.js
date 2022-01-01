const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('qoute');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading 
function loading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete()
{
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quotes
function newQuotes()
{
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // authorText.textContent = quote.author;

    // check if author field is blank and replace it with 'unknown'
    if(!quote.author)
    {
        authorText.textContent = 'unknown;'
    }
        else
        {
            authorText.textContent = quote.author;
        }

    // check Quote length to determine styling
    if (quote.text.length > 125)
    {
        quoteText.classList.add('long-quote');
    }
        else
        {
            quoteText.classList.remove('long-quote');
        }

        // Set Quote, Hide Loader

    quoteText.textContent = quote.text;
    complete();
}

// Get qoutes from API
async function getQuotes()
{
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try
    {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();
    }
        catch(error)
        {
            // catch error here
        }
    
}

// Tweet Quote
function tweetQuote() 
{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

function fbShare()
{
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(facebookUrl, '_blank');
}

// Event listners
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click', fbShare);

// on Load
getQuotes();

// loading();

// // for using local db for quotes

// function newQuotes()
// {
//     // Pick a random quote from apiQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }
// newQuotes();