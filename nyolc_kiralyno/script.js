let Q = 8;
let racs = document.querySelector('.container')
let szamlalo = document.querySelector('#kiralynok_szama')


for (let i = 0; i < 64; i++) {
    const negyzet = document.createElement('div')
    if (Math.floor(i / 8) % 2 == 1) {

        if (i % 2 == 1) {
            negyzet.classList.add('black')
        } else {
            negyzet.classList.add('white')
        }
    } else {
        if (i % 2 == 1) {
            negyzet.classList.add('white')
        } else {
            negyzet.classList.add('black')
        }

    }
    negyzet.addEventListener('click', function (e) {
        katt(negyzet);
    })
    racs.appendChild(negyzet)
}

function katt(negyzet) {
    if (Q > 0) {
        if (!negyzet.classList.contains('Q')) {
            negyzet.classList.add('Q')
            negyzet.innerHTML = '♛'
            Q--;
            szamlalo.innerHTML = Q;

        } else {
            negyzet.classList.remove('Q');
            negyzet.innerHTML = '';
            Q++;
            szamlalo.innerHTML = Q;
        }
    } else if ((Q === 0) && negyzet.classList.contains('Q')) {
        negyzet.classList.remove('Q');
        negyzet.innerHTML = '';
        Q++;
        szamlalo.innerHTML = Q;
    }

}