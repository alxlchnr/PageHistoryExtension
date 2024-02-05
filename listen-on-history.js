function logOnHistoryStateUpdated(transform) {
    return function (details) {
      const table = document.getElementById("history");
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      const data = transform ? transform(details) : details;
      row.insertCell().textContent = JSON.stringify(
        data
      );
      table.appendChild(row);
    };
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("request", request);
    console.log("sender", sender);
    logOnHistoryStateUpdated()(request);
    sendResponse();
  });
  
  chrome.webNavigation.onHistoryStateUpdated.addListener(
    logOnHistoryStateUpdated((details) => ({
      transitionQualifiers: details.transitionQualifiers,
      transitionType:details.transitionType,
      url: details.url,
    }))
  
  );
  