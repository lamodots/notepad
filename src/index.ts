const notesSideBar =  document.querySelector('.note_sidebar') as HTMLDivElement;

// READ DATA

let baseURL  =  `http://localhost:3000/notes`
interface Notes{
    id?: number,
    title: string,
    note: string,
    date: string,
    category: string,
    slug: string
}
async function getNotes(){
    try{

        const res =  await fetch(baseURL)
        const notes = await res.json();

        let noteCard = "";

        notes.forEach((note:Notes)=>{
            noteCard+=`
            
            <div class="note">
            <a href="index.html?note=${note.id}">
             <h1>${window.innerWidth < 481 ? note.title.slice(0 , 20): note.title.slice(0, 60)}</h1>
             <p>
                 ${note.note.slice(0, 120)}
             </p>
            </a>
             <div class="meta_datas">
                 <div class="date">${note.date}</div>
                 <div class="action_button">
                     <svg  data-id="${note.id}" class="editicon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M11.1333 5.72907H6.1333C5.60287 5.72907 5.09416 5.93979 4.71909 6.31486C4.34401 6.68993 4.1333 7.19864 4.1333 7.72907V18.7291C4.1333 19.2595 4.34401 19.7682 4.71909 20.1433C5.09416 20.5184 5.60287 20.7291 6.1333 20.7291H17.1333C17.6637 20.7291 18.1724 20.5184 18.5475 20.1433C18.9226 19.7682 19.1333 19.2595 19.1333 18.7291V13.7291M17.7193 4.31507C17.9038 4.12405 18.1245 3.97169 18.3685 3.86687C18.6125 3.76205 18.8749 3.70688 19.1405 3.70457C19.4061 3.70227 19.6694 3.75287 19.9152 3.85343C20.161 3.95399 20.3843 4.1025 20.5721 4.29028C20.7599 4.47807 20.9084 4.70137 21.0089 4.94717C21.1095 5.19296 21.1601 5.45632 21.1578 5.72188C21.1555 5.98744 21.1003 6.24988 20.9955 6.49388C20.8907 6.73789 20.7383 6.95858 20.5473 7.14307L11.9613 15.7291H9.1333V12.9011L17.7193 4.31507Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg data-id="${note.id}" class="deleteicon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.046 7.61244L18.179 19.7544C18.1431 20.259 17.9173 20.7313 17.5471 21.076C17.177 21.4208 16.6899 21.6125 16.184 21.6124H7.90802C7.40216 21.6125 6.91509 21.4208 6.54491 21.076C6.17472 20.7313 5.94894 20.259 5.91302 19.7544L5.04602 7.61244M10.046 11.6124V17.6124M14.046 11.6124V17.6124M15.046 7.61244V4.61244C15.046 4.34723 14.9407 4.09287 14.7531 3.90534C14.5656 3.7178 14.3112 3.61244 14.046 3.61244H10.046C9.7808 3.61244 9.52645 3.7178 9.33891 3.90534C9.15138 4.09287 9.04602 4.34723 9.04602 4.61244V7.61244M4.04602 7.61244H20.046" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                             
                 </div>
             </div>
         </div>
  
            
            
            `
            notesSideBar.innerHTML = noteCard
        })

        // DELETE NOTE
        const deleteIcons :  NodeListOf<Element> = document.querySelectorAll('.deleteicon')!;
        console.log(deleteIcons)
        deleteIcons.forEach((deleteIcon)=> {
            deleteIcon.addEventListener('click', deleteNote)
            async function deleteNote(event: any){
                let del = event.currentTarget.dataset.id;
                
                try{
                    const response = await fetch(`http://localhost:3000/notes/${del}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if(response.ok){
                        alert('Do you want to delete note ? ')
                        window.location.href = './index.html'
                    }else{
                        console.log('Could not delete Note')
                    }
    
                }catch(error: any){
                    console.log('There is error deleteing Note' + error.message)
                }
            }
        })

        // UPDATE NOTE
        const editIcons : NodeListOf<Element> = document.querySelectorAll('.editicon');
        const editWrapper= document.querySelector('.edit_wrapper') as HTMLDivElement;
        const closeEdit = document.querySelector('.closeedit')
        closeEdit?.addEventListener('click', (e)=> {
            e.stopPropagation()
            editWrapper.classList.remove('create')
        })
       editIcons.forEach((editicon)=> {
            editicon.addEventListener('click', editNote)
            async function editNote(event: any) {
               const edit =  event.currentTarget.dataset.id
             editWrapper.classList.add('create')
             const editForm = document.querySelector('.editform') as HTMLFormElement;

             const response = await fetch(`http://localhost:3000/notes/${edit}`);
             const editdata = await response.json();

             let noteTitle = document.querySelector('.editnotetitle') as HTMLInputElement;
            let type= document.querySelector('.edittype') as HTMLSelectElement;
            let notebody = document.querySelector('#editnotebody') as HTMLTextAreaElement;
            noteTitle.value = editdata.title
            type.value = editdata.category
            notebody.value = editdata.note

                 // Save Data

            editForm.addEventListener('submit', updateNote)
            async function updateNote( event: SubmitEvent) {
                event.preventDefault()
                let notes:Notes = {
                    title: noteTitle.value,
                    note: notebody.value,
                    category: type.value,
                    date: new Date().toDateString(),
                    slug: noteTitle.value.replace(/ /g, "-")
        
                }

             const response = await fetch(`http://localhost:3000/notes/${edit}`, {
                method: 'PUT',
                body: JSON.stringify(notes),
                headers: {
                    'Content-Type': 'application/json'
                }
             });
             window.location.href = './index.html'
                
            }






            }
       })

    }catch(error){
        console.log('We have an error: ' +  error)
    }
}


window.addEventListener('DOMContentLoaded', ()=> getNotes())

// READING THE CNOTE CONTENT
const noteContent = document.querySelector('.note_main-content') as HTMLDivElement;
const getSlug = new URLSearchParams(window.location.search).get('note');
console.log(getSlug)

if(getSlug !== null){
    async function getSingleNote(){
        const res = await fetch(`${baseURL}/${getSlug}`);
        const singleNote = await res.json();
        const { id, title, note, date, category, slug}:Notes = singleNote;
        let fullNote = `
        <div class="note_main-content-content">
            <h2>${title}</h2>
            <h3><span>${category}</span> <span>Date: ${date}</span></h3>
            <p> ${note}</p>
        </div>
        
        `
        noteContent.innerHTML = fullNote;
    }
    getSingleNote()
}else{
    noteContent.innerHTML= ' No note selected. Please select a note'
}


// CREATE NOTE

window.addEventListener('DOMContentLoaded', function(){
    const navButton = document.querySelector('nav button')!
    const notePad = document.querySelector('.add_wrapper') as HTMLDivElement;
    const close = document.querySelector('.close') as HTMLSpanElement
    close.style.cursor='pointer'

    navButton.addEventListener('click', (e)=> {
        e.stopPropagation();
        notePad.classList.add('create')
    })

    // close notepad
    close.addEventListener('click', (e)=> {
        e.stopPropagation()
        notePad.classList.remove('create')
    })

    // close note

    const form = document.querySelector('form') as HTMLFormElement
    form.addEventListener('submit', createNote)
    async function createNote(e: SubmitEvent){
        e.preventDefault()
        let noteTitle = document.querySelector('.notetitle') as HTMLInputElement;
        let type= document.querySelector('.type') as HTMLSelectElement;
        let notebody = document.querySelector('#notebody') as HTMLTextAreaElement;

        let notes:Notes = {
            title: noteTitle.value,
            note: notebody.value,
            category: type.value,
            date: new Date().toDateString(),
            slug: noteTitle.value.replace(/ /g, "-")

        }
        try{
           const response =  await fetch(baseURL, {
             method: 'POST',
             body: JSON.stringify(notes),
             headers: {
                'Content-Type': 'application/json'
             }
           });

           if(response.ok){
            alert('Note Added successfully!!')
            window.location.href= 'index.html'

           }else {
            alert('Note could not be added')
           }


        }catch(error){
            console.log(error)
        }
    }


});
