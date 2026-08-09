const quotes = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { quote: "Happiness depends upon ourselves.", author: "Aristotle" }
];

const quoteText = document.getElementById("quote-text");
const authorName = document.getElementById("author-name");
const newQuoteBtn = document.getElementById("new-quote-btn");

let currentQuote = "";
let currentAuthor = "";

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selected = quotes[randomIndex];

    currentQuote = selected.quote;
    currentAuthor = selected.author;

    quoteText.innerText = `"${currentQuote}"`;
    authorName.innerText = `- ${currentAuthor}`;
}

// 1. WhatsApp Real Direct Forward
document.getElementById("whatsapp-btn").addEventListener("click", () => {
    const message = `*Quote of the Day:*\n"${currentQuote}"\n\n— *${currentAuthor}*`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
});

// 2. Facebook Share Dialog
document.getElementById("fb-btn").addEventListener("click", () => {
    const shareText = `"${currentQuote}" - ${currentAuthor}`;
    const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
});

// 3. Messenger Share
document.getElementById("msg-btn").addEventListener("click", () => {
    const shareText = `"${currentQuote}" - ${currentAuthor}`;
    const url = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(window.location.href)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
});

// 4. Twitter / X Share
document.getElementById("tweet-btn").addEventListener("click", () => {
    const tweetText = `"${currentQuote}" - ${currentAuthor}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, "_blank");
});

// 5. Instagram Copy Support
document.getElementById("insta-btn").addEventListener("click", () => {
    const fullText = `"${currentQuote}" - ${currentAuthor}`;
    navigator.clipboard.writeText(fullText);
    alert("Quote copied to clipboard! Open Instagram to paste it in your Story or DM.");
});

// 6. Direct Copy Button
document.getElementById("copy-btn").addEventListener("click", () => {
    const fullText = `"${currentQuote}" - ${currentAuthor}`;
    navigator.clipboard.writeText(fullText);
    alert("Quote copied!");
});

// 7. Mobile Native System Share (Forward to any installed App)
document.getElementById("native-share-btn").addEventListener("click", async () => {
    const shareData = {
        title: 'Daily Quote',
        text: `"${currentQuote}" - ${currentAuthor}`,
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log("Share cancelled");
        }
    } else {
        navigator.clipboard.writeText(`"${currentQuote}" - ${currentAuthor}`);
        alert("Quote copied! (Native Share is supported on mobile browsers)");
    }
});

newQuoteBtn.addEventListener("click", getRandomQuote);
window.onload = getRandomQuote;
