import gql from 'graphql-tag';
export default gql`
query LyricDetail($id:ID!){
  lyric(id:$id){
   id,content
  }
}
`
