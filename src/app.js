const path= require('path')
const express= require('express')
const hbs= require('hbs')
//const { resolveSoa } = require('dns')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app= express()

// Define path for express config
const pathforhtmlfile= path.join(__dirname, '../public')
const viewPath= path.join(__dirname, '../template/views')
const partialPath=path.join(__dirname, '../template/partials')

//setup handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(pathforhtmlfile))

app.get('', (req, res)=>{

    res.render('index',{
        title: 'Weather App',
        name: 'Nevin Jose'
    })
})

app.get('/about', (req, res)=>{

    res.render('about', {

        title:'About Me',
        name: 'Nevin Jose'
    })
})

app.get('/help', (req, res)=>{

    res.render('help', {

        helpText:'This is some Helpfull text',
        title:'Help Me',
        name: 'Nevin Jose'
    })
})
// Challenge
app.get('/weather', (req, res)=>{

    if(!req.query.address){

        return res.send('Please provide an address')
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{

        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{

            if(error){

                return res.send(error)
            }
            res.send({

                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })

})
//Testing
app.get('/products', (req, res)=>{

    if(!req.query.search){
       
        return res.send('please enter a search for searching')
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{

        res.render('404', {

            title:'404',
            name:'Nevin Jose',
            errorMess:'Help article not found'
        })

})

app.get('*', (req, res)=>{

    res.render('404',{

        title:'404',
        name:'Nevin Jose',
        errorMess:'Page not found'
    })

})

app.listen(3000, ()=>{

    console.log('Server port 3000 is up and running')
})