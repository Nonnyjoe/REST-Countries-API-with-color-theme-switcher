const cBody = document.getElementById('c-body');
const continents = document.getElementById('continents');
const searchField = document.getElementById('searchField');
const searchBtn = document.getElementById('searchBtn');
const pcContent = document.getElementById('pcContent');
const personalCountryCont = document.getElementById('personalCountry');
const countriesSec = document.getElementById('countriesSec');
const back = document.getElementById('back');
const changeMode = document.querySelector(".changeMode");

function homeDispCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(Response => Response.json())
        .then(result => showResult(result))
}
homeDispCountries();

continents.addEventListener('click', (e) => {
    e.preventDefault();
    let element = e.target;
    switch (true) {
        case (element.classList.contains('Africa')):
            filterContinents('africa')
            break;
        case (element.classList.contains('America')):
            filterContinents('america')
            break;
        case (element.classList.contains('Asia')):
            filterContinents('asia')
            break;
        case (element.classList.contains('Europe')):
            filterContinents('europe')
            break;
        case (element.classList.contains('Oceania')):
            filterContinents('oceania')
            break;
    }
})

function filterContinents(continent) {
    fetch(`https://restcountries.com/v3.1/region/${continent}`)
        .then(response => response.json())
        .then(result => showResult(result))
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (searchField.value !== '') {
        let name = searchField.value;
        try {
            fetch(`https://restcountries.com/v3.1/name/${name}`)
                .then(response => response.json())
                .then(result => showResult(result))
        } catch (error) {
            console.log('Error:' + error)
        }
    } else {
        console.log('empty');
    }
})

function showResult(result) {
    let html = '';
    let color = '';
    result.forEach((data) => {
        if (changeMode.classList.contains('dark')) {
            color = 'dark-component';
        }

        let { common } = data.name;
        let { region, capital, population, continents, cca2 } = data;
        let { svg } = data.flags;

        html += ` <div class="card ${color} country col-sm-12 col-md-2 col-lg-3 col-xl-4 col-xxl-4" id="${cca2}" style="width: 15rem;">
                <img src="${svg}" class="card-img-top flag" alt="..."> 
            <div class="card-body card-b">
                <h6 class="card-title"><b>${common}</b> </h6>
                <p class="card-text c-txt"> <b>Population:</b> <span>${population}</span></p>
                <p class="card-text c-txt"> <b>Region:</b> <span>${region}</span></p>
                <p class="card-text c-txt"><b>Capital:</b> <span>${capital}</span></p>
            </div>
            <div class="cover" id="${cca2}">
                .
            </div>
        </div>`;
    });
    cBody.innerHTML = html;
    searchField.value = '';
}


cBody.addEventListener('click', (e) => {
    let target = e.target.id;
    if (target !== 'c-body') {
        personalCountry(target);
    }
});

function personalCountry(target) {
    fetch(`https://restcountries.com/v3.1/alpha/${target}`)
        .then(resp => resp.json())
        .then(nResult => showResult(nResult))

    function showResult(result) {
        let html = '';
        let Mborders = '';
        result.forEach((data) => {
            let { population, region, subregion, capital, tld, languages, borders, currencies } = data;
            let { common, nativeName } = data.name;
            let { svg } = data.flags;
            let language = Object.values(languages);
            let currency = Object.values(currencies);
            let { name } = currency[0]
            let nName = Object.values(nativeName);
            let { official } = nName[0];
            Mborders = borders;
            html += `<div class="row">
                        <div class="personalFlag col-md-5">
                            <img src="${svg}" alt="">
                        </div>
                        <div class="personalDetails col-md-7">
                            <h3 class="personalCountryName mb-3"> <b>${common}</b> </h3>
                            <div class="row">
                                <div class="col-md-6">
                                    <p class=" c-txt "> <b>Native Name:</b> <span>${official}</span></p>
                                    <p class=" c-txt "> <b>Population:</b> <span>${population}</span></p>
                                    <p class=" c-txt "> <b>Region:</b> <span>${region}</span></p>
                                    <p class=" c-txt "> <b>Sub Region:</b> <span>${subregion}</span></p>
                                    <p class=" c-txt "> <b>Capital:</b> <span>${capital}</span></p>
                                </div>
                                <div class="col-md-6">
                                    <p class=" c-txt "> <b>Top Level Domain:</b> <span>${tld}</span></p>
                                    <p class=" c-txt "> <b>Currencis:</b> <span>${name}</span></p>
                                    <p class=" c-txt "> <b>Languages:</b> <span>${language}</span></p>
                                </div> 
                                <div class="border-container row mt-4 mb-5">
                                    <div class="border-title col-md-4 mb-2">
                                        <h5>Border Countries</h5>
                                    </div>
                                    <div class="border-cont buttons col-md-8">`
        });
        showBorder(html, Mborders);
    }
}


function showBorder(html, borders) {
    if (borders) {
        fetch(`https://restcountries.com/v3.1/alpha?codes=${borders}`)
            .then(response => response.json())
            .then(result => dispBorder(result));
    } else {
        html += `       </div>
                        </div>
                        </div>
                        </div>`
        pcContent.innerHTML = html;
    }
    let color = '';

    function dispBorder(result) {
        result.forEach((data) => {
            let { common } = data.name;
            let { cca2 } = data;
            if (changeMode.classList.contains('dark')) {
                color = 'dark-component';
            }
            html += `<button class="personalBtn ${color} personalBtn2" id="${cca2}"> ${common} </button>`
        })
        html += `       </div>
                        </div>
                        </div>
                        </div>`
        pcContent.innerHTML = html;
    };
    personalCountryCont.classList.add('open');
    personalCountryCont.classList.remove('close');
    countriesSec.classList.add('close');
}

back.addEventListener('click', (e) => {
    e.preventDefault();
    personalCountryCont.classList.add('close');
    personalCountryCont.classList.remove('open');
    countriesSec.classList.remove('close');
})

personalCountryCont.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains("personalBtn2")) {
        let target = e.target.id;
        personalCountry(target);
    }
})

changeMode.addEventListener('click', (e) => {
    let body = document.body;
    let mode = document.querySelectorAll('.mode');
    changeMode.classList.toggle('dark');
    body.classList.toggle('dark-mode');
    mode.forEach((component) => {
        component.classList.toggle('dark-component');
    })
    let country = document.querySelectorAll('.country');
    country.forEach(tCountry => {
        if (body.classList.contains('dark-mode')) {
            tCountry.classList.add('dark-component');
        } else {
            tCountry.classList.remove('dark-component');
        }
    });
    let personalBtn2 = document.querySelectorAll('.personalBtn2');
    personalBtn2.forEach((personalBtn) => {
        if (body.classList.contains('dark-mode')) {
            personalBtn.classList.add('dark-component');
        } else {
            personalBtn.classList.remove('dark-component');
        }
    })
    if (changeMode.classList.contains('dark')) {
        changeMode.innerHTML = ' <i class="fa-regular fa-moon"></i> Light Mode';
    } else {
        changeMode.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode';
    }
})