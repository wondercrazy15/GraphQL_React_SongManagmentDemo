import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'
import Notifications, { notify } from 'react-notify-toast';
//import toastr from 'reactjs-toastr';
//import '../../node_modules/reactjs-toastr/lib/toast.css';
//var $ = require('jquery')



class SongCreate extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '' }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit() {
        console.log(this.state.title.length)
        if (this.state.title.length <= 50) {
            if (this.state.title != "") {
                this.props.mutate({
                    variables: { title: this.state.title },
                    refetchQueries: [{ query: query }]
                }).then(() => hashHistory.push('/'))
            }

        } else {
            let myColor = { background: '#ea1d07', text: "#FFFFFF" };
            notify.show("Please enter 50 in song title.", "custom", 5000, myColor);
        }

        //notify.success('Toasty!');

    }
    render() {
        return (
            <div className="main">
                <Notifications />

                <Link to="/">Back</Link>
                <h3>Add a New Song</h3>

                <form >
                    <label>Song Title</label>
                    <input required onChange={event => this.setState({ title: event.target.value })}></input>
                    <button className="button button2" onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}


const mutation = gql`
mutation AddSong($title:String){
    addSong(title:$title){
      title
    }
  }
`
export default graphql(mutation)(SongCreate);