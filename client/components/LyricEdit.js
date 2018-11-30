import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router'
import fetchLyric from '../queries/fetchLyric'
import query from '../queries/fetchSongs'
import gql from 'graphql-tag';

class LyricEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            songId: ''
        }
    }
    componentWillReceiveProps(newProps) {
        const { lyric } = newProps.data;
        //console.log(lyric)
        this.setState({
            content: lyric.content
        })
    }
    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: { id: this.props.params.id, content: this.state.content },
            refetchQueries: [{ query: query }]
        }).then(() => hashHistory.push('/'))
    }
    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input className="button button2" value={this.state.content} onChange={event =>
                        this.setState({ content: event.target.value })}></input>
                </form>
            </div>
        );
    }
}



const mutation = gql`
mutation updateLyric($content:String,$id:ID){
    updateLyric(id:$id,content:$content){
      id,content
    }
  }
`
export default graphql(mutation)(graphql(fetchLyric, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(LyricEdit));