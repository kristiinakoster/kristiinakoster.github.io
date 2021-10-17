(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            //https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
            const elpl = h >= 12 ? 'PL' : 'EL';
            h = h % 12;
            h = h ? h : 12;

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + elpl;

        }

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);
    let e = document.getElementById("delivery");
    e.innerHTML = " 0.0 &euro;";



    function estimateDelivery(event) {

        let total = 0.0;
        event.preventDefault();
        let linn = document.getElementById("linn");

        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        }
        let v1 = document.getElementById("v1");
        if (v1.checked === true) { total += 5.0 }
        let v2 = document.getElementById("v2");
        if (v2.checked === true) { total += 1.0 }
        let v3 = document.getElementById("v3");
        if (v3.checked === true) { total += 4.0 }
        let v4 = document.getElementById("v4");
        if (v4.checked === true) { total += 2.0 }
        let v5 = document.getElementById("v5");
        if (v5.checked === true) { total += 0.0 }
        switch(linn.value) {
            case "tln":
                total += 0.0;
                break;
            case "trt":
                total += 2.5;
                break;
            case "nrv":
                total += 2.5;
                break;
            case "prn":
                total += 3.0;
                break;

        }
        e.innerHTML = total + "&euro;";
        console.log("Tarne hind on arvutatud");
    }
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map, infobox;

function GetMap() {

    "use strict";

    let tartu = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let haanja = new Microsoft.Maps.Location(
        57.719819835356446,
        27.04662161978867
    );
    let keskpunkt= new Microsoft.Maps.Location(
        58.05843656197971,
        27.079384684425712
    )

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true,
        center: keskpunkt,
        zoom: 8
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    let pushpin1 = new Microsoft.Maps.Pushpin(tartu, {title: 'Tartu Ülikool'});
    let pushpin2 = new Microsoft.Maps.Pushpin(haanja, {title: 'Haanja'});

    pushpin1.metadata = {
        title: 'Tartu Ülikool',
        description: "Delta hoone"
    };
    pushpin2.metadata = {
        title: 'Haanja',
        description: "Siin asub Haanja"
    };
    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    map.entities.push(pushpin1);
    map.entities.push(pushpin2);


    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

}
// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/infoboxes/infobox-when-pushpin-clicked
// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

