import { useState, useEffect } from 'react'
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import './App.css';
function Main({ getMovie }: { getMovie: Function }) {
    const emptyMovie = {
        Poster: '',
        Title: '',
        Type: '',
        Year: '',
        imdbID: ''
    }
    const [title, setTitle] = useState("");
    const [year, setYear] = useState('');
    const [type, setType] = useState("");
    const [movieNumber, setMovieNumber] = useState(0);
    const [page, setPage] = useState(0)
    const [movies, setMovie] = useState([emptyMovie])
    const onChangeType = async function (event: any) {
        setType(event.target.value)
    }
    const onPress = function () {
        if (page === 0)
            search()
        else
            setPage(0)
    }

    useEffect(() => {
        setMovie([emptyMovie])
        search()
    }, [page]);

    const search = async function () {
        const textYear = year === '' ? '' : `&year=${year}`
        const textType = type === '' ? '' : `&type=${type}`
        const movies = await axios.get(`http://localhost:3001/movie/search?title=${title}${textYear}${textType}&page=${page + 1}`)

        setMovie(movies.data.Search)
        setMovieNumber(movies.data.totalResults)
    }


    const handleClick = async function (event: any, imdbID: string) {
        getMovie(imdbID)
    }

    const handleChangePage = function (event: any, page: number) {
        setPage(page)
    }
    return (
        <View>

            <View style={styles.content} >

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                    placeholder="film"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setYear(text)}
                    value={year}
                    placeholder="année"
                />

                <select value={type} onChange={onChangeType} >
                    <option value="movie">Film</option>
                    <option value="series">Série</option>
                    <option value="coconut">Episode</option>
                </select>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <Text>Valider</Text>
                </TouchableOpacity>
            </View >

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell>title</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Année</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.map((row) => (
                            <TableRow
                                key={row.Title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={(event) => handleClick(event, row.imdbID)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.Title}
                                </TableCell>
                                <TableCell align="right">{row.Type}</TableCell>
                                <TableCell align="right">{row.Year}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={movieNumber}
                rowsPerPage={10}
                page={page}
                onPageChange={handleChangePage}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    button: {
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    content: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        flexDirection: "row"
    },
});

export default Main;
