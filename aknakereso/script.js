import confetti from "https://cdn.skypack.dev/canvas-confetti"

document.addEventListener('DOMContentLoaded', main);

function main() {
    let szelesseg = 10;
    let bombak_szama = 20;
    let zaszlok = 0;
    let vege_a_jateknak = false
    let racs = document.querySelector('#grid');
    let divlista = racs.children;

    const zaszlok_hatra = document.querySelector('#zaszlok-hatra')
    const eredmeny = document.querySelector('#eredmeny')

eredmeny.addEventListener('click', () =>{ 
    location.reload();
} )
    palya();

    function palya() {
        zaszlok_hatra.innerHTML = bombak_szama;
        let bomba_lista = Array(bombak_szama).fill('bomba');
        let ervenyes_lista = Array(szelesseg * szelesseg - bombak_szama).fill('ervenyes');
        let jatek_lista = bomba_lista.concat(ervenyes_lista);
        keveres(jatek_lista);


        for (let i = 0; i < divlista.length; i++) {
            const negyzet = divlista[i];
            negyzet.setAttribute('id', i);
            negyzet.classList.add(jatek_lista[i]);

            negyzet.addEventListener('click', function (e) {
                katt(negyzet);
            })
            negyzet.oncontextmenu = function (e) {
                e.preventDefault()
                zaszlo(negyzet)
            }
        }

        //szamok

        for (let i = 0; i < szelesseg * szelesseg; i++) {
            let ossz = 0;
            const bal_szelen_van = i % szelesseg === 0;
            const jobb_szelen_van = i % szelesseg === szelesseg - 1;


            if (divlista[i].classList.contains('ervenyes')) {

                if (i > 0 && !bal_szelen_van && divlista[i - 1].classList.contains('bomba')) ossz++

                if (i > 9 && !jobb_szelen_van && divlista[i + 1 - szelesseg].classList.contains('bomba')) ossz++

                if (i >= 10 && divlista[i - szelesseg].classList.contains('bomba')) ossz++

                if (i >= 11 && !bal_szelen_van && divlista[i - 1 - szelesseg].classList.contains('bomba')) ossz++

                if (i <= 98 && !jobb_szelen_van && divlista[i + 1].classList.contains('bomba')) ossz++

                if (i < 90 && !bal_szelen_van && divlista[i - 1 + szelesseg].classList.contains('bomba')) ossz++

                if (i <= 88 && !jobb_szelen_van && divlista[i + 1 + szelesseg].classList.contains('bomba')) ossz++

                if (i <= 89 && divlista[i + szelesseg].classList.contains('bomba')) ossz++

                divlista[i].setAttribute('data', ossz)
            }
        }
    }

    function zaszlo(negyzet) {
        if (vege_a_jateknak) return

        if (!negyzet.classList.contains('checked') && (zaszlok < bombak_szama)) {
            if (!negyzet.classList.contains('zaszlo')) {
                negyzet.classList.add('zaszlo')
                negyzet.innerHTML = '🚩'
                zaszlok++;
                zaszlok_hatra.innerHTML = bombak_szama - zaszlok;
                jatek_allasa();
            }
            else {
                negyzet.classList.remove('zaszlo')
                negyzet.innerHTML = ''
                zaszlok--;
                zaszlok_hatra.innerHTML = bombak_szama - zaszlok;
            }
        }
        else if (!negyzet.classList.contains('checked') && (zaszlok === bombak_szama) && negyzet.classList.contains('zaszlo')) {

            negyzet.classList.remove('zaszlo')
            negyzet.innerHTML = ''
            zaszlok--;
            zaszlok_hatra.innerHTML = bombak_szama - zaszlok;
        }

    }

    function katt(negyzet) {
        let jelenlegiID = negyzet.id
        if (vege_a_jateknak) return;

        if (negyzet.classList.contains('checked') || negyzet.classList.contains('zaszlo')) return;
        if (negyzet.classList.contains('bomba')) {
            gamover(negyzet);
        } else {
            let ossz = negyzet.getAttribute('data');
            if (ossz != 0) {
                negyzet.classList.add('checked')
                if (ossz == 1) negyzet.classList.add('egy')
                if (ossz == 2) negyzet.classList.add('ketto')
                if (ossz == 3) negyzet.classList.add('harom')
                if (ossz == 4) negyzet.classList.add('negy')
                if (ossz == 5) negyzet.classList.add('ot')
                if (ossz == 6) negyzet.classList.add('hat')
                if (ossz == 7) negyzet.classList.add('het')
                if (ossz == 8) negyzet.classList.add('nyolc')
                //5,6,7,8
                negyzet.innerHTML = ossz
                jatek_allasa();
                return
            }
            ellenorzes(negyzet, jelenlegiID);
            jatek_allasa();
        }
        negyzet.classList.add('checked')
        jatek_allasa();
    }

    function ellenorzes(negyzet, jelenlegiID) {
        const bal_szelen_van = (jelenlegiID % szelesseg === 0)
        const jobb_szelen_van = (jelenlegiID % szelesseg === szelesseg - 1)

        setTimeout(() => {
            if (jelenlegiID > 0 && !bal_szelen_van) {
                const ujID = divlista[parseInt(jelenlegiID) - 1].id
                const ujnegyzet = document.getElementById(ujID)
                katt(ujnegyzet);
            }
            if (jelenlegiID > 9 && !jobb_szelen_van) {
                const ujID = divlista[parseInt(jelenlegiID) + 1 - szelesseg].id
                const ujnegyzet = document.getElementById(ujID)
                katt(ujnegyzet)
            }
            if (jelenlegiID >= 10) {
                const ujID = divlista[parseInt(jelenlegiID - szelesseg)].id
                const ujnegyzet = document.getElementById(ujID)
                katt(ujnegyzet)
            }
            if (jelenlegiID >= 11 && !bal_szelen_van) {
                const ujID = divlista[parseInt(jelenlegiID) - 1 - szelesseg].id
                const ujnegyzet = document.getElementById(ujID)
                katt(ujnegyzet)
            }
            if (jelenlegiID <= 98 && !jobb_szelen_van) {
                const ujID = divlista[parseInt(jelenlegiID) + 1].id
                const ujnegyzet = document.getElementById(ujID)
                katt(ujnegyzet)
            }
            if (jelenlegiID < 90 && !bal_szelen_van) {
                const ujID = divlista[parseInt(jelenlegiID) - 1 + szelesseg].id
                const ujnegyzet = document.getElementById(ujID)
                katt(ujnegyzet)
            }
            if (jelenlegiID <= 88 && !jobb_szelen_van) {
                const ujID = divlista[parseInt(jelenlegiID) + 1 + szelesseg].id
                const ujnegyzet = document.getElementById(ujID)
                katt(ujnegyzet)
            }
            if (jelenlegiID <= 89) {
                const ujID = divlista[parseInt(jelenlegiID) + szelesseg].id
                const ujnegyzet = document.getElementById(ujID)
                katt(ujnegyzet)
            }
        }, 10)

    }

    function gamover(negyzet) {
        eredmeny.innerHTML = 'Game Over!'
        vege_a_jateknak = true


        for (const negyzet of divlista) {
            if (negyzet.classList.contains('bomba')) {
                negyzet.classList.add('checked')
                negyzet.innerHTML = '💣'
            }

        }
    }
    function jatek_allasa() {
        let talalatok = 0
        let negyzetek_tal = 0

        for (let i = 0; i < divlista.length; i++) {
            if (divlista[i].classList.contains('zaszlo') && divlista[i].classList.contains('bomba')) {
                talalatok++;
            }
            if (divlista[i].classList.contains('checked') && divlista[i].classList.contains('ervenyes')) {
                negyzetek_tal++;
            }

            if (talalatok === bombak_szama || negyzetek_tal === 80) {
                eredmeny.innerHTML = 'You won!'
                vege_a_jateknak = true;
                var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio)
  }));
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
            }
        }
    }
}



function veletlen(mettol, meddig) {
    let oldalszam = meddig - mettol + 1; 
    return mettol + Math.floor(Math.random() * oldalszam);
}

function keveres(lista) {
    for (let i = 0; i < lista.length; i++) {
        csere(i, veletlen(i, lista.length - 1), lista);
    }

}

function csere(i, j, lista) {
    let temp = lista[i];
    lista[i] = lista[j];
    lista[j] = temp;
}