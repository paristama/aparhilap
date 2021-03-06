const content = document.getElementById('content');
const list = document.getElementById('list');
const subheader = document.getElementById('subHeader');
const question = document.getElementById('question');
const potikPotik = document.getElementById('potikPotik');
const heading = document.getElementById('heading');
const actionBtn = document.getElementById('actionBtn');
const date = new Date();
const punguan = [
    'A. Gideon Sianturi / br. Sihombing',
    'A. Grace Sihombing / br. Hutabarat',
    'A. Agatha Sihombing / br Manurung',
    'Op. Grasio Simanjuntak / br. Nababan',
    'A. Monica Sihombing / br. Siburian',
    'A. Dasma Sianipar /  br. Sihombing',
    'A. Rikson Sihombing / br. Nababan',
    'A. Butet Sianturi / br. Sihombing',
    'A. Piona Sihombing / br. Rajagukguk',
    'A. Kristin Sihombing / br. Sinaga',
    'Op. Kevin Silaban / br. Sihombing',
    'Op. Jaki Sihombing / br. Simanjuntak',
    'A. Jaki Sihombing / br. Simanjuntak',
    'A. Lasro Sihombing / br. Nababan',
].sort();
const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];
let namandapot = JSON.parse(localStorage.getItem('namandapot')) ?? null;
let nanungamangalean = JSON.parse(localStorage.getItem('nanungamangalenan')) ?? [];

init();

function init() {
    subheader.innerText += ` ${months[date.getMonth()]} ${date.getFullYear()}`;
    baenTuLS('dangdope_mangalean', [...punguan.keys()]);
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', loadMembers);
    } else {
        loadMembers();
    }
}

function loadMembers() {
    console.log(namandapot);
    if (namandapot) {
        showContent('namangalean');
        console.log('ada');
    } else {
        showContent('namandapot');
    }
}

content.addEventListener('click', function (e) {
    const target = e.target;
    if (target !== e.currentTarget) {
        if (target.matches('button.btn-namandapot')) {
            const checkBoxes = Array.from(list.getElementsByTagName('input'));
            checkBoxes.forEach((input) => {
                if (input.checked) namandapot = parseInt(input.value);
            });

            if (!namandapot) {
                alert('Jolo pilit hamu ise namandapot.');
                return;
            }

            baenTuLS('namandapot', namandapot);
            const els = [heading.firstElementChild, ...list.children, actionBtn.firstElementChild];
            let delay = 0;
            for (let i = 0; i < els.length; i++) {
                delay += 0.2 / els.length;
                els[i].style.animationDelay = `${delay}s`;
                console.log('delay');
                els[i].classList.add('fade-out');
                console.log('fade-out');
            }
            console.log('siap hapus');
            actionBtn.addEventListener('animationend', function () {
                els.forEach((el) => el.remove());
                // actionBtn.firstElementChild.classList.add('fade-in');
                showContent('nadangmangalean');
                // baenNunga();
            });
            // const els2 = [heading.firstElementChild, ...list.children, actionBtn.firstElementChild];
            els.forEach((el) => el.classList.add('fade-in'));

            return;
        } else if (target.matches('button.btn-tu-wa')) {
            buatSianLS('nunga_mangalean') ? baenTuWA() : alert('Jolo pillit ise na nunga mangalen');
        }
    }
});

function baenNunga() {
    const div = document.createElement('div');
    const heading = document.createElement('div');
    const h5 = document.createElement('h5');
    div.setAttribute('class', 'list-group');
    div.setAttribute('id', 'listNunga');
    heading.setAttribute('id', 'headingNunga');
    h5.className = 'text-white font-primary mb-3';
    h5.textContent = 'Nunga';
    heading.appendChild(h5);

    actionBtn.parentNode.insertBefore(heading, actionBtn);
    actionBtn.parentNode.insertBefore(div, actionBtn);
}

function baenNungaList(data) {
    const label = document.createElement('label');
    const span = document.createElement('span');
    const input = document.createElement('input');
    label.setAttribute('class', 'list-group-item d-flex align-items-center justify-content-between');
    input.setAttribute('class', 'form-check-input');
    input.setAttribute('type', 'checkbox');

    for (const halak of data) {
        const list = document.createElement('div');
        list.setAttribute('class', 'list-group');
        list.setAttribute('id', 'listNunga');
        span.textContent = punguan[halak];
        input.setAttribute('value', halak);
        label.appendChild(span);
        label.appendChild(input);
        list.appendChild(label);
        content.insertBefore(actionBtn, list);
    }

    // return list;
}

function baenTuWA() {
    const nomorna = '+6285939472196';
    const hatana = baenHatana();
    const linkna = `https://api.whatsapp.com/send?phone=${nomorna}&text=${hatana}`;
    window.location.href = linkna;
}

async function waitFor(duration) {
    const durr = duration / list.children.length;
    for (const elem of list.children) {
        await removeEl(elem, durr);
    }
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    actionBtn.firstElementChild.classList.add('hide');
    // actionBtn.firstElementChild.remove();
    // showContent('nadangmangalean');
}

function removeEl(el, duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(el.classList.add('fade-out'));
        }, duration);
    });
}

function baenTuLS(key, value) {
    if (!JSON.parse(localStorage.getItem(key))) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

function buatSianLS(key) {
    return JSON.parse(localStorage.getItem(key));
}
function apusSianLS(key, index) {
    const sude = buatSianLS(key) ?? [];
    sude.forEach((val, i) => {
        if (val == index) sude.splice(i, 1);
    });
    localStorage[key] = JSON.stringify(sude);
}
function tambaTuLS(key, value) {
    const sude = buatSianLS(key) ?? [];
    sude.push(value);
    localStorage[key] = JSON.stringify(sude);
}

function showContent(param) {
    let type = param == 'namandapot' ? 'radio' : 'checkbox';
    let headingText = param == 'namandapot' ? 'Pillit namandapot' : 'Pillit namangalean';
    let btnText = param == 'namandapot' ? 'Baen' : 'Tongos';
    let addClass = param == 'namandapot' ? 'btn-namandapot' : 'btn-tu-wa';

    heading.innerHTML = `<h5 class="text-white font-primary mb-3" id="question">${headingText}</h5>`;
    actionBtn.innerHTML = `<button type="button" class="mt-3 btn btn-purple ${addClass}" id="potikPotik">${btnText}</button>`;

    const nadangmangalean = buatSianLS('dangdope_mangalean');
    list.innerHTML = baenList(nadangmangalean, type);

    const listEl = buatonListElement('checkbox');
    console.log(listEl);
    listEl.forEach((item, index) =>
        item.addEventListener('click', function () {
            if (item.checked) {
                apusSianLS('dangdope_mangalean', parseInt(item.value));
                tambaTuLS('nunga_mangalean', parseInt(item.value));

                item.parentElement.classList.add('disappear');
                item.parentElement.addEventListener('transitionend', function () {
                    this.remove();
                });

                // const naNunga = buatSianLS('nunga_mangalean');
                // baenNungaList(naNunga);
                // item.parentElement.remove();
                // setTimeout(() => {
                //     console.log('sukses');
                // }, 500);
            }
        })
    );
}

function baenList(data, type) {
    let addAttr = type == 'radio' ? 'name="radio"' : '';
    let html = '';
    data.forEach((value, index) => {
        html += `
		<label class="list-group-item d-flex align-items-center justify-content-between">
			<span>Kel. ${punguan[value]}</span>
			<input class="form-check-input" type="${type}" id="${type + value}" value="${value}" ${addAttr}>
		</label>`;
    });
    return html;
}

function buatonListElement(type) {
    return list.querySelectorAll(`input[type=${type}]`);
}

function baenHatana() {
    const bulanna = months[date.getMonth()];
    const nunga_mangalean = buatSianLS('nunga_mangalean');
    const noRekNa = '*2740257741 BCA* a.n *Roberta Tatarina*';
    let nanunga = '';

    for (let i = 0; i < nunga_mangalean.length; i++) {
        nanunga += `${i + 1}. Kel. ${punguan[nunga_mangalean[i]]}.\n`;
    }

    let hatana = `Horas ma dihita sude punguan Op. Aparhilap. \nHita mulai ma muse arisan untuk bulan *${bulanna}*. \nNa naeng mandapot *Kel ${punguan[namandapot]}*. \n\n*Na nunga mangalean :* \n${nanunga} \n\n`;

    if (buatSianLS('dangdope_mangalean')) {
        hatana += `Na naeng makirim tolong ma ditransfer tu no rekening ${noRekNa}.\n`;
    }
    hatana += 'Mauliate';

    return encodeURI(hatana);
}
