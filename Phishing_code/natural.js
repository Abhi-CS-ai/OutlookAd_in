// Import the natural NLP library
const natural = require('natural');

// Phishing keywords list
const phishingKeywords = ["urgent", "verify", "click", "here", "update", "your", "account", "password", "reset"];

// Initialize the tokenizer
const tokenizer = new natural.WordTokenizer();

// Phishing detection function
function detectPhishing(emailBody) {
    // Tokenize the email body into individual words
    const tokens = tokenizer.tokenize(emailBody.toLowerCase());

    // Find keywords from the phishingKeywords list that match tokens in the email body
    const matchedKeywords = tokens.filter(token => phishingKeywords.includes(token));

    // Calculate phishing score based on the proportion of matched keywords in the email tokens
    const phishingScore = (matchedKeywords.length / tokens.length) * 100;

    // Determine the email's classification based on the phishing score
    let result;
    if (phishingScore < 30) {
        result = "Phishing Detected";
    } else if (phishingScore < 50) {
        result = "Suspicious Email";
    } else {
        result = "Safe Email";
    }

    // Debugging logs to review the algorithm's behavior
    console.log("Tokens:", tokens);
    console.log("Matched Keywords:", matchedKeywords);
    console.log("Phishing Score:", phishingScore);

    // Return the phishing detection result
    return {
        score: phishingScore,
        matchedKeywords,
        result
    };
}

// Example email body to test the function
const emailBody = "Dear user, urgent action is required! Please click here to verify your account details or it will be suspended.";

// Call the phishing detection function with the test email body
const phishingResult = detectPhishing(emailBody);

// Output the phishing detection results
console.log("Phishing Result:", phishingResult);



