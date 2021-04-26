const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load() {
   const res = await fetch('http://localhost:5000').then(data => data.json())
   res.urls.forEach((item) => {
      addElement(item)
   })
}

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash, a.href, a.innerHTML)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

async function removeElement(el, url, name) {
    console.log(name)
    let data = url.split('')
    let urlFormated = data.slice(0, data.length - 1).join('')

    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove()
        fetch(`http://localhost:5000/?name=${name}&url=${urlFormated}&del=1`)
       'http://localhost:5000/?name=Google&url=http://google.com&del=1'
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })
  
    saveDatas(name, url)
    input.value = ""
})

async function saveDatas(name, url) {
    fetch(`http://localhost:5000/?name=${name}&url=${url}`)
}

load()
