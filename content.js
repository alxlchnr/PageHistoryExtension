
const pushState=window.history.pushState
const replaceState=window.history.replaceState

function sendMessage(eventName, originalFunction){
    return function sendMessage(){
        console.log(eventName,...arguments)
        let sending = chrome.runtime.sendMessage({eventName,...arguments, state:arguments[0].state});
        if(originalFunction){
            originalFunction(...arguments)
        }
        sending.then(console.log, console.error)
    }
}

window.history.pushState=sendMessage('pushState',pushState)
window.history.replaceState=sendMessage('replaceState',replaceState)



window.addEventListener("popstate",sendMessage('popstate'))