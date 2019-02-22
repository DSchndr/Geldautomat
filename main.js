// Geldautomat Javascript Code

/* 
Todo:
- Korrekturbutton
- Hilfebutton
- Hauptmenü
*/


// Global Variables

var PIN = "1337";
var PINlength = "4";
var PINTries = "2"; //2, da erster versuch schon der dritte ist ;)
var PINstring = "";
var clearonpress = false;

var insertcardmenuv = true;
var pinmenu = false;
var mainmenu = false;

function insertcardmenu() {
    title.innerText = "Bitte Karte reinstecken";
    moneybuttons.style.display = "none";
    pic.style.display = "none";
    pinmenu = false;
    insertcardmenuv = true;
    mainmenu = false;
}

function insertcard() {
    insertcardmenuv = false;
    pinmenu = true;
    title.innerText = "PIN-EINGABE";
    message.innerText ="Tipp: 1337";
    pin.innerText = ""
    PINstring = ""
    return;
}

// Keypad handling functions

function buttonpress(Button) {
    console.debug("BUTTON: " + Button);
    if (mainmenu) {
        if (Button == "a") {
            insertcardmenu();
            return;
        }
    }
    if (pinmenu) {
        // Wenn clearonpress wahr oder taste a gedrückt wurde -> PIN feld säubern
        if (clearonpress) {
            clearonpress = false;
            clearpindiv();
        }

        // korrektur und hilfe buttons werden nicht benutzt
        if ((Button == "k") | (Button == "h")) {
            return;
        }

        // wenn abbrechen gedrückt wurde
        if (Button == "a") {
            clearpindiv();
            return;
        }
        // wenn Bestätigen gedrückt wurde
        if (Button == "b") {
            //pin zu kurz
            if (PINstring.length < PINlength) {
                //alert("Pin zu kurz");
                message.innerText = "PIN zu kurz";
                return;
            }
            //pin zu lang
            if (PINstring.length > PINlength) {
                //alert("PIN zu lang");
                message.innerText = "PIN zu lang";
                return;
            }
            //pin richtig
            if (PIN == PINstring) {
                hauptmenu();
                return;
            }
            //pin falsch
            else {
                if (PINTries >= "1") {
                    message.innerText = "PIN Falsch! " + PINTries + " versuche übrig.";
                    PINTries = PINTries - 1;
                    clearonpress = true;
                    return;
                }
                else {
                    //alert("Keine versuche mehr übrig.");
                    pin.innerText = "Karte Gesperrt!"
                    message.innerText = "Keine versuche mehr übrig.";
                    pinmenu = false;
                    return;
                }
            }
        }
        //Sternchen in Pindiv einsetzen.
        if (PINstring.length <= PINlength) {
            pin.innerText = pin.innerText + "*";
            PINstring = PINstring + Button;
            console.debug("PINSTRING: " + PINstring);
        }
    }
}

//säubert den div mit den pin sternchen
function clearpindiv() {
    PINstring = "";
    pin.innerText = "";
    return;
}

//setzt das hauptmenü in die seite rein.
function hauptmenu() {
    //alert("Pin richtig");
    pinmenu = false;
    mainmenu = true;
    clearpindiv();
    title.innerText = "Hauptmenü";
    message.innerText = "";
    moneybuttons.style.display = "table";
    pic.style.display = "none";
}

function money(m) {
    pic.style.display = "block";
    switch(m){
        case 5:
            pic.src = "http://www.erft.de/schulen/rendsburger/wl/bn5v.gif";
            break;
        case 10:
            pic.src = "http://www.erft.de/schulen/rendsburger/wl/bn10v.gif";
            break;
        case 20:
            pic.src = "http://www.erft.de/schulen/rendsburger/wl/bn20v.gif";
            break;
        case 50:
            pic.src = "http://www.erft.de/schulen/rendsburger/wl/bn50v.gif";
            break;
        case 100:
            pic.src = "http://www.erft.de/schulen/rendsburger/wl/bn100v.gif";
            break;
        case 200:
            pic.src = "http://www.erft.de/schulen/rendsburger/wl/bn200v.gif";
            break;
        case 500:
            pic.src = "http://www.erft.de/schulen/rendsburger/wl/bn500v.gif";
            break;
        default:
            break;
    }
    title.innerText = "Geldausgabe";
    message.innerText = "Bitte entnehmen sie ihren Schein.";
    moneybuttons.style.display = "none";
}