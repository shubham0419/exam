const mongoose = require("mongoose");
require("dotenv").config();

const emojiDataSet = [
  // Hand Gestures
  { emoji: "👋", name: "Waving Hand", keywords: ["hello", "hi", "wave", "greeting"] },
  { emoji: "🤚", name: "Raised Back of Hand", keywords: ["stop", "high five", "wave"] },
  { emoji: "🖐️", name: "Hand with Fingers Splayed", keywords: ["hand", "high five", "stop"] },
  { emoji: "✋", name: "Raised Hand", keywords: ["stop", "high five", "wait"] },
  { emoji: "🫱", name: "Rightwards Hand", keywords: ["pointing", "gesture", "direction"] },
  { emoji: "🫲", name: "Leftwards Hand", keywords: ["gesture", "pointing", "direction"] },
  { emoji: "👌", name: "OK Hand", keywords: ["ok", "perfect", "agree"] },
  { emoji: "🤌", name: "Pinched Fingers", keywords: ["gesture", "why", "sarcastic"] },
  { emoji: "🤏", name: "Pinching Hand", keywords: ["small", "tiny", "gesture"] },
  { emoji: "✌️", name: "Victory Hand", keywords: ["peace", "victory", "two"] },
  { emoji: "🤞", name: "Crossed Fingers", keywords: ["hope", "luck", "wish"] },
  { emoji: "🤟", name: "Love-You Gesture", keywords: ["love", "sign language", "gesture"] },
  { emoji: "🤘", name: "Sign of the Horns", keywords: ["rock", "metal", "gesture"] },
  { emoji: "🤙", name: "Call Me Hand", keywords: ["call", "hang loose", "surfing"] },
  { emoji: "👈", name: "Backhand Index Pointing Left", keywords: ["left", "pointing", "direction"] },
  { emoji: "👉", name: "Backhand Index Pointing Right", keywords: ["right", "pointing", "direction"] },
  { emoji: "👆", name: "Backhand Index Pointing Up", keywords: ["up", "pointing", "direction"] },
  { emoji: "👇", name: "Backhand Index Pointing Down", keywords: ["down", "pointing", "direction"] },
  { emoji: "☝️", name: "Index Pointing Up", keywords: ["pointing", "up", "one"] },
  { emoji: "👍", name: "Thumbs Up", keywords: ["like", "approve", "thumb"] },
  { emoji: "👎", name: "Thumbs Down", keywords: ["dislike", "disapprove", "thumb"] },
  { emoji: "✊", name: "Raised Fist", keywords: ["protest", "power", "fist"] },
  { emoji: "👊", name: "Oncoming Fist", keywords: ["punch", "fist bump", "attack"] },
  { emoji: "🤛", name: "Left-Facing Fist", keywords: ["fist bump", "left", "gesture"] },
  { emoji: "🤜", name: "Right-Facing Fist", keywords: ["fist bump", "right", "gesture"] },
  { emoji: "👏", name: "Clapping Hands", keywords: ["applause", "clap", "congratulations"] },
  { emoji: "🙌", name: "Raising Hands", keywords: ["celebration", "hooray", "raise"] },
  { emoji: "👐", name: "Open Hands", keywords: ["hug", "open", "gesture"] },
  { emoji: "🤲", name: "Palms Up Together", keywords: ["offering", "prayer", "gesture"] },
  { emoji: "🤝", name: "Handshake", keywords: ["agreement", "deal", "greeting"] },
  { emoji: "🙏", name: "Folded Hands", keywords: ["prayer", "please", "thank you"] },

  // Smileys & Emotion
  { emoji: "😀", name: "Grinning Face", keywords: ["smile", "happy", "joy"] },
  { emoji: "😁", name: "Beaming Face with Smiling Eyes", keywords: ["smile", "joy", "grin"] },
  { emoji: "😂", name: "Face with Tears of Joy", keywords: ["laugh", "happy", "funny"] },
  { emoji: "🤣", name: "Rolling on the Floor Laughing", keywords: ["laugh", "hilarious", "funny"] },
  { emoji: "😊", name: "Smiling Face with Smiling Eyes", keywords: ["happy", "blush", "joy"] },
  { emoji: "😢", name: "Crying Face", keywords: ["sad", "tear", "upset"] },
  { emoji: "😠", name: "Angry Face", keywords: ["mad", "angry", "annoyed"] },
  { emoji: "😍", name: "Smiling Face with Heart-Eyes", keywords: ["love", "heart", "romance"] },
  { emoji: "😎", name: "Smiling Face with Sunglasses", keywords: ["cool", "sunglasses", "chill"] },
  { emoji: "🥰", name: "Smiling Face with Hearts", keywords: ["love", "affection", "romance"] },
  { emoji: "🤔", name: "Thinking Face", keywords: ["think", "puzzle", "curious"] },
  { emoji: "😴", name: "Sleeping Face", keywords: ["sleep", "tired", "rest"] },
  { emoji: "🤯", name: "Exploding Head", keywords: ["shock", "mind blown", "surprised"] },
  { emoji: "😜", name: "Winking Face with Tongue", keywords: ["playful", "wink", "fun"] },
  { emoji: "😒", name: "Unamused Face", keywords: ["bored", "displeased", "meh"] },
  { emoji: "😱", name: "Face Screaming in Fear", keywords: ["scared", "shock", "horror"] },
  { emoji: "🥳", name: "Partying Face", keywords: ["celebration", "party", "fun"] },
  { emoji: "🤤", name: "Drooling Face", keywords: ["hungry", "yum", "craving"] },
  { emoji: "🫠", name: "Melting Face", keywords: ["melting", "hot", "uncomfortable"] },
  { emoji: "😈", name: "Smiling Face with Horns", keywords: ["devil", "mischievous", "evil"] },

  // Animals & Nature
  { emoji: "🐶", name: "Dog Face", keywords: ["dog", "pet", "animal"] },
  { emoji: "🐱", name: "Cat Face", keywords: ["cat", "pet", "animal"] },
  { emoji: "🦁", name: "Lion", keywords: ["lion", "king", "animal"] },
  { emoji: "🐮", name: "Cow Face", keywords: ["cow", "farm", "animal"] },
  { emoji: "🐸", name: "Frog", keywords: ["frog", "animal", "amphibian"] },
  { emoji: "🐵", name: "Monkey Face", keywords: ["monkey", "animal", "jungle"] },
  { emoji: "🦄", name: "Unicorn", keywords: ["unicorn", "fantasy", "mythical"] },
  { emoji: "🐼", name: "Panda", keywords: ["panda", "animal", "cute"] },
  { emoji: "🐧", name: "Penguin", keywords: ["penguin", "cold", "animal"] },
  { emoji: "🦊", name: "Fox", keywords: ["fox", "animal", "wild"] },
  { emoji: "🐯", name: "Tiger Face", keywords: ["tiger", "animal", "wild"] },
  { emoji: "🦓", name: "Zebra", keywords: ["zebra", "stripes", "animal"] },
  { emoji: "🐢", name: "Turtle", keywords: ["turtle", "slow", "animal"] },
  { emoji: "🦋", name: "Butterfly", keywords: ["butterfly", "insect", "nature"] },
  { emoji: "🪷", name: "Lotus", keywords: ["flower", "lotus", "nature"] },
  { emoji: "🌈", name: "Rainbow", keywords: ["rainbow", "colors", "sky"] },
  { emoji: "🌙", name: "Crescent Moon", keywords: ["moon", "night", "sky"] },

  // Food & Drink
  { emoji: "🍎", name: "Red Apple", keywords: ["apple", "fruit", "healthy"] },
  { emoji: "🍕", name: "Pizza", keywords: ["pizza", "food", "delicious"] },
  { emoji: "🍔", name: "Hamburger", keywords: ["burger", "food", "fast food"] },
  { emoji: "🍩", name: "Doughnut", keywords: ["doughnut", "sweet", "snack"] },
  { emoji: "🍟", name: "French Fries", keywords: ["fries", "food", "fast food"] },
  { emoji: "🍇", name: "Grapes", keywords: ["grapes", "fruit", "vine"] },
  { emoji: "🍦", name: "Soft Ice Cream", keywords: ["ice cream", "dessert", "sweet"] },
  { emoji: "🌮", name: "Taco", keywords: ["taco", "mexican", "food"] },
  { emoji: "🍿", name: "Popcorn", keywords: ["popcorn", "movie", "snack"] },
  { emoji: "🥗", name: "Green Salad", keywords: ["salad", "healthy", "food"] },
  { emoji: "🍫", name: "Chocolate Bar", keywords: ["chocolate", "sweet", "dessert"] },
];

const emojiSchema = new mongoose.Schema({
  emoji: String,
  name: String,
  keywords: [String],
});

const Emoji = mongoose.model("Emoji", emojiSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://shubham:shubham@endtermexam.cfs9b.mongodb.net/?retryWrites=true&w=majority&appName=endtermexam"
    );
    console.log("Connected to MongoDB");

    // Clear existing data
    await Emoji.deleteMany();
    console.log("Cleared existing data");

    // Insert new data
    await Emoji.insertMany(emojiDataSet);
    console.log("Emoji data inserted successfully");

    // Close connection
    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
}

seedDatabase();
