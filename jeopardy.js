// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds(num){
 let res = await axios.get(`https://jservice.io/api/categories?count=${num}`);
 let category = res.data;
 
 for(let ids of category){
    let id = ids.id;
    getCategory(id)
 }
 
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    console.log(catId);
    
    let res = await axios.get(`https://jservice.io/api/category?id=${catId}`);
    
    let catData = res.data;
    
    for(let questionAnswer in catData){
        let title = questionAnswer.title;
        console.log(title);
        

        // let title = questionAnswer.category.title;
        // console.log(title);
        // let clues = questionAnswer.category.clues_count;

        fillTable(title);
    }

    for(let test of catData){
        let question = test.clues[1].question;
        console.log(question);
        let answer = test.clues[1].answer;
        console.log(answer);
    }
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

//6 columns and 6 rows
async function fillTable(title, clues, question, answer) {
    const table = document.querySelector('#jeopardy');
    const header = table.getElementsByTagName('thead');
    $(header).append(`<tr></tr>`);
    const tr = table.getElementsByTagName('tr');
 
    
    for(let i = 0; i < title.length; i++){
    $('.tr-1').append(`<td>${title}</td>`);}

    
   for(let  i = 0; i < clues.length; i++){ 
    const body = table.getElementsByTagName('tbody');
    const row = body.insertRow(0);
    const cell = row.insertCell(0)
    cell.innerHTML(`clues:${clues} question:${question}, ${answer}`);}

    
    // let row = header.insertRow(0);
    // let cell = row.insertCell(0);
    // let newText = document.createTextNode();
    // cell.appenChild(newText);
    
    

}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    // let clue = document.querySelector('.clue')
    // if(clue.hasOwnProperty() = null){
    //     clue.style
    // }else if(clue.hasOwnProperty() = )
    
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
let btn = document.querySelector('#start');
btn.addEventListener('click', function load(){
    $('.fa fa-spin fa-spinner').bind('ajaxStart', function(){
        $(this).show();
    }).bind('ajaxStop', function(){
        $(this).hide();
    }); 
})
}

/** Remove the loading spinner and update the button used to fetch data. */ 
//do I need this with my top function? function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    getCategoryIds(6);  
}

/** On click of start / restart button, set up game. */

const btn = document.querySelector('.start');
btn.addEventListener('click', function startNewGame(){
    $('.jeopardy').empty();
    setupAndStart();
    
});

/** On page load, add event handler for clicking clues */

// TODO