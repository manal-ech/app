const textarea = document.querySelector('textarea')
const addBtn = document.getElementById('addBtn')
const eventContainer = document.querySelector('.eventContainer')

let eventsList = []

function initialLoad() {
    if (!localStorage.getItem('events')) { return }
    eventsList = JSON.parse(localStorage.getItem('events')).eventsList
    updateUI()
}

initialLoad()

function addEvent() {
    const event = textarea.value
    if (!event) { return }

    console.log('Added event: ', event)
    eventsList.push(event)
    textarea.value = '' // resets to empty
    updateUI()
}

function editEvent(index) {
    textarea.value = eventsList[index]
    eventsList = eventsList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false }
        return true
    })
    updateUI()
}

function deleteEvent(index) {
    eventsList = eventsList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false }
        return true
    })
    updateUI()
}

function updateUI() {
    let newInnerHTML = ''

    eventsList.forEach((eventElement, eventIndex) => {
        newInnerHTML += `
        <div class="event">
        <p>${eventElement}</p>
        <div class="btnContainer">
            <button class="iconBtn" onclick="editEvent(${eventIndex})">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="iconBtn" onclick="deleteEvent(${eventIndex})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
        `
    })

    eventContainer.innerHTML = newInnerHTML

    // to save to localstorage
    localStorage.setItem('events', JSON.stringify({ eventsList }))
}

addBtn.addEventListener('click', addEvent)