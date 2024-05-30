import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid'
import store from "../../store";

import { selectAll } from "../heroesFilters/filterSlice";
import { useCreateHeroMutation } from "../../api/apiSlice";

function HeroesAddForm() {
    const [heroName, setHeroName] = useState('')
    const [heroDesc, setHeroDesc] = useState('')
    const [heroElement, setHeroElement] = useState('')

    const [createHero] = useCreateHeroMutation()

    const { filtersLoadingStatus } = useSelector(state => state.filters)
    const filters = selectAll(store.getState())

    function omSubmitHandler(e) {
        e.preventDefault()

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDesc,
            element: heroElement
        }

        createHero(newHero).unwrap()

        setHeroName('')
        setHeroDesc('')
        setHeroElement('')
    }

    function renderFilters(filters, status) {
        if (status === 'loading') {
            return <option>загрузка элементов</option>
        } else if (status === 'error') {
            return <option>ошибка загрузки</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => {

                // eslint-disable-next-line array-callback-return
                if (name === 'all') return

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={omSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDesc}
                    onChange={(e) => setHeroDesc(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                >
                    <option value=''>Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;