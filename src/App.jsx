import { useState } from 'react'
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from './Context'
import { BackgroundLayout, WeatherCard, MiniCard } from './Components'

function App() {

  const [input, setInput] = useState('')
  const { weather, thisLocation, values, place, setPlace } = useStateContext()
  console.log(weather)

  const submitCity = () =>{
    setPlace(input)
    setInput('')
  }

  return (
  <div className='w-full h-screen text-white px-8'>
    <nav className="w-full  text-black p-3 flex justify-between items-center ">
      <h1 className= 'font-bold tracking-wide text-3xl'> Weather Hub </h1>

        <div className='bg-blue-50 w-[25rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]'/>
          
          <input onKeyUp={(e) => {
            if (e.key === 'Enter') {
              // sumit the form
              submitCity()
            }
          }} 
          type="text" placeholder='Search city' className='focus:outline-none w-full text-[#212121] text-lg' value={input} onChange={e => setInput(e.target.value)} />
          
        </div>

    </nav>

    <BackgroundLayout></BackgroundLayout>
    <main className='w-full flex flex-wrap gap-8 py-24 px-[10%] items-center justify-center'>
          
    <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          visibility={weather.visibility}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

      <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {
            values?.slice(1).filter((_, index) => index % 8 === 0).map(curr => {
              return (
                <MiniCard
                  key={curr.dt_txt}
                  time={curr.dt_txt}
                  temp={curr.main.temp}
                  iconString={curr.weather[0].main}
                />
              )
            })
          }
      </div>

    </main>

  </div>

  )
}

export default App
