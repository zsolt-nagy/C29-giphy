const form = document.querySelector('.js-form');
const topicInput = document.querySelector('.js-topic-input');
const numOfImagesInput = document.querySelector('.js-num-of-images');
const errorField = document.querySelector('.js-error');
const gifsContainer = document.querySelector('.js-gifs-container');

function renderImages(response) {
    let html = '';
    for (let gifData of response.data) {
        html += `
            <img 
                src="${gifData.images.downsized.url}" 
                alt="${gifData.title}"
                class="meme-image" />`;
    }
    gifsContainer.innerHTML = html;

}

function getUrl(topic, numOfImages) {
    const API_PREFIX = 'https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}';
    return `${API_PREFIX}&q=${topic}&limit=${numOfImages}&offset=0&rating=g&lang=en`;
}

function getImages(topic, numOfImages) {
    fetch(getUrl(topic, numOfImages))
        .then(x => x.json())
        .then(renderImages);
}

function formSubmitted(event) {
    event.preventDefault();

    let topic = topicInput.value.trim();
    let numOfImages = Number.parseInt(numOfImagesInput.value, 10);

    if (topic.length === 0) {
        errorField.innerHTML = 'Erroneous input.';
    } else {
        errorField.innerHTML = '';
        getImages(topic, numOfImages);
    }
}

form.addEventListener('submit', formSubmitted);