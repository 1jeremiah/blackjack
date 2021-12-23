var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
var newDeck = makeDeck();
var shuffledDeck = shuffleCards(newDeck);
var gameMode = "start game";
var userCards = [];
var comCards = [];
var main = function (input) {
  if (gameMode == "start game") {
    gameMode = "draw cards";
    return 'Hello User! Please click "submit" to start playing Black Jack.<br>We have drawn the cards for you';
  } else if (gameMode == "draw cards") {
    userCards.push(shuffledDeck.pop());
    userCards.push(shuffledDeck.pop());
    comCards.push(shuffledDeck.pop());
    comCards.push(shuffledDeck.pop());

    console.log("player cards ==> ", userCards);
    console.log(`computer cards ==> `, comCards);
    gameMode = "player hit or stand";
    return `player has received ${userCards[0].name} of ${userCards[0].suit} and ${userCards[1].name} of ${userCards[1].suit}. <br> Computer has received ${comCards[0].name} of ${comCards[0].suit} and a random card.<br>Type "hit" or "stand" and submit`;
  } else if (gameMode == "player hit or stand") {
    if (input == "hit") {
      userCards.push(shuffledDeck.pop());
      return "Player cards are:<br>" + listCards(userCards) + `Computer has received ${comCards[0].name} of ${comCards[0].suit} and a random card.<br>Type "hit" or "stand" and submit`;
    } else if (input == "stand") {
      console.log(userCards, comCards);

      var playerValue = getCardsValue(userCards);
      var computerValue = getCardsValue(comCards);

      let result = "";
      if (isBlackJack(userCards) == true) result = "Player BlackJack";
      else if (isBlackJack(comCards) == true) result = "Computer BlackJack";
      else if (playerValue > 21 && computerValue > 21) {
        result = "both busted";
      } else if (playerValue > 21) {
        result = "player busted";
      } else if (computerValue > 21) {
        result = "computer busted";
      } else if (playerValue > computerValue) {
        result = "Player wins";
      } else if (playerValue < computerValue) {
        result = "Computer wins";
      } else {
        result = " TIE!";
      }
      gameMode = "start game";

      return result + "<br>Player cards are:<br>" + listCards(userCards) + "Computer cards are:<br>" + listCards(comCards) + " Click 'submit' to play again";
    } else {
      return "please type 'hit' or 'stand'.";
    }
  }
};

var isBlackJack = function (cards) {
  if (cards.length > 2) return false;
  if (cards[0].name == "ace" && (cards[1].name == 10 || cards[1].name == "jack" || cards[1].name == "queen" || cards[1].name == "king" || cards[1].name == "ace")) return true;
  if (cards[1].name == "ace" && (cards[0].name == 10 || cards[0].name == "jack" || cards[0].name == "queen" || cards[0].name == "king" || cards[0].name == "ace")) return true;
  return false;
};

var getCardsValue = function (cards) {
  var sum = 0;
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    if (card.name == "jack" || card.name == "queen" || card.name == "king") sum += 10;
    else if (card.name == "ace") {
      sum += 1;
    } else sum += card.name;
  }
  return sum;
};
var listCards = function (cards) {
  var output = "";
  for (var i = 0; i < cards.length; i++) {
    output += `${cards[i].name} of ${cards[i].suit}<br>`;
  }
  return output;
};
