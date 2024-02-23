var user_id;
var trial_number = 1;
var log;
var trial_outcome;
//var condition = "full";
//var condition = "score";
//var condition = "text";
var condition = "demo";

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
        sendLog("Open consent page");
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
    sendLog("Open instructions 1 page");
}

function goToInstructions2Page() {
    document.getElementById("instructions1Page").style.display = "none";
    document.getElementById("instructions3Page").style.display = "none";
    document.getElementById("instructions2Page").style.display = "block";
    window.scrollTo(0, 0); // scroll to top of page
    sendLog("Open instructions 2 page");
}

function goToInstructions3Page() {
    document.getElementById("instructions3Page").style.display = "block";
    document.getElementById("instructions2Page").style.display = "none";
    window.scrollTo(0, 0); // scroll to top of page
    sendLog("Open instructions 3 page");
}

function goToFirstGame() {
    trial_number = 1;
    document.getElementById("trialnumber").innerHTML = trial_number;
    restartGame();

    score_last = tot_score

    document.getElementById("instructions3Page").style.display = "none";
    document.getElementById("gamePage").style.display = "block"; 
}

function goToFeedbackPage() {
    document.getElementById("gamePage").style.display = "none";

    if (condition == "full") {
        document.getElementById("fullFeedbackPage").style.display = "block";
    } else if (condition == "score" || condition == "demo") {
        document.getElementById("scorePage").style.display = "block";
    } else if (condition == "text") {
        document.getElementById("textFeedbackPage").style.display = "block";
    }
}

async function waitToGoToScorePage() {
    if (game_done == true) {
        window.killGame();

        // this needs to be completed before we can move on
        await save_trajectory();

        document.getElementById("gameInstructions").style.display = "none";
        document.getElementById("waitText").style.display = "block";
        document.getElementById("waitButton").textContent = "Please Wait...";

        await waitForFeedback();

        // update text and images on feedback pages
        let textPath = "static/data/" + user_id + "/trial_" + trial_number + "/feedback.txt";
        let imagePath = "static/data/" + user_id + "/trial_" + trial_number + "/trajectory_with_feedback.png";
        fetch(textPath)
            .then(response => response.text())
            .then(text => {
                // replace special characters
                let processedText = text.replace(/\u2013|\u2014/g, "&#x2d;")
                                        .replace(/\u2019|\u2032/g, "&#x27;");
                document.getElementById("textFeedbackText").textContent = processedText;
                document.getElementById("fullFeedbackText").textContent = processedText;
            });

        document.getElementById("trajectoryGraph").src = imagePath;

        document.getElementById("waitButton").textContent = "Generate Feedback";
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

function goToNextFeedbackPage(current) {
    if (current == 'full') {
        document.getElementById("fullFeedbackPage").style.display = "none";
        document.getElementById("surveyPage").style.display = "block";
    } else if (current == 'text') {
        if (condition == 'text') {
            document.getElementById("textFeedbackPage").style.display = "none";
            document.getElementById("surveyPage").style.display = "block";
        } else if (condition == "demo") {
            document.getElementById("textFeedbackPage").style.display = "none";
            document.getElementById("fullFeedbackPage").style.display = "block";
        }
    } else if (current == 'score') {
        if (condition == 'score') {
            document.getElementById("scorePage").style.display = "none";
            document.getElementById("surveyPage").style.display = "block";
        } else if (condition == "demo") {
            document.getElementById("scorePage").style.display = "none";
            document.getElementById("textFeedbackPage").style.display = "block";
        }
    } else if (current == 'game') {
        document.getElementById("gamePage").style.display = "none";
        if (condition == "full") {
            document.getElementById("fullFeedbackPage").style.display = "block";
        } else if (condition == "score" || condition == "demo") {
            document.getElementById("scorePage").style.display = "block";
        } else if (condition == "text") {
            document.getElementById("textFeedbackPage").style.display = "block";
        }
    }
}

function goToGame() {
    if (trial_number >= total_games) {
        save_survey();
        goToQualtrics();
    } else {
        save_survey();
        resetSurveySliders();
        trial_number += 1;
        document.getElementById("trialnumber").innerHTML = trial_number;

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
            reflection: document.getElementById("reflection").value,
            outcome: trial_outcome}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function resetSurveySliders() {
    // reset all sliders to 3
    document.getElementById("motivation").value = 3;
    document.getElementById("manageable").value = 3;
    document.getElementById("actionable").value = 3;
    document.getElementById("timely").value = 3;
    document.getElementById("reflection").value = 3;
}

function sendLog(message) {
    fetch('/process_log', {
        method: 'POST',
        body: JSON.stringify({ user_id: user_id, message: message }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

function goToQualtrics() {
    window.killGame();
    document.getElementById("surveyPage").style.display = "none";
    document.getElementById("qualtricsPage").style.display = "block";
    sendLog("Open qualtrics page");
}