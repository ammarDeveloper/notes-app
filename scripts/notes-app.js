'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    const someId = uuidv4()
    const createdAt = moment().valueOf()
    notes.push({
        id: someId,
        title: '',
        body: '',
        createdAt: createdAt,
        updatedAt: createdAt
    })
    saveNotes(notes)
    location.assign("../notes-app/edit-page.html"+'#'+someId)

})

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === "notes"){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})