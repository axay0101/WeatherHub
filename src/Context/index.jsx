import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios' // js library to make HTTP request
//Axios and Fetch are both HTTP request libraries for JavaScript. 
//Fetch is a native browser API, while Axios is a third-party library.<axios is upgraded version of fetch>

const StateContext = createContext() // help pass data through component tree without props(manually at every level) || REACT HOOK
                                     // "StateContext" is the name  we gave to our context

export const StateContextProvider = ({ children }) => {  
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Delhi')
    const [thisLocation, setLocation] = useState('')
    

    // fetch function
    const fetchWeather = async () => {
        const options = {  
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather',

            params: {                
                q: place,
                appid: import.meta.env.VITE_API_KEY,
                //appid: '4fbd4dca8b9e2a188a4c0c6971592a22'
                units: 'Metric',
            }
        }; 
        // just an js object
        // === "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=4fbd4dca8b9e2a188a4c0c6971592a22&units=Metric"

        const options2 = {  //for forecast data
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/forecast',

            params: {                
                q: place,
                appid: import.meta.env.VITE_API_KEY,
                units: 'Metric',
            }
        };

        try {
            const {data} = await axios.request(options);
            //console.log(data)
            setLocation(`${data.name} ,${data.sys.country}`) 
            setWeather({ 
                wspd:data.wind.speed,
                humidity: data.main.humidity,
                temp: data.main.temp,
                visibility: data.visibility,
                conditions: data.weather[0].main,
            })

            // getting forecast data
            const response = await axios.request(options2);
            const forecastData = response.data
            console.log(forecastData)
            setValues(forecastData.list)

        } 
        catch (e) {
            console.error(e);
            // if the api throws error.
            alert('This place does not exist')
        }
    }


    useEffect(() => {
        fetchWeather()
    }, [place])


    return (
        <StateContext.Provider value={{
            place,
            setPlace,
            values,
            thisLocation,
            weather
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)