const express = require('express');
const app = express();
const port = 1017;
const path = require('path');
const { v4: uuid } = require('uuid');
uuid();
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const songs = [
	{ id: uuid(), artist: 'Leon Noir', song: 'Figure it out' },
	{ id: uuid(), artist: 'Leon Noir', song: 'Like That' },
	{ id: uuid(), artist: 'Leon Noir', song: 'Vibe Out' },
];

app.get('/', (req, res) => {
	res.send('the root works');
});

//Index ---
app.get('/songs', (req, res) => {
	res.render('songs/index', { songs });
});

//Create(Get) --- New ( Read)
app.get('/songs/new', (req, res) => {
	res.render('songs/new');
});
//Create(Post) --- Create
app.post('/songs', (req, res) => {
	const { artist, song } = req.body;
	songs.push({ artist, song, id: uuid() });
	res.redirect('/songs');
});

//Show ---
app.get('/songs/:id', (req, res) => {
	const { id } = req.params;
	const song = songs.find((song) => song.id === id);
	res.render('songs/show', { song });
});

// Edit --- Update
app.get('/songs/:id/edit', (req, res) => {
	const { id } = req.params;
	const song = songs.find((song) => song.id === id);
	res.render('songs/edit', { song });
});

// Edit ---
app.patch('/songs/:id', (req, res) => {
	const { id } = req.params;
	const newSongText = req.body.song;
	const foundSong = songs.find((song) => song.id === id);
	foundSong.song = newSongText;
	res.redirect('/songs');
});

app.listen(port, () => {
	console.log('Listening on 1017, Bow!');
});