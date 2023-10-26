const quotesElement = document.querySelector(".quotes");
const selectElement = document.querySelector(".custom-select");
const textareaElement = document.querySelector(".custom-textarea");
const custom = document.querySelector(".custom");
const message = new SpeechSynthesisUtterance();
let voices = [];

speechSynthesis.addEventListener("voiceschanged", () => {
  voices = speechSynthesis.getVoices();
  loadVoices(voices);
});

function loadVoices(voices) {
  voices.forEach((voice) => {
    const { name, lang } = voice;
    const optionElement = document.createElement("option");
    optionElement.innerText = `${name} - ${lang}`;
    optionElement.value = name;
    selectElement.appendChild(optionElement);
  });
}

selectElement.addEventListener("change", (event) => {
  const name = event.target.value;
  const voice = voices.find((voice) => voice.name === name);
  message.voice = voice;
});

custom.addEventListener("submit", (event) => {
  event.preventDefault();
  const customText = textareaElement.value;
  message.text = customText;
  speechSynthesis.speak(message);
});

const quotes = [
  {
    text: "«Sé tú mismo; todos los demás ya están tomados.»",
    author: "Oscar Wilde",
  },
  {
    text: "«No hay viento favorable para el que no sabe donde va.»",
    author: "Séneca",
  },
  {
    text: "«No es que tengamos poco tiempo, sino que perdemos mucho.»",
    author: "Séneca",
  },
  {
    text: "«Lo innecesario, aunque cueste solo un poco, es caro.»",
    author: "Séneca",
  },
];

quotes.forEach((quote) => {
  const { text, author } = quote;
  const quoteTemplate = `
    <section class="quote">
        <h2 class="quote-text">${text}</h2>
        <h5 class="quote-author">${author}</h5>
    </section>
    `;
  quotesElement.innerHTML += quoteTemplate;
});

const quotesCollection = document.querySelectorAll(".quote");
quotesCollection.forEach((quoteElement) => {
  quoteElement.addEventListener("click", (event) => {
    message.text = event.target.innerText;
    speechSynthesis.speak(message);
  });
});
