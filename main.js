// Geldautomat Javascript Code

/* 
Todo:
- Korrekturbutton
- Hilfebutton
*/


// Global Variables

var PIN = "1337"; // PIN f�r den Bankautomaten
//var PINlength = "4"; //Maximale PINl�nge (5)
var PINTries = "2"; //PINVersuche (2, da erster versuch schon der dritte ist ;)  )

var PINstring = ""; //Platzhalter f�r die pin die eingegeben wurde
var clearonpress = false; //True -> div wird zur�ckgesetzt bei tastendruck

// Diverse platzhalter
var insertcardmenuv = true;
var pinmenu = false;
var mainmenu = false;
var placeholder = false;

var moneyv = 1000;

function overridepin() {
	if (pinovvalue.value == null) {
		alert("Wert darf nicht leer sein!");
		return;
	}
	PIN = pinovvalue.value;
    insertcardmenu();
}

function overridemoney() {
	if (overridevalue.value == null) {
		alert("Wert darf nicht leer sein!");
		return;
	}
    moneyv = overridevalue.value;
    insertcardmenu();
}


/*
    Insertcardmenu wird beim start aufgerufen und fordert den
    Nutzer auf eine Karte reinzustecken.
*/
function insertcardmenu() {
    message.style.fontSize = "2rem";
    karte.src = "bilder/Karte.png";
    karte.style.marginTop = "0px";
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
    Insertcard wird aufgerufen wenn die Karte eingesetzt wird.
*/
function insertcard() {
    if (mainmenu || pinmenu) {
        return;
    }
    karte.src = "bilder/Karte_half.png";
    karte.style.marginTop = "-25px";
    insertcardmenuv = false;
    pinmenu = true;
    mainmenu = false;
    moneybuttons.style.display = "none"; //geldtasten unsichtbar
    title.innerText = "PIN-EINGABE";
    message.innerText = "Tipp: 1337";
    pin.innerText = "⠀" //Wir benutzen einen unicode "buchstaben" als platzhalter.
    PINstring = ""
    placeholder = true;
    return;
}


// Keypad handler
/*
    buttonpress wird aufgerufen sobald eine Taste auf dem Tastenfeld
    gedr�ckt wurde
*/
function buttonpress(Button) {
    //console.debug("BUTTON: " + Button);
    if (Button == "h") {
        window.location = "http://www.google.com/search?q=wie+funktioniert+ein+geldautomat";
        // return;
    }


    if (mainmenu) { //Sind wir im hauptmen�?
        if (Button == "a") {
            insertcardmenu(); //Abbrechen dr�cken -> z�r�ck in das karte einsetzen men�.
            return;
        }
    }

    if (pinmenu) { //Sind wir im pineigabemen�?
        PINlength = PIN.length; //Pinlänge berechen
        // Wenn clearonpress wahr oder taste abbrechen gedrückt wurde -> PIN feld säubern
        if (clearonpress) {
            clearonpress = false;
            clearpindiv();
        }
        if (Button == "k") {
            clearpindiv();
            pin.innerText = "⠀" //Wir benutzen einen unicode "buchstaben" als platzhalter.
            return;
        }

        // wenn abbrechen gedrückt wurde
        if (Button == "a") {
            insertcardmenu();
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
                if (PINTries >= "1") { // Versuche noch verfügbar
                    message.innerText = "PIN Falsch! " + PINTries + " versuche übrig.";
                    PINTries = PINTries - 1;
                    clearonpress = true;
                    return;
                } 
                else { // Keine versuche mehr für den nutzer -> Karte gesperrt.
                    //alert("Keine versuche mehr übrig.");
                    pin.innerText = "Karte Gesperrt!"
                    message.innerText = "Keine versuche mehr übrig.";
                    pinmenu = false;
                    return;
                }
            }
        }
        //Sternchen in Pindiv einsetzen.
        if (PINstring.length <= PINlength) { //pinlänge pin + 1  beschränken
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

/*
    hauptmenu macht die "Geld Tasten" sichtbar.
*/
//setzt das hauptmenü in die seite rein.
function hauptmenu() {
    pinmenu = false;
    mainmenu = true;
    clearpindiv();
    title.innerText = "Hauptmenü";
    //message.innerText = "";
    message.innerText = "Ihr Kontostand: " + moneyv + "€";
    message.style.fontSize = "1rem";
    moneybuttons.style.display = "table";
    pic.style.display = "none";
    ausgabeschacht.style.backgroundColor = "#3f3f3f";
}

/*
    money �ndert die hintergrundfarbe von dem div mit dem Bild und setzt das 
    zugeh�rige Bild ein.
*/

function money(m) {
    title.innerText = "Geldausgabe";
    message.innerText = "Bitte entnehmen sie ihren Schein.";
    moneybuttons.style.display = "none"; //geldtasten unsichtbar
    pic.style.display = "block"; //Bild sichtbar
    ausgabeschacht.style.backgroundColor = "#ffffff"; //ausgabeschacht weiss färben
    moneyv = moneyv - m; // Betrag von kontostand abziehen
    switch (m) { //bild ersetzen
        case 5:
            pic.src = "bilder/geld/5.gif";
            break;
        case 10:
            pic.src = "bilder/geld/10.gif";
            break;
        case 20:
            pic.src = "bilder/geld/20.gif";
            break;
        case 50:
            pic.src = "bilder/geld/50.gif";
            break;
        case 100:
            pic.src = "bilder/geld/100.gif";
            break;
        case 200:
            pic.src = "bilder/geld/200.gif";
            break;
        case 500:
            pic.src = "bilder/geld/500.gif";
            break;
        case "j": //easteregg ;)
            message.innerText = "Bitte entnehmen sie ihren 'Schein' ;) ";
            pic.src = "http://dschndr.ddns.net/images/easteregg.png";
            moneyv = 420;
        default:
            break;
    }
    message.innerText = "Ihr Kontostand: " + moneyv + "€";
    message.style.fontSize = "2rem";
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