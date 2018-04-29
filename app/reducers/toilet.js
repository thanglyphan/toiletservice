const defaultState = {
  toilet: {}
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'TOILET':
      return {
        ...state,
        toilet: action.toilet
      }
    default:
      return state
  }
}
