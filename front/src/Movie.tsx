import { useState, useEffect } from 'react'
import axios from 'axios'
import { StyleSheet, TextInput, Text, TouchableOpacity, View, Image } from 'react-native';

function Movie({ imdbID, back }: { imdbID: string, back: Function }) {
    const [movie, setMovie] = useState({
        Title: '',
        Poster: '',
        Plot: '',
        Genre: '',
        imdbRating: '',
        imdbVotes: ''
    })
    const [poster, setPoster] = useState()
    const onPress = async function(){
        back()
    }
    useEffect(() => {
        const load = async function () {
            const movie = await axios.get(`http://localhost:3001/movie/${imdbID}`)
            setMovie(movie.data)
        }
        load()
    }, []);
    return (
        <View >
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <Text>Retour</Text>
            </TouchableOpacity>
            <View style={styles.content} >
                <Text>Titre: {movie.Title}</Text>
                <br />
                <Image
                    style={{ width: '250px', height: '400px' }}
                    source={{ uri: movie.Poster }} />
                <br />
                <Text style={styles.text} >Résumer : {movie.Plot}</Text>
                <br />
                <Text > Genres : {movie.Genre}</Text>
                <br />
                <Text>Note IMDB : {movie.imdbRating}</Text>
                <br />
                <Text>Nombre de votant : {movie.imdbVotes}</Text>
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        maxWidth: 600
    },
    content: {

        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    button: {
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});

export default Movie;