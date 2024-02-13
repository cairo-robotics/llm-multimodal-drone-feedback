var user_id;
var trial_number = 1;
var log;
var condition = "full";
// var condition = "score";
// var condition = "text";

function goToScreenTest() {
    document.getElementById("startPage").style.display = "none";
    document.getElementById("screenTestPage").style.display = "block";
}

function goToWorkerIDPage() {
    document.getElementById("screenTestPage").style.display = "none";
    document.getElementById("workerIDPage").style.display = "block";
}

function goToConsentPage() {
    if (document.getElementById("workerID").value == "") {
        // do nothing
    }
    else {
        // send user id to server
        user_id = document.getElementById("workerID").value;
        sendUserId(user_id, condition);

        document.getElementById("workerIDPage").style.display = "none";
        document.getElementById("consentPage").style.display = "block";
    }
}

function sendUserId(id, condition) {
    fetch('/process_user_id', {
        method: 'POST',
        body: JSON.stringify({ user_id: id, condition: condition }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function goToInstructions1Page() {
    document.getElementById("consentPage").style.display = "none";
    document.getElementById("instructions2Page").style.display = "none";
    document.getElementById("instructions1Page").style.display = "block";
    window.scrollTo(0, 0); // scroll to top of page
}

function goToInstructions2Page() {
    document.getElementById("instructions1Page").style.display = "none";
    document.getElementById("instructions3Page").style.display = "none";
    document.getElementById("instructions2Page").style.display = "block";
    window.scrollTo(0, 0); // scroll to top of page
}

function goToInstructions3Page() {
    document.getElementById("instructions3Page").style.display = "block";
    document.getElementById("instructions2Page").style.display = "none";
    window.scrollTo(0, 0); // scroll to top of page
}

function goToFirstGame() {
    trial_number = 1;
    restartGame();

    score_last = tot_score

    document.getElementById("instructions3Page").style.display = "none";
    document.getElementById("gamePage").style.display = "block"; 
}

function goToScorePage() {
    document.getElementById("gamePage").style.display = "none";
    document.getElementById("scorePage").style.display = "block";
}

async function waitToGoToScorePage() {
    if (game_done == true) {
        window.killGame();

        // this needs to be completed before we can move on
        await save_trajectory();

        document.getElementById("gameInstructions").style.display = "none";

        document.getElementById("waitButton").textContent = "Please Wait...";

        await waitForFeedback();

        // update text and images on feedback pages
        let textPath = "static/data/" + user_id + "/trial_" + trial_number + "/feedback.txt";
        let imagePath = "static/data/" + user_id + "/trial_" + trial_number + "/trajectory_with_feedback.png";
        fetch(textPath)
            .then(response => response.text())
            .then(text => {
                document.getElementById("textFeedbackText").textContent = text;
                document.getElementById("fullFeedbackText").textContent = text;
            });

        document.getElementById("trajectoryGraph").src = imagePath;

        document.getElementById("waitButton").textContent = "Next";
        document.getElementById("waitButtonDiv").style.display = "none";
        document.getElementById("postfeedbackgeneration").style.display = "block";
    }
}

function waitForFeedback() {
    return new Promise((resolve, reject) => {
        fetch('/wait_for_feedback/' + user_id + '/' + trial_number)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                resolve(data); // Resolve the promise with the data from the server
            })
            .catch(error => {
                reject(error); // Reject the promise if there's an error
            });
    });
}

function save_trajectory() {
    return new Promise((resolve, reject) => {
        fetch('/process_trajectory', {
            method: 'POST',
            body: JSON.stringify({ user_id: user_id, trial: trial_number, log: log }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the server responds with JSON
        })
        .then(data => resolve(data)) // Resolve the promise with the response data
        .catch(error => reject(error)); // Reject the promise if there's an error
    });
}

function goToTextFeedbackPage() {
    document.getElementById("scorePage").style.display = "none";
    document.getElementById("textFeedbackPage").style.display = "block";
}

function goToFullFeedbackPage() {
    document.getElementById("textFeedbackPage").style.display = "none";
    document.getElementById("fullFeedbackPage").style.display = "block";
}

function goToSurveyPage() {
    document.getElementById("fullFeedbackPage").style.display = "none";
    document.getElementById("surveyPage").style.display = "block";
}

function goToGame() {
    if (trial_number >= total_games) {
        save_survey();
        goToQualtrics();
    } else {
        save_survey();
        trial_number += 1;

        iter_score = tot_score
        if (trial_number == 2){
            score_last = iter_score
        }
        score_last = iter_score 
        window.restartGame();

        document.getElementById("surveyPage").style.display = "none";
        document.getElementById("gamePage").style.display = "block";
        document.getElementById("postfeedbackgeneration").style.display = "none";
        document.getElementById("gameInstructions").style.display = "block";
        document.getElementById("waitButtonDiv").style.display = "block";
    }
}

function save_survey() {
    fetch('/process_survey_responses', {
        method: 'POST',
        body: JSON.stringify({ user_id: user_id, trial: trial_number, 
            motivation: document.getElementById("motivation").value,
            manageable: document.getElementById("manageable").value,
            actionable: document.getElementById("actionable").value,
            timely: document.getElementById("timely").value,
            reflection: document.getElementById("reflection").value}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function goToQualtrics() {
    window.killGame();
    document.getElementById("surveyPage").style.display = "none";
    document.getElementById("qualtricsPage").style.display = "block";
}