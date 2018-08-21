const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const addVote = ( id ) => ( anecdote ) => {
  if (anecdote.id === id ) {
    return { ...anecdote, votes: anecdote.votes + 1 }
  }
  return anecdote
} 

const sortByVotes = (a,b) => {
  if (a.votes > b.votes) return -1
  if (a.votes < b.votes) return 1
  return 0
}
const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  let newState = state
  console.log('BEFORE: ', newState )
  switch (action.type) {
    case 'VOTE' : {
      newState = newState.map( addVote( action.id ) )
      break
    }
    case 'ADD' : {
      newState.push( asObject( action.content ) )
      break
    }
    default: {
      console.log('unknown action', action)
    }
  }
  newState = newState.sort( sortByVotes )
  console.log('AFTER: ', newState )
  return newState
}

export default reducer
