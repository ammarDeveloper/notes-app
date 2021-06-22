'use strict'

let notes = getSavedNotes()
const pageId = location.hash.substring(1)
let note = notes.find((item) => item.id === pageId)

if (note === undefined){
    location.assign('../notes-app/index.html')
}

const editspan = document.querySelector('#editedTime')

editspan.textContent = generateLastEdited(note.updatedAt)

const editTitle = document.querySelector("#titleOfNote")
const editBody = document.querySelector('#bodyOfNote')
const removeBtn = document.querySelector("#removeNote")
editBody.value = note.body
editTitle.value = note.title

editTitle.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    editspan.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

editBody.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    editspan.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeBtn.addEventListener('click', (e) =>{
    removeNote(note.id)
    saveNotes(notes)
    location.assign('../notes-app/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === "notes"){
        notes = JSON.parse(e.newValue)
        note = notes.find(function(item){
            return item.id === pageId
        })
        
        if (note === undefined){
            location.assign('../notes-app/index.html')
        }
        
        editBody.value = note.body
        editTitle.value = note.title
        editspan.textContent = generateLastEdited(note.updatedAt)
    }
})



