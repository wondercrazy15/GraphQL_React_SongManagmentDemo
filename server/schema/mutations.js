const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const SongType = require('./song_type');
const LyricType = require('./lyric_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Song({ title })).save()
      }
    },
    updateSong: {
      type: SongType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString }

      },
      resolve(parentValue, { id, title }) {
        Song.findByIdAndUpdate(id, { $set: { "title": title } }, { upsert: false }, function (err, effected, raw) { debugger; });
      }
    },
    updateLyric: {
      type: LyricType,
      args: {
        id: { type: GraphQLID },
        content: { type: GraphQLString }

      },
      resolve(parentValue, { id, content }) {
        Lyric.findByIdAndUpdate(id, { $set: { "content": content } }, { upsert: false }, function (err, effected, raw) { debugger; });
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve(parentValue, { content, songId }) {
        return Song.addLyric(songId, content);
      }
    },

    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Lyric.like(id);
      }
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Song.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
