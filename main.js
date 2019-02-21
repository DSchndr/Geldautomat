// Geldautomat Javascript Code

/* 
Todo:
- Prüfen ob eine karte eingesetzt wurde
*/


// Global Variables

var PIN = "1337";
var PINlength = "4";
var PINTries = "2"; //2, da erster versuch schon der dritte ist ;)
var PINstring = "";
var clearonpress = false;
var pinmenu = true;
var mainmenu = false;

// Keypad handling functions

function buttonpress(Button) {
    console.debug("BUTTON: " + Button);
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
                alert("Pin zu kurz");
                return;
            }
            //pin zu lang
            if (PINstring.length > PINlength) {
                alert("PIN zu lang");
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
                    pin.innerText = "PIN Falsch! " + PINTries + " versuche übrig.";
                    PINTries = PINTries - 1;
                    clearonpress = true;
                    return;
                }
                else {
                    alert("Keine versuche mehr übrig.");
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
    alert("Pin richtig");
    pinmenu = false;
    mainmenu = true;
    clearpindiv();
    title.innerText = "Hauptmenü";
}