import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  handleChange = (event) => {
    this.setState( { content: event.target.value } )
  }

  render() {
    const anecdotes = this.props.store.getState()
    console.log('render',anecdotes)
    
    const vote = ( id ) => (event) => {
      event.preventDefault();
      this.props.store.dispatch( { type: 'VOTE', id: id } )
    }
    
    const add = () => (event) => {
      event.preventDefault();
      this.props.store.dispatch( { type: 'ADD', content: this.state.content } )
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={ vote( anecdote.id ) } >vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input onChange={this.handleChange} /></div>
          <button onClick={ add() } >create</button> 
        </form>
      </div>
    )
  }
}

export default App