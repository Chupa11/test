let people = [
    { name: 'meercat', img: "1.jpg" },
    { name: 'bird', img: '2.jpg' },
    { name: 'littleShit', img: '3.jpg' },
    { name: 'redPanda', img: '4.jpg' },
    { name: 'lynx', img: '5.jpg' }
];

const backgroundColors = ['#ff2f2f', '#2facff', '#b32fff', '#f1ff2f', '#71ff2f'];
const clickAudio = new Audio('audio/mixkit-arcade-game-jump-coin-216.wav');
const completeAudio = new Audio('audio/mixkit-melodic-bonus-collect-1938.wav');

const leftPic = document.getElementById('leftPic');
const rightPic = document.getElementById('rightPic');
const body = document.body;

function colorSwitch() {
    body.style.background = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    clickAudio.play();
}

function swapNRemove(sidePic) {
    console.log("Clicked sidePic:", sidePic);

    if (people.length === 1) {
        let winnerId;

        if (sidePic === leftPic) {
            leftPic.style.visibility = "hidden";
            winnerId = rightPic.src.split("/").pop(); // Get image ID
            setTimeout(() => {
                rightPic.id = "winner";
                completeAudio.play();
                sendWinnerToServer(winnerId); // Send image ID to get name
            }, 1300);
        } else if (sidePic === rightPic) {
            rightPic.style.visibility = "hidden";
            winnerId = leftPic.src.split("/").pop(); // Get image ID
            setTimeout(() => {
                leftPic.id = "winner";
                completeAudio.play();
                sendWinnerToServer(winnerId); // Send image ID to get name
            }, 1300);
        }
    } else {
        colorSwitch();

        let id = sidePic.src.split("/").pop();
        console.log(id);

        let removed = people.findIndex((element) => element.img === id);
        if (removed !== -1) {
            people.splice(removed, 1);
        }

        const index = Math.floor(Math.random() * people.length);
        sidePic.setAttribute('src', `Pictures/${people[index].img}`);
    }
}

function sendWinnerToServer(winnerId) {
    const winner = people.find(person => person.img === winnerId); // Get the winner object
    if (winner) {
        const winnerName = winner.name; // Get the winner's name

        fetch('/submit-winner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ winner: winnerName }) // Send the name
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    } else {
        console.error('Winner not found:', winnerId);
    }
}