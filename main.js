const button = document.querySelector("button")

const wait = time =>{
  setTimeout(()=>{
  button.disabled = false
  button.textContent = "Naciśnij przycisk"
  },time)  

}

const makeSomeNoise = async () =>{
  button.disabled = true
  button.textContent = "Proszę czekać"
  const number = Math.floor(Math.random()*9 +1)
  const fart = new Audio(`./fart noises/fart${number}.mp3`)
  await fart.play()
  const duration = fart.duration* 1000
  wait(duration)
  
}

button.addEventListener("click", makeSomeNoise)