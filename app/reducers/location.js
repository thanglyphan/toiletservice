const defaultState = {
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  }
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOCATION':
      return {
        ...state,
        region: action.region
      }
    default:
      return state
  }
}
