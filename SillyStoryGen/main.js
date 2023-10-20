const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

let storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';
let insertX = ['Willy the GoblinBig', 'DaddyFather', 'Christmas'];
let insertY = ['the White House', 'Disneyland', 'the soup kitchen'];
let insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}


function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);
    newStory = newStory.replace(':insertx:', xItem).replace(':insertx:', xItem).replace(':inserty:', yItem).replace(':insertz:', zItem);

    if (customName.value !== '') {
        let name = customName.value;
        newStory = newStory.replace('Bob', name);
    }

    if (document.getElementById("uk").checked) {
        let weight = Math.round(300 * 0.07).toString() + ' stone';
        let temperature = Math.round((94 - 32) / 1.8).toString() + ' centigrade';
        newStory = newStory.replace('94 fahrenheit', temperature).replace('300 pounds', weight);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}

randomize.addEventListener('click', result);
