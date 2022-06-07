import React, {useEffect, useState} from 'react';
import {API_WEATHER, API_KEY} from "../config";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import sunnyBack from '../images/sunny-background.jpg'
import rainyBack from '../images/rainy-background.jpg'
import snowyBack from '../images/snowy-background.jpg'
import cloudyBack from '../images/cloudy-background.jpg'
import foggyBack from '../images/foggy-background.jpg'
import weaherBack from '../images/weather-backound.jpg'
import './style.css'


const Main = () => {
    const [data, setData] = useState({})
    const [forecast, setForecast] = useState("")
    const [city, setCity] = useState('Бишкек')


    const getForecast = async (city) => {
        if (city) {
            const req = await fetch(API_WEATHER + '/forecast.json?key=' + API_KEY + '&lang=ru' + '&q=' + city)
            const res = await req.json()
            setData(res)
            setForecast(res?.current?.condition?.text)

        }
        document.getElementsByClassName("inputClear").value = "";
    }
    useEffect(() => {
        getForecast(city)

    }, [])
    console.log(forecast)
    const searchCity = (e) => {
        setCity(e.target.value)
    }

    return (
        <section id={"main"} style={{backgroundImage:`url(${forecast==="Солнечно"||forecast==="Ясно"?sunnyBack:forecast==="Местами дождь"||forecast==="Небольшой ливневый дождь"||forecast==="Умеренный или сильный ливневый дождь"||forecast==="Слабая морось"?rainyBack
                :forecast==="Облачно"||forecast==="Переменная облачность"||forecast==="Пасмурно"?cloudyBack:forecast==="Дымка"?foggyBack:forecast==="Местами снег"?snowyBack:weaherBack})`}}>
            <div style={{width: "400px"}} className={"form"}>
                <TextField className={"inputClear"} id="standard-basic" label="Введите город" variant="standard" onChange={searchCity}/>

                <Button variant="outlined" onClick={() => getForecast(city)}>Искать</Button>
            </div>

            {data ? <Card sx={{width: 400}}>

                <Typography gutterBottom variant="h3" component="div">
                    {data?.location?.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {data?.current?.condition?.text}
                </Typography>

                <div className={"weather__wrap"}>
                    <Typography variant="body2" color="text.secondary">
                        {data?.current?.temp_c==undefined?"error":`${data?.current?.temp_c}° C`}
                    </Typography>
                    <CardMedia
                        component="img"
                        image={data?.current?.condition?.icon}
                        alt="img"
                    />
                </div>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {data?.current?.feelslike_c==undefined?"error":`Ощущается как ${data?.current?.feelslike_c}° C`}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {data?.forecast?.forecastday[0]?.day?.maxtemp_c==undefined?"error":`Максимальная температура ${data?.forecast?.forecastday[0].day.maxtemp_c}° C`}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {data?.forecast?.forecastday[0]?.day?.mintemp_c==undefined?"error":`Минимальная температура ${data?.forecast?.forecastday[0].day.mintemp_c}° C`}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {`Вероятность осадков ${data?.forecast?.forecastday[0].day.daily_chance_of_rain}%`}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {`Осадок ${data?.current?.precip_mm} мм`}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {`Давление ${data?.current?.pressure_mb} миллибар`}
                    </Typography>

                    <div className={"forecast"}>
                        <div className={"forecast__box"}>
                            <h6>Вероятность осадков </h6>
                            <p>Время</p>
                            <div className={"hour-forecast__wrap"}>
                                <p>Прогноз</p>
                            </div>
                            <p>Температура</p>
                            <p>Ощущается как</p>
                        </div>
                        {data?.forecast?.forecastday[0]?.hour?.map((el, index) => {
                            return (
                                <div className={"forecast__box"} key={index}>
                                    <h6>{`${el.chance_of_rain}%`}</h6>
                                    <p>{el.time.slice(10)}</p>
                                    <div className="hour-forecast__wrap">
                                        <img src={el.condition.icon} alt=""/>
                                        <p>{el.condition.text}</p>
                                    </div>
                                    <p>{`${el.temp_c}° C`}</p>
                                    <p>{`${el.feelslike_c}° C`}</p>
                                </div>
                            )
                        })}
                    </div>

                    <Typography variant="body2" color="text.secondary" className={'updated'}>
                        {`Последнее обновление ${data?.current?.last_updated}`}
                    </Typography>


                </CardContent>

            </Card> : <div>Loading...</div>}
        </section>
    );
};

export default Main;