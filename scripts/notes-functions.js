'use strict'

// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON !== null ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }

}

// Save the notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const status = document.createElement('p')

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')

    // textEl.setAttribute('href', `/notes-app/edit-page.html#${note.id}`)
    noteEl.appendChild(textEl)

    // setup the link
    noteEl.setAttribute('href', `/notes-app/edit-page.html#${note.id}`)

    // setup the status message
    status.textContent = "Last Edited: "+generateLastEdited(note.updatedAt)
    status.classList.add('list-item__subtitle')
    noteEl.appendChild(status)
    noteEl.classList.add('list-item')

    return noteEl
}

// sort your notes
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (b.updatedAt > a.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (b.createdAt > a.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (b.title.toLowerCase() < a.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// Render application notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#notes').innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            document.querySelector('#notes').appendChild(noteEl)
        })
    } else {
        const errorPara = document.createElement('p')
        errorPara.textContent = "No Notes To Be Displayed"
        errorPara.classList.add('empty-message')
        document.querySelector('#notes').appendChild(errorPara)
    }
}

// Generate the last edited message
const generateLastEdited = (timeSpan) => moment(timeSpan).fromNow()