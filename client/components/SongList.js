import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router'
import query from '../queries/fetchSongs'
import gql from 'graphql-tag';


class SongList extends Component {
    onSongDelete(id) {
        this.props.mutate({ variables: { id } })
            .then(() => this.props.data.refetch());
    }
    renderSong() {
        return this.props.data.songs.map(({ id, title }) => {

            return (
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`}>
                        {title}</Link>
                    <div className="vote-box">
                        <i
                            className="material-icons"
                            onClick={() => this.onSongDelete(id)}
                        >delete</i>

                        <Link to={`/songs/edit/${id}`} >
                            <i
                                className="material-icons editclass"
                            >edit</i></Link>
                    </div>
                </li>
            );
        });
    }
    render() {
        if (this.props.data.loading) {
            return <div>Loading....</div>
        }
        return (
            <div>
                <ul className="collection">
                    {this.renderSong()}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large red right"><i className="material-icons">add</i></Link>

            </div>
        );
    }
}


const mutation = gql`
mutation DeleteSong($id:ID){
    deleteSong(id:$id){
      id
    }
  }
`


export default graphql(mutation)(
    graphql(query)(SongList)
);
