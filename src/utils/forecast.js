const request= require('request')

const forecast= (latitude, longitude, callback)=>{

    const url='http://api.weatherstack.com/current?access_key=ef73170ad94bd361429567ca1e44e790&query='+ latitude +','+ longitude +'&units=f'

    request({url, json: true}, (error, {body})=>{

        if(error){

            callback('Unable to connect to Internet', undefined)
        }else if(body.error) {

            callback('Unable to find Location. Please enter valid lattitude and longitude', undefined)

        }else{

            callback(undefined,body.current.weather_descriptions+ '.It is Currently '+body.current.temperature +' degree out. There is a '+ body.current.feelslike +' Chance of rain' )
        }
    })
}

module.exports=forecast