const filter = {
    url: [{hostContains: "example.com"}, {hostPrefix: "developer"}],
};

function logOnHistoryStateUpdated (details) {
        const table = document.getElementById("history");
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        row.insertCell().textContent = JSON.stringify(details);
        table.appendChild(row);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
        console.log('request', request);
        console.log('sender', sender);
        logOnHistoryStateUpdated(request)
        sendResponse();
});


chrome.webNavigation.onHistoryStateUpdated.addListener(
    logOnHistoryStateUpdated,
    /*filter,*/
);

