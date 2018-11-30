import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { Link } from 'react-router'
import LyricCreate from '../components/LyricCreate'
import LyricList from '../components/LyricList'


class SongsDetails extends Component {
    render() {
        const { song } = this.props.data;
        if (!song) { return <div>Loading....</div> }
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id}></LyricCreate>
            </div>
        );
    }
}

export default graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongsDetails);    