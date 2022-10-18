import { GithubUser } from "./GithubUser.js"

export class Favorities {
  constructor(root) {
    this.root = document.querySelector(root)

    this.load()

    GithubUser.search('alissonif').then(user => console.log(user))
  }
  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }
  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {

      const userExists = this.entries.find(entry => entry.login === username)
      console.log(userExists)

      if (userExists) {
        throw new Error('Usuário já cadastrado!')
      }

      const user = await GithubUser.search(username)
      console.log(user)
      if (user.login === undefined) {
        throw new Error('Usuário não encontrado')
      }
      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch (error) {
      alert(error.message)
    }
  }
  delete(user) {
    const filteredEntries = this.entries
      .filter(entry => entry.login !== user.login)
    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class FavoritiesView extends Favorities {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')

      this.add(value)
    }
  }

  DellScroll() {
    const noFavorite = document.querySelector('footer')
    if (this.entries.length < 1) {
      noFavorite.classList.remove('hide')
    } else {
      noFavorite.classList.add('hide')
    }

  }

  update() {
    this.DellScroll()
    this.retmoAllTr()

    // if (this.entries.length === 0) {

    //   const row = this.createRow2()
    //   this.tbody.append(row)
    // }


    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `http://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = `${user.name}`
      row.querySelector('.user span').textContent = `/${user.login}`
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOK = confirm('Tem certeza que deseja deletar essa linha?')
        if (isOK) {
          this.delete(user)
        }
      }
      this.tbody.append(row)
    })

  }

  createRow() {
    const tr = document.createElement('tr')
    tr.innerHTML = `
   <td class="user">
    <img src="" alt="">
    <a href="" target="_blank">
      <p></p>
      <span></span>
    </a>
  </td>
  <td class="repositories">
  </td>
  <td class="followers">
  </td>
  <td>
    <button class="remove ">Remover</button>
  </td>
   `
    return tr
  }

  createRow2() {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <div class='box'  class="kkk" class='sr-only'>

  <img src='./estrela.svg' class='estrelaCinza'>

     <h1>Nenhum favorito ainda!</h1>

      </div>
     `
    return tr
  }

  retmoAllTr() {
    this.tbody.querySelectorAll('tr')
      .forEach(tr => {
        tr.remove()
      });
  }
}
