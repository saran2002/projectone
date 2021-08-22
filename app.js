let data=[]
 let content = document.querySelector('#content')
    const getdata = async (link) => {
            let response = await fetch(link)
            let resdata = await response.json()
            return resdata
}
  content.innerHTML=`<div class="alert alert-success" role="alert">
  Still Loading Wait for a Moment ...
  </div>`
getdata("https://restcountries.eu/rest/v2/all")
.then((e)=> {
    data = e
      if (data === null || data === undefined || data.length === 0) {
            content.innerHTML = `<div class="alert alert-danger" role="alert">
            No Data
          </div>`
          }
          else {
              putData(data.slice(0,10))
          }
})
.catch((err)=> {
    console.log(err.message)
})
const putData = (finalData) => {
  content.innerHTML = ''
  finalData.map((country) => content.innerHTML +=
`
      <div class="card mx-3 my-3" style="width: 18rem;">
      <div class="card-header text-center">
         ${country.alpha2Code}
      </div>
     <img src="${country.flag}" class="card-img-top border-light"> </img>
     <div class="card-body">
     <h5 class="card-tittle text-center">Name: ${country.name}</h5>
     <h5 class="lead">Capital: ${country.capital}</h5>
     <h5 class="lead">region: ${country.region}</h5>
     <h5 class="lead">Sub-Region: ${country.subregion}</h5>
     <h5 class="lead">Population: ${country.population}</h5>
     <h5 class="lead">timezones: ${country.timezones}</h5>
    <h5 class="lead">currency: ${country.currencies[0].name}</h5>

    
  </div>
 </div>
  `
)
}
document.querySelector('#search').addEventListener('input',(event)=>{
  let finalData = data.filter((country) =>country.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
  if(event.target.value === ''){
    finalData = finalData.slice(0,10)
  }
  if (finalData.length === 0) {
    content.innerHTML = `country not found/wront input`
}else{
     putData(finalData)
 }
})
const getIP = async() => {
  let myIP = await fetch('https://api.ipify.org/?format=json')
  let ipResult = await myIP.json()
  return ipResult
}
getIP().then(ip=>{
  document.querySelector('#ip').textContent = `Your IP is : ${ip.ip}`
})
