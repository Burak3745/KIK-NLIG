import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard1'
import { Button, Col, Row } from 'react-bootstrap'
import { getMovieAction } from '../action/movieAction'
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { useLocation } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import '../css/Films.css'
import { Dropdown, Input, FormField, Form, Checkbox } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const Filtered = ({ catagoryData, setCatagoryData, nameData, setNameData, timeData, setTimeData, countryData, setCountryData, minscoreData,
    setMinscoreData, maxscoreData, setMaxscoreData, setTimer, directorData, setDirectorData, minyearData, setMinyearData,
    maxyearData, setMaxyearData, typeData, setTypeData }) => {
    const navigate = useNavigate();
    const handleDropdownCatagoryChange = (event, data) => {
        if (catagoryData == null) {
            setCatagoryData('')
        }
        else {
            const selectedValues = data.value;
            setCatagoryData(selectedValues);
        }
    };

    const handleInputNameChange = (e) => {
        if (nameData == null) {
            setNameData('')
        }
        else {
            setNameData(e.target.value);
        }
    };

    const handleInputDirectorChange = (e) => {
        if (directorData == null) {
            setDirectorData('')
        }
        else {
            setDirectorData(e.target.value);
        }
    };

    const handleDropdownCountryChange = (event, data) => {
        if (countryData == null) {
            setCountryData('')
        }
        else {
            const selectedValues = data.value;
            setCountryData(selectedValues);
        }

    };

    const handleDropdownTimeChange = (event, data) => {
        if (timeData == null) {
            setTimeData('')
        }
        else {
            const selectedValues = data.value;
            setTimeData(selectedValues);
        }

    };

    const handleInputMinScoreChange = (e) => {
        const inputValue = parseInt(e.target.value);
        if (minscoreData == null) {
            setMinscoreData('')
        }
        else {
            if (inputValue >= 0 && inputValue <= 10) {
                if (maxscoreData != '' && maxscoreData != null) {
                    if (inputValue <= maxscoreData) {
                        setMinscoreData(e.target.value)
                    }
                    else {
                        setMinscoreData(maxscoreData)
                    }
                }
                else {
                    setMinscoreData(e.target.value)
                }

            }
            else {

            }


        }
    };

    const handleInputMaxScoreChange = (e) => {
        const inputValue = parseInt(e.target.value);
        if (maxscoreData == null) {
            setMaxscoreData('')
        }
        else {
            if (inputValue >= 0 && inputValue <= 10) {
                if (minscoreData != '' && minscoreData != null) {
                    if (inputValue >= minscoreData) {
                        setMaxscoreData(e.target.value)
                    }
                    else {
                        setMaxscoreData(minscoreData)
                    }
                }
                else {
                    setMaxscoreData(e.target.value)
                }
            }
            else {

            }
        }
    };

    const handleInputMinYearChange = (e) => {
        const inputValue = parseInt(e.target.value);
        if (minyearData == null) {
            setMinyearData('')
        }
        else {
            if (inputValue >= 1900 && inputValue <= 2050) {
                if (maxyearData != '' && maxyearData != null) {
                    if (inputValue <= maxyearData) {
                        setMinyearData(e.target.value)
                    }
                    else {
                        setMinyearData(maxyearData)
                    }
                }
                else {
                    setMinyearData(e.target.value)
                }


            }
            else {
                setMinyearData(2000)
            }


        }
    };

    const handleInputMaxYearChange = (e) => {
        const inputValue = parseInt(e.target.value);
        if (maxyearData == null) {
            setMaxyearData('')
        }
        else {
            if (inputValue >= 1900 && inputValue <= 2050) {
                if (minyearData != '' && minyearData != null) {
                    if (inputValue >= minyearData) {
                        setMaxyearData(e.target.value)
                    }
                    else {
                        setMaxyearData(minyearData)
                    }
                }
                else {
                    setMaxyearData(e.target.value)
                }


            }
            else {
                if (minyearData != '' && minyearData != null) {
                    if (inputValue >= minyearData) {
                        setMaxyearData(2000)
                    }
                    else {
                        setMaxyearData(minyearData)
                    }
                }
                else {
                    setMaxyearData(2000)
                }

            }
        }
    };

    const handleChange = (catagory, name, country, time, minscore, maxscore, director, minyear, maxyear, type) => {
        const params1 = new URLSearchParams(window.location.search);
        if (name == null) {
            params1.set("name", '');
        }
        else {
            params1.set("name", name);
        }

        if (catagory == null) {
            params1.set("catagory", '');
        }
        else {
            params1.set("catagory", catagory);
        }

        if (country == null) {
            params1.set("country", '');
        }
        else {
            params1.set("country", country);
        }

        if (time == null) {
            params1.set("time", '');
        }
        else {
            params1.set("time", time);
        }

        if (minscore == null) {
            params1.set("minscore", '');
        }
        else {
            params1.set("minscore", minscore);
        }

        if (maxscore == null) {
            params1.set("maxscore", '');
        }
        else {
            params1.set("maxscore", maxscore);
        }

        if (director == null) {
            params1.set("director", '');
        }
        else {
            params1.set("director", director);
        }

        if (minyear == null) {
            params1.set("minyear", '');
        }
        else {
            params1.set("minyear", minyear);
        }

        if (maxyear == null) {
            params1.set("maxyear", '');
        }
        else {
            params1.set("maxyear", maxyear);
        }

        if (type == null) {
            params1.set("type", '');
        }
        else {
            params1.set("type", type);
        }

        setTimer(300)
        navigate(`/search?${params1.toString()}`);
    };

    const handleDelete = (setCatagoryData, setNameData, setCountryData, setTimeData, setMinscoreData, setMaxscoreData, setDirectorData,
        setMinyearData, setMaxyearData, setTypeData) => {
        setCatagoryData('')
        setNameData('')
        setCountryData('')
        setTimeData('')
        setMinscoreData('')
        setMaxscoreData('')
        setDirectorData('')
        setMinyearData('')
        setMaxyearData('')
        setTypeData('')
    }

    const catagoryOptions = [
        { value: 'Action & Advanture', text: 'Action & Advanture' },
        { value: 'Animation', text: 'Animation' },
        { value: 'Comedy', text: 'Comedy' },
        { value: 'Crime', text: 'Crime' },
        { value: 'Documentary', text: 'Documentary' },
        { value: 'Drama', text: 'Drama' },
        { value: 'Family', text: 'Family' },
        { value: 'Kids', text: 'Kids' },
        { value: 'Mystery', text: 'Mystery' },
        { value: 'News', text: 'News' },
        { value: 'Reality', text: 'Reality' },
        { value: 'Sci-Fi & Fantasy', text: 'Sci-Fi & Fantasy' },
        { value: 'Soap', text: 'Soap' },
        { value: "Talk", text: "Talk" },
        { value: "War & Politics", text: "War & Politics" },
        { value: 'Western', text: 'Western' },
    ]
    const countryOptions = [
        { key: 'gb', value: 'İngiltere', flag: 'gb', text: 'İngiltere' },
        { key: 'us', value: 'ABD', flag: 'us', text: 'Amerika' },
        { key: 'tr', value: 'Türkiye', flag: 'tr', text: 'Türkiye' },
    ]

    const timeOptions = [
        { key: 0, text: '30 Dakikadan Az', value: 0 },
        { key: 1, text: '30 Dakika - 1 Saat', value: 1 },
        { key: 2, text: '1 Saat - 1.5 Saat', value: 2 },
        { key: 3, text: '1.5 Saat - 2 Saat', value: 3 },
        { key: 4, text: '2 Saat - 2.5 Saat', value: 4 },
        { key: 5, text: '2.5 Saat - 3 Saat', value: 5 },
        { key: 6, text: '3 Saatten Fazla', value: 6 },
    ]
    return (
        <div><div style={{ background: "rgb(6, 0, 29)", borderRadius: "10px", width: "95%", minHeight: "600px", padding: "15px", color: "white" }}>
            <h4>
                Tür Seç
            </h4>
            <Form style={{ display: 'flex', justifyContent: 'center' }}>
                <Checkbox
                    radio
                    name='checkboxRadioGroup'
                    value=''
                    checked={typeData === '' || typeData === null}
                    onChange={(e, data) => setTypeData(data.value)}
                />
                <span style={{ color: "white", marginLeft: "10px" }}>Tümü</span>
                <Checkbox
                    radio
                    name='checkboxRadioGroup'
                    value='Film'
                    checked={typeData === 'Film'}
                    onChange={(e, data) => setTypeData(data.value)}
                    style={{ marginLeft: "40px" }}
                />
                <span style={{ color: "white", marginLeft: "10px", marginRight: "40px" }}>Film</span>

                <Checkbox
                    radio
                    name='checkboxRadioGroup'
                    value='Dizi'
                    checked={typeData === 'Dizi'}
                    onChange={(e, data) => setTypeData(data.value)}
                />
                <span style={{ color: "white", marginLeft: "10px" }}>Dizi</span>
            </Form>
            <h4>
                Dizi Adı
            </h4>
            <Input fluid onChange={handleInputNameChange} value={nameData} color="teal" icon='search' placeholder='Ara...' />
            <h4>
                Yönetmen Adı
            </h4>
            <Input fluid onChange={handleInputDirectorChange} value={directorData} color="teal" icon='search' placeholder='Ara...' />
            <h4>
                Kategoriler
            </h4>
            <Dropdown

                placeholder='Kategori Seç'
                fluid
                multiple
                selection
                options={catagoryOptions}
                value={catagoryData}
                onChange={handleDropdownCatagoryChange}
            />
            <h4>
                Ülkeler
            </h4>
            <Dropdown
                clearable
                fluid
                multiple
                search
                selection
                options={countryOptions}
                value={countryData}
                onChange={handleDropdownCountryChange}
                placeholder='Ülke Seç'
            />
            <h4>
                Süre
            </h4>
            <Dropdown fluid placeholder='Süre Seç' value={timeData} onChange={handleDropdownTimeChange} clearable options={timeOptions} selection />
            <h4>
                Yapım Yılı
            </h4>
            <Input type='number' placeholder='Min' value={minyearData} style={{ marginRight: "25px" }} onChange={handleInputMinYearChange} />
            <Input type='number' placeholder='Max' value={maxyearData} onChange={handleInputMaxYearChange} />
            <h4>
                IMDB
            </h4>
            <Input type='number' placeholder='Min' value={minscoreData} style={{ marginRight: "25px" }} onChange={handleInputMinScoreChange} />
            <Input type='number' placeholder='Max' value={maxscoreData} onChange={handleInputMaxScoreChange} />
            <br /><br />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button class="clear-button" onClick={() => handleDelete(setCatagoryData, setNameData, setCountryData,
                    setTimeData, setMinscoreData, setMaxscoreData, setDirectorData, setMinyearData, setMaxyearData, setTypeData)}>
                    <span class="clear-text">Temizle</span><span class="clear-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 
                3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                            </path></svg></span>
                </button>
                <button class="clear-button2" onClick={() => handleChange(catagoryData, nameData, countryData,
                    timeData, minscoreData, maxscoreData, directorData, minyearData, maxyearData, typeData)}>
                    <span class="clear-text2">Filtrele</span><span class="clear-icon2">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z" />
                        </svg>
                    </span>
                </button>


            </div>
        </div></div>
    )
}

export default Filtered