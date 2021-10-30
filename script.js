const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const resultsBox = document.getElementById('results-box')
const timerEndInput = document.getElementById('timer-end-input')
const wordsCorrectResult = document.getElementById('words-correct')
const charsCorrectResult = document.getElementById('chars-correct')
const timer = document.getElementById('timer')
var timerEnd
var currPassage
var currIndex
var correctWords
var correctChars
function getText (){
    let rand = Math.floor(Math.random() * passageList.length)
    currPassage = passageList[rand].split(' ')
    currIndex = 0
    return passageList[rand]
}
quoteInputElement.addEventListener('input', () => {
    let w = quoteInputElement.value
    var arrayQuote = quoteDisplayElement.querySelectorAll('span')
    if (w.slice(-1) == ' '){
        arrayQuote[currIndex].classList.remove('highlight')
        let corr = (currPassage[currIndex] == w.substring(0,w.length - 1))
        if(corr){
            correctChars += w.length - 1 
            wordsCorrectResult.innerHTML = ++correctWords 
            charsCorrectResult.innerHTML = correctChars
        }
        arrayQuote[currIndex].classList.add(corr ? 'correct' : 'incorrect')
        currIndex += 1
        quoteInputElement.value = ''
        arrayQuote[currIndex].classList.add('highlight')
    }
})

function renderNewQuote() {
  const quote = getText()
  quoteDisplayElement.innerHTML = ''
  quote.split(' ').forEach(w => {
    if (w.length < 20){
    const characterSpan = document.createElement('span')
    characterSpan.innerText = w
    quoteDisplayElement.appendChild(characterSpan)
    quoteDisplayElement.innerHTML += ' '
    }
  })
  quoteDisplayElement.querySelectorAll('span')[0].classList.add('highlight')
  startTimer()
}

let startTime
var myInterval
function startTimer(){
    correctChars = 0
    correctWords = 0
    wordsCorrectResult.innerHTML = correctWords 
    charsCorrectResult.innerHTML = correctChars
    quoteInputElement.classList.remove('hidden')
    resultsBox.classList.remove('hidden')
    timerEnd = timerEndInput.value ? timerEndInput.value : 0
    if(timerEnd){
        timerElement.innerText = timerEnd 
        timer.classList.remove('hidden') 
        myInterval = setInterval(myTimer, 1000)
        startTime = new Date()
    } else {
        timer.classList.add('hidden')
    }
    quoteInputElement.focus()
    quoteInputElement.value = ''
}
function myTimer() {
    if (timer.innerText == 0 || currIndex == currPassage.length){
        clearInterval(myInterval)
        quoteInputElement.blur()
      } else timer.innerText = timerEnd - getTimerTime()
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}
