/*
File: JS for creating calendar
Author: Anh Uong
Date: July 22, 2015
*/

// builds mini calendar, showing 

// starts building the table, adding the Month Year header and weekdays
function makeHeader(mmyyyy) {
    var table = document.getElementById('calendar');
    
    /* gets rid of previous elements in table */
    for( var i=table.childNodes.length-1; i>0; i--){
        table.removeChild(table.childNodes[i]);
    }
    
    // creates header for table 
    
    // adds title (Month Year) and arrows
    var row  = document.createElement('TR');
    var row2  = document.createElement('TR');
    var title = document.createElement('TH');
    var left = document.createElement('TH');
    var right = document.createElement('TH');
    var lefter = document.createElement('TH');
    var righter = document.createElement('TH');
    
    var date = mmyyyy.toDateString().slice(4, 8);
    date += mmyyyy.getFullYear();
    
    title.appendChild(document.createTextNode(date));
    left.appendChild(document.createTextNode("<"));
    right.appendChild(document.createTextNode(">"));
    lefter.appendChild(document.createTextNode("<<"));
    righter.appendChild(document.createTextNode(">>"));
    row.appendChild(lefter);
    row.appendChild(left);
    row.appendChild(title);
    row.appendChild(right);
    row.appendChild(righter);
    
    title.height = "30px";
    title.style.fontWeight = "bold";
    title.style.fontSize = "18px";
    title.setAttribute("colspan", 3);

    
    // adds ability to change months 
    left.onclick = function() {
        changeMonth(mmyyyy, "L");
    }
    right.onclick = function() {
        changeMonth(mmyyyy, "R");
    }
    lefter.onclick = function() {
        changeYear(mmyyyy, "L");
    }
    righter.onclick = function() {
        changeYear(mmyyyy, "R");
    }
    
    left.style.cursor = "pointer"
    right.style.cursor = "pointer"
    lefter.style.cursor = "pointer"
    righter.style.cursor = "pointer"
    
    // adds weekdays to second row of header
    var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    
    for( var i=0; i<weekdays.length; i++) {
        var day = document.createElement('TH');
        day.appendChild(document.createTextNode(weekdays[i]));
        row2.appendChild(day);
        
        day.style.fontWeight = "bold";
    }
    table.appendChild(row);
    table.appendChild(row2);
    
}

// determines how many days are in the month
function numberOfDays(month, year) {
    // if April, June, September, November -> 30 days
    if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;
    } 
    // if February, see if is leap year
    else if (month == 1) {
        if (year % 4 == 0) {
            return 29;
        }
        else { return 28; }
    }
    // otherwise, 31 days
    else {
        return 31;
    }
}

// creates the first row of calendar given the month and year
// depends on what weekday the first of month is
function makeFirstRow(date) {
    date.setDate(1)
    
    // determines what weekday for first of month
    var DayofOne = date.toDateString().slice(0, 3);
    var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var DaytoDisplay = 1;
    var DayOneHit = false;
    
    var week = document.createElement("TR");
    var month = document.getElementById("calendar");
    
    // fills in the first row with blank or number
    for( var i=0; i<7; i++) {
        var day = document.createElement("TD");

        // once hit DayofOne, start displying numbers
        if (DayofOne == weekdays[i] || DayOneHit == true) {
            day.appendChild( document.createTextNode(DaytoDisplay) );
            
            day.style.cursor = "pointer";
            DayOneHit = true;
            DaytoDisplay++;
        }
        // else-fill with blank text 
        else {
            day.appendChild( document.createTextNode( " ") );
        }
        week.appendChild(day);
        
    }
    month.appendChild(week);
    return DaytoDisplay;
    
}

// puts all the pieces of the calendar together
function makeCalendar(mmyyy) {
    // creates date based off of today or if change date
    if (mmyyy == undefined){
        var date = new Date();
    }
    else {
        var date = mmyyy;
    }
    var title = date.toDateString().slice(4, 8);
    title += date.getFullYear();

    // builds initial calendar top
    makeHeader(date);

    var DaysinMonth = numberOfDays(date.getMonth(), date.getFullYear() );
    var DaytoDisplay = makeFirstRow(date);
    var month = document.getElementById("calendar");

    // builds the rest of the rows of calendar
    for (var i=0; i<5; i++){
        var week = document.createElement("TR");

        for (var j=0; j<7; j++) {
            var day = document.createElement("TD");
            
            if (DaytoDisplay > DaysinMonth) {
                day.appendChild( document.createTextNode( " ") );
            }
            else {
                day.appendChild( document.createTextNode( DaytoDisplay) );
                
                day.style.cursor = "pointer";
                DaytoDisplay++;
            }
            week.appendChild(day);
        }
        month.appendChild(week);
    }
        
}

// when you click on one of the arrows, changes the month
// finds what month calendar is on and progresses
function changeMonth(date, direction) {
//    var date = new Date(mmyyyy);
    
    if (direction == "L") {
        date.setMonth( date.getMonth() - 1);
    }
    else {
         date.setMonth( date.getMonth() + 1);
    }
    makeCalendar(date) 
    
}

// when you click on the double arrows, changes the year
// finds what year calendar is on and progresses
function changeYear(date, direction) {
//    var date = new Date(mmyyyy);
    
    if (direction == "L") {
        date.setFullYear( date.getFullYear() - 1);
    }
    else {
         date.setFullYear( date.getFullYear() + 1);
    }
    makeCalendar(date) 
    
}



makeCalendar();

