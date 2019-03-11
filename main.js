// Geldautomat Javascript Code

/* 
Todo:
- Korrekturbutton
- Hilfebutton
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
var placeholder = false;

function insertcardmenu() {
    title.innerText = "Bitte Karte reinstecken";
    message.innerText = "";
    moneybuttons.style.display = "none";
    pic.style.display = "none";
    ausgabeschacht.style.backgroundColor = "#3f3f3f";
    pinmenu = false;
    insertcardmenuv = true;
    mainmenu = false;
    return;
}

function insertcard() {
    //alert("Insertcard called");
    insertcardmenuv = false;
    pinmenu = true;
    title.innerText = "PIN-EINGABE";
    message.innerText = "Tipp: 1337";
    pin.innerText = "⠀" //Wir benutzen einen unicode "buchstaben" als platzhalter.
    PINstring = ""
    placeholder = true;
    //alert("Insertcard done");
    //return;
}

// Keypad handling functions

function buttonpress(Button) {
    //console.debug("BUTTON: " + Button);

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
            if (placeholder) {
                placeholder = false;
                pin.innerText = "";
            }
            pin.innerText = pin.innerText + "*";
            PINstring = PINstring + Button;
            //console.debug("PINSTRING: " + PINstring);
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
    pinmenu = false;
    mainmenu = true;
    clearpindiv();
    title.innerText = "Hauptmenü";
    message.innerText = "";
    moneybuttons.style.display = "table";
    pic.style.display = "none";
    ausgabeschacht.style.backgroundColor = "#3f3f3f";
}

function money(m) {
    title.innerText = "Geldausgabe";
    message.innerText = "Bitte entnehmen sie ihren Schein.";
    moneybuttons.style.display = "none"; //geldtasten unsichtbar
    pic.style.display = "block"; //Bild sichtbar
    ausgabeschacht.style.backgroundColor = "#ffffff"; //ausgabeschacht weiss färben
    
    switch (m) { //bild ersetzen
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
        case "j": //easteregg ;)
            pic.src = "https://bestbuds.de/wp-content/uploads/2018/06/joint.jpg";
        default:
            break;
    }
}

// https://stackoverflow.com/questions/24861073/detect-if-any-kind-of-ie-msie/24861307
function detectie(triggermessage) {
    if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1) || triggermessage) {
        //alert("Internet Explorer veraltet. Bitte Firefox, Google Chrome oder Opera benutzen.");
    }
    return;
}