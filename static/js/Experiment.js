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
    save_trajectory();
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