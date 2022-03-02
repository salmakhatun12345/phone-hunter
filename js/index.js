const main = document.getElementById('main')
const detail = document.getElementById('detail')
const error = document.getElementById('error')

const searchClick = () => {
    main.innerHTML = ''
    error.innerText = ''
    const searchBox = document.getElementById('search-box')
    const searchBoxValue = searchBox.value
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchBoxValue}`
    searchBox.value = ''
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            if (data.data == false) {
                error.innerText = 'No Phone Found'
            }
            else {
                showPhoneDetails(data.data)
            }
        })
}
const showPhoneDetails = (phones) => {
    const first20Phones = phones.slice(0, 20)
    first20Phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col-lg-4')
        div.classList.add('col-12')
        div.classList.add('mb-5')
        div.classList.add('mt-5')
        div.innerHTML = `
            <div class="card mx-auto" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                   <h5 class="card-title">Phone-Name: ${phone.phone_name}</h5>
                   <p class="card-text">Brand: ${phone.brand}</p>
                   <button onclick="phoneDetail('${phone.slug}')" href="#" class="btn btn-primary">See Detail </button>
                </div>
            </div>
            `
        main.appendChild(div)
    })
}
const phoneDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => setDetail(data.data))
}

const setDetail = (info) => {
    console.log(info)
    const div = document.createElement('div')
    detail.innerHTML = ''

    if (info.releaseDate == '' || info.releaseDate == null) {
        div.innerHTML = `
        <div class="card mx-auto" style="width: 25rem;">
            <img src="${info.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 id="noRelease" class="card-text text-success"><b>No release Date Found</b></h5>
               <p class="card-text"><b>Storage: </b>${info.mainFeatures.storage}</p>
               <p class="card-text"><b>DisplaySize: </b>${info.mainFeatures.displaySize}</p>
               <p class="card-text"><b>Sensors: </b>${info.mainFeatures.sensors}</p>
               <p class="card-text"><b>Others: WLAN: </b>${info?.others?.WLAN}, Bluetooth: ${info?.others?.Bluetooth}</p>
            </div>
        </div>
        `
        detail.appendChild(div)
    }
    else {
        div.innerHTML = `
        <div class="card mx-auto" style="width: 25rem;">
            <img src="${info.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 id="noRelease" class="card-text">${info?.releaseDate}</h5>
               <p class="card-text"><b>Storage: </b> ${info.mainFeatures.storage}</p>
               <p class="card-text"><b>DisplaySize: </b>${info.mainFeatures.displaySize}</p>
               <p class="card-text"><b>Others: WLAN: </b>${info?.others?.WLAN}, Bluetooth: ${info?.others?.Bluetooth}</p>
            </div>
        </div>
        `
        detail.appendChild(div)
    }
}
