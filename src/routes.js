const express = require('express')

const Routes = express.Router()


let projetos = []

const veirfyIfProjectExists = (req, res, next) => {

    const { id } = req.params
    const project = projetos.map(project => project.id === `${id}`)
    if(!project[0]){
        return res.status(400).json({error:'Project not found'})
    }
    return next()

}


Routes.get('/', (req, res) => {
    return res.json({ alive: true })
})

Routes.get('/projects', (req, res) => {
    return res.json(projetos)
})
Routes.post('/projects', (req, res) => {
    const { id, title } = req.body
    projetos.push({ id, title, tasks: [] })
    return res.json(projetos)
})

Routes.get('/projects/:id', veirfyIfProjectExists,(req, res) => {
    const { id } = req.params
    const project = projetos.filter(project => project.id === `${id}`)
    return res.json(project)
})

Routes.put('/projects/:id',veirfyIfProjectExists, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    projetos = projetos.map(project => {
        if (project.id === `${id}`) {
            project.title = title
        }
        return project
    })

    return res.json(projetos)

})

Routes.delete('/projects/:id',veirfyIfProjectExists, (req, res) => {

    const { id } = req.params

    projetos.splice(projetos.findIndex(projeto => projeto.id === `${id}`), 1);

    return res.send()

})

Routes.post('/projects/:id/tasks',veirfyIfProjectExists, (req, res) => {
    const { id } = req.params
    const { title } = req.body

    projetos = projetos.map(project => {
        if (project.id === id) {
            project.tasks.push(title)
        }
        return project
    })

    return res.json(projetos)

})


module.exports = Routes