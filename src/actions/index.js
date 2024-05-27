import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
    }

export const heroesFetching = createAction('HEROES_FETCHING')

export const heroesFetched = createAction('HEROES_FETCHED')

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

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

export const heroCreated = createAction('HERO_CREATED')

export const heroDeleted = createAction('HERO_DELETED')