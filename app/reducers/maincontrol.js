const defaultState = {
  isMain: false
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'MAINCONTROL':
      return {
        ...state,
        isMain: action.isMain
      }
    default:
      return state
  }
}
