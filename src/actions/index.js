export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
    }

export function heroesFetching() {
    return {
        type: 'HEROES_FETCHING'
    }
}

export function heroesFetched(heroes) {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export function heroesFetchingError() {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching())
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
    }

export function filtersFetching() {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export function filtersFetched(filter) {
    return {
        type: 'FILTER_FETCHED',
        payload: filter
    }
}

export function filtersFetchingError() {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export function activeFilterChanged(filter) {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}

export function heroCreated(hero) {
    return {
        type: 'HERO_CREATED',
        payload: hero
    }
}

export function heroDeleted(id) {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}