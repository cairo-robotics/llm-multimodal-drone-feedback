var user_id;
var trial_number = 1;
var log;

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
        sendUserId(user_id);

        document.getElementById("workerIDPage").style.display = "none";
        document.getElementById("consentPage").style.display = "block";
    }
}

function sendUserId(id) {
    fetch('/process_user_id', {
        method: 'POST',
        body: JSON.stringify({ user_id: id }),
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
        save_trajectory();

        document.getElementById("gameInstructions").style.display = "none";

        document.getElementById("waitButton").textContent = "Wait...";

        await wait();
        
        document.getElementById("waitButton").textContent = "Next";
        document.getElementById("waitButtonDiv").style.display = "none";
        document.getElementById("postfeedbackgeneration").style.display = "block";
    }
}

function wait() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });
}

function save_trajectory() {
    fetch('/process_trajectory', {
        method: 'POST',
        body: JSON.stringify({ user_id: user_id, trial: trial_number, log: log }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
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