import { Router } from './route.js'

const router = new Router()
router.add('/home', 'pages/page1.html')
router.add('/universo', 'pages/page2.html')
router.add('/exploracao', 'pages/page3.html')
router.add(404, 'pages/404.html')

router.handle()
window.onpopstate = () => router.handle()
window.route = () => router.route()



// conssole.log(rotes['/about'])

// a=document.querySelector('nav a:nth-child(1)').addEventListener('click', (event)=>{})
// a.addEventListener('click', (event) => { })