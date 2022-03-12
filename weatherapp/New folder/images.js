const imageURL = 'https://openweathermap.org/img/wn/10d@2x.png';
// let tempImage = document.getElementById('icon');

document.getElementById("tempIcon").setAttribute('src', imageURL);
// fetch('https://openweathermap.org/img/wn/10d@2x.png')
// .then(result => result.blob())
// .then(result => {
//     console.log(result)
//     // image.src=
//      console.log(URL.createObjectURL(result))
// })
// .catch(error => console.log('image error', error))
