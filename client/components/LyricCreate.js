import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class LyricCreate extends Component {
    constructor(props) {
        super(props)
        this.state = { content: '' }
        this.onSubmit = this.onSubmit.bind(this);

    }
    onSubmit() {

        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        })
        this.setState({
            content: ''
        })
    }
    render() {
        return (
            <div>
                <form >
                    <label>Add a lyrics</label>
                    <input
                        value={this.state.content}
                        onChange={event => this.setState({ content: event.target.value })}
                    ></input>
                    <button className="button button2" onClick={this.onSubmit}>Submit Lyric</button>

                </form>
            </div>
        );
    }
}

const mutation = gql`
mutation AddLyricToSong($content:String,$songId:ID){
    addLyricToSong(content:$content,songId:$songId){
      id
      lyrics{
          id
        content,
        likes
      }
    }
  }
`

export default graphql(mutation)(LyricCreate);