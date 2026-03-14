const QUOTES = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    quote: "You have power over your mind, not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius"
  },
  {
    quote: "Waste no more time arguing about what a good man should be. Be one.",
    author: "Marcus Aurelius"
  },
  {
    quote: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche"
  },
  {
    quote: "Do not pray for an easy life. Pray for the strength to endure a difficult one.",
    author: "Bruce Lee"
  },
  {
    quote: "It is not death that a man should fear, but he should fear never beginning to live.",
    author: "Marcus Aurelius"
  },
  {
    quote: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius"
  },
  {
    quote: "Fall seven times, stand up eight.",
    author: "Japanese Proverb"
  },
  {
    quote: "We suffer more in imagination than in reality.",
    author: "Seneca"
  },
  {
    quote: "Luck is what happens when preparation meets opportunity.",
    author: "Seneca"
  },
  {
    quote: "Begin at once to live, and count each separate day as a separate life.",
    author: "Seneca"
  },
  {
    quote: "The cucumber is bitter? Throw it away. There are brambles in the path? Go around them. That is all you need to know.",
    author: "Marcus Aurelius"
  },
  {
    quote: "First say to yourself what you would be; and then do what you have to do.",
    author: "Epictetus"
  },
  {
    quote: "Make the best use of what is in your power, and take the rest as it happens.",
    author: "Epictetus"
  },
  {
    quote: "He that is good for making excuses is seldom good for anything else.",
    author: "Benjamin Franklin"
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    quote: "Do not go where the path may lead. Go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson"
  },
  {
    quote: "What you are is what you have been. What you'll be is what you do now.",
    author: "Buddha"
  },
  {
    quote: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  },
  {
    quote: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    quote: "The world breaks everyone, and afterward, some are strong at the broken places.",
    author: "Ernest Hemingway"
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    quote: "Act as if what you do makes a difference. It does.",
    author: "William James"
  },
  {
    quote: "Keep your face always toward the sunshine, and shadows will fall behind you.",
    author: "Walt Whitman"
  },
  {
    quote: "Even the darkest night will end and the sun will rise.",
    author: "Victor Hugo"
  },
  {
    quote: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    quote: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou"
  },
  {
    quote: "Try to be a rainbow in someone's cloud.",
    author: "Maya Angelou"
  },
  {
    quote: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe"
  }
];

export function getTimeBasedQuote() {
  // QUOTE CHANGES ONCE EVERY 12 HOURS
  const index = Math.floor(Date.now() / (1000 * 60 * 60 * 12)) % QUOTES.length;
  console.log(index)
  return QUOTES[index];
}