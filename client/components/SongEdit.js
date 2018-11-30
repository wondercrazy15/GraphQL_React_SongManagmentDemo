import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router'
import fetchSong from '../queries/fetchSong'
import query from '../queries/fetchSongs'
import gql from 'graphql-tag';
import Notifications, { notify } from 'react-notify-toast';


class SongEdit extends Component {
    constructor(props) {
        super(props)
        // console.log(props)
        // const { song } = props.data;
        // console.log(props)
        this.state = { title: '' };
        this.onSubmit = this.onSubmit.bind(this);

        //console.log(props)
        //console.log(props)
    }
    // componentWillMount() {
    //     console.log(this.props)
    // }
    onSubmit() {

        if (this.state.title.length <= 50) {
            if (this.state.title != "") {
                this.props.mutate({
                    variables: { id: this.props.params.id, title: this.state.title },
                    refetchQueries: [{ query: query }]
                }).then(() => hashHistory.push('/'))
            }

        } else {
            let myColor = { background: '#ea1d07', text: "#FFFFFF" };
            notify.show("Please enter 50 character in song title.", "custom", 5000, myColor);
        }


    }
    componentWillReceiveProps(newProps) {
        const { song } = newProps.data;
        //console.log(song)
        this.setState({
            title: song.title
        })
    }
    onStateUpdate(data) {
        console.log(data)
        this.setState({
            title: data.title
        })
    }
    render() {

        const { song } = this.props.data;
        if (!song) { return <div>Loading....</div> }

        // { this.onStateUpdate(song) }
        return (

            <div>
                <Notifications />

                <Link to="/">Back</Link>
                {/* <h3>{song.title}</h3> */}
                <form >
                    <label>Song Title</label>
                    <input value={this.state.title} onChange={event => this.setState({ title: event.target.value })}></input>
                    <button className="button button2" onClick={this.onSubmit}>Update</button>

                </form>
            </div>
        );
    }
}

const mutation = gql`
mutation updateSong($title:String,$id:ID){
    updateSong(title:$title,id:$id){
      id,title
    }
  }
`


export default graphql(mutation)(graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongEdit));    