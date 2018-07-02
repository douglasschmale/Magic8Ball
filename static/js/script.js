var priorAnswers = [];
var showPriorAnswers = function(arr) {
    document.getElementById('resultsArea').innerHTML = '';
    for (var i = priorAnswers.length - 1; i >=0 && i > priorAnswers.length - 6; i--){
        document.getElementById('resultsArea').innerHTML += `<p class=${priorAnswers[i].type}>${priorAnswers[i].answer}</p>`;
    }
}

var checkType = function(type) {
    if (type === 'Affirmative') {
        fadeFromGreen();
    } else if (type === 'Contrary') {
        fadeFromRed();
    } else {
        fadeFromGrey();
    }
}

var askQuestion = function() {
    rotateBall();
    var q = document.getElementById('question').value;
    if (q === ''){
        alert('You must enter a question to get an answer!')
    }
    var url = `https://8ball.delegator.com/magic/JSON/${encodeURIComponent(q)}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        var fortune = { 
            answer: data.magic.answer,
            type: data.magic.type
        }
        console.log(JSON.stringify(data));
        console.log(priorAnswers);
        checkType(fortune.type);
        priorAnswers.push(fortune);
        showPriorAnswers(priorAnswers);

        
    })
    .catch(err => {
        console.log('There was an error', err);
    })
};
        
// rotate 8 ball image

var rotateBall = function () {
        var rotation = 0;
        var direction = 'left';
        var counter = 0;
        var interval = setInterval(() => {
                if (rotation < 40 && direction == 'right') {
                    rotation += 10;
                    document.getElementById("eightBall").style.transform = `rotate(${rotation}deg)`;
                } else if (rotation > -40 && direction == 'left') {
                    rotation -= 10
                    document.getElementById("eightBall").style.transform = `rotate(${rotation}deg)`;
                } else if (rotation == 40) {
                    direction = 'left';
                } else if (rotation == -40) {
                    direction = 'right';
                }
                counter += 1;
                if (counter === 36) {
                    clearInterval(interval);
                }
            }, 50);
        };

// shift background color according to API response

var fadeFromRed = function () {
        document.querySelector('body').style.backgroundColor = 'rgb(230,100,100)';
        var blueValue = 100;
        var greenValue = 100;
        var changeTime = setInterval(() => {
            if (blueValue <= 230) document.querySelector('body').style.backgroundColor = `rgb(230,${greenValue}, ${blueValue})`;
            else clearInterval(changeTime);
            blueValue += 10;
            greenValue += 10;
        }
        , 100);
    }

var fadeFromGreen = function () {
        document.querySelector('body').style.backgroundColor = 'rgb(100,230,100)';
        var blueValue = 100;
        var redValue = 100;
        var changeTime = setInterval(() => {
            if (blueValue <= 230) document.querySelector('body').style.backgroundColor = `rgb(${redValue},232, ${blueValue})`;
            else clearInterval(changeTime);
            blueValue += 10;
            redValue += 10;
        }
        , 100);
    }

var fadeFromGrey = function () {
    document.querySelector('body').style.backgroundColor = 'rgb(165,165,165)';
    var colorValue = 165;
    var changeTime = setInterval(() => {
        if (colorValue <= 230) document.querySelector('body').style.backgroundColor = `rgb(${colorValue},${colorValue}, ${colorValue})`;
        else clearInterval(changeTime);
        colorValue += 5;
    }
    , 100);
}
