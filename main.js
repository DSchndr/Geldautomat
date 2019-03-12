// Geldautomat Javascript Code

/* 
Todo:
- Korrekturbutton
- Hilfebutton
*/


// Global Variables

var PIN = "1337"; // PIN f¸r den Bankautomaten
var PINlength = "4"; //PINl‰nge
var PINTries = "2"; //PINVersuche (2, da erster versuch schon der dritte ist ;)  )

var PINstring = ""; //Platzhalter f¸r die pin die eingegeben wurde
var clearonpress = false; //True -> div wird zur¸ckgesetzt bei tastendruck

// Diverse platzhalter
var insertcardmenuv = true;
var pinmenu = false;
var mainmenu = false;
var placeholder = false;



/*
Insertcardmenu wird beim start aufgerufen und fordert den
Nutzer auf eine Karte reinzustecken.
*/
function insertcardmenu() {
	kartenschlitz.src = "bilder/kartenschlitz_karte_aussen.png";
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

/*
Insertcard wird aufgerufen wenn die Karte eingesetzt Wurde.
*/
function insertcard() {
	kartenschlitz.src = "bilder/kartenschlitz_karte_drinnen.png";
    insertcardmenuv = false;
    pinmenu = true;
    title.innerText = "PIN-EINGABE";
    message.innerText = "Tipp: 1337";
    pin.innerText = "‚†Ä" //Wir benutzen einen unicode "buchstaben" als platzhalter.
    PINstring = ""
    placeholder = true;
    return;
}


// Keypad handling function
/*
buttonpress wird aufgerufen sobald eine Taste auf dem Tastenfeld
gedr¸ckt wurde
*/
function buttonpress(Button) {
    //console.debug("BUTTON: " + Button);

    if (mainmenu) { //Sind wir im hauptmen¸?
        if (Button == "a") {
            insertcardmenu(); //Abbrechen dr¸cken -> z¸r¸ck in das karte einsetzen men¸.
            return;
        }
    }

    if (pinmenu) { //Sind wir im pineigabemen¸?
        // Wenn clearonpress wahr oder taste abbrechen gedr√ºckt wurde -> PIN feld s√§ubern
        if (clearonpress) {
            clearonpress = false;
            clearpindiv();
        }

        // korrektur und hilfe buttons werden nicht benutzt
        if ((Button == "k") | (Button == "h")) {
            return;
        }

        // wenn abbrechen gedr√ºckt wurde
        if (Button == "a") {
            clearpindiv();
            pin.innerText = "‚†Ä" //Wir benutzen einen unicode "buchstaben" als platzhalter.
            return;
        }
        // wenn Best√§tigen gedr√ºckt wurde
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
                    message.innerText = "PIN Falsch! " + PINTries + " versuche √ºbrig.";
                    PINTries = PINTries - 1;
                    clearonpress = true;
                    return;
                }
                else {
                    //alert("Keine versuche mehr √ºbrig.");
                    pin.innerText = "Karte Gesperrt!"
                    message.innerText = "Keine versuche mehr √ºbrig.";
                    pinmenu = false;
                    return;
                }
            }
        }
        //Sternchen in Pindiv einsetzen.
        if (PINstring.length <= PINlength) { //
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

//s√§ubert den div mit den pin sternchen
function clearpindiv() {
    PINstring = "";
    pin.innerText = "";
    return;
}

/*
hauptmenu macht die "Geld Tasten" sichtbar.
*/
//setzt das hauptmen√º in die seite rein.
function hauptmenu() {
    pinmenu = false;
    mainmenu = true;
    clearpindiv();
    title.innerText = "Hauptmen√º";
    message.innerText = "";
    moneybuttons.style.display = "table";
    pic.style.display = "none";
    ausgabeschacht.style.backgroundColor = "#3f3f3f";
}

/*
money ‰ndert die hintergrundfarbe von dem div mit dem Bild und setzt das 
zugehˆrige Bild ein.
*/

function money(m) {
    title.innerText = "Geldausgabe";
    message.innerText = "Bitte entnehmen sie ihren Schein.";
    moneybuttons.style.display = "none"; //geldtasten unsichtbar
    pic.style.display = "block"; //Bild sichtbar
    ausgabeschacht.style.backgroundColor = "#ffffff"; //ausgabeschacht weiss f√§rben
    
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
            message.innerText = "Bitte entnehmen sie ihren 'Schein'.";
            pic.src = "https://bestbuds.de/wp-content/uploads/2018/06/joint.jpg";
        default:
            break;
    }
}


/*
detectie wird beim laden der seite aufgerufen und fordert den nutzer auf
einen anderen browser zu benutzen
*/
// https://stackoverflow.com/questions/24861073/detect-if-any-kind-of-ie-msie/24861307
function detectie(triggermessage) {
    if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1) || triggermessage) {
        //alert("Internet Explorer veraltet. Bitte Firefox, Google Chrome oder Opera benutzen.");
    }
    return;
}