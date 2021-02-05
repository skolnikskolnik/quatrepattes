import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import CardActionArea from '@material-ui/core/CardActionArea';
import FormHelperText from '@material-ui/core/FormHelperText';
import API from "../utils/API";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Julie Altman
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    visibility: true
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Album() {
  const classes = useStyles();
  const [bookSearch, setBookSearch] = useState("");
  //The seed is originally set to the values in the json, then updated based on feedback from the gbooks API
  const [seedValues, setSeedValues] = useState([]);
  const [open, setOpen] = React.useState(false);
  let newBookList = [];
  const [successMessage, setSuccessMessage] = useState("");


  const handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { value } = event.target;
    setBookSearch(value);

    //Clear input field after the search

  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    let { value } = event.target;
    setBookSearch(value);

    API.getBookBySearch(bookSearch)
      .then(res => {
        let bookList = res.data.items;


        //Shorten this to six items
        //Need to set the seed value to be items in the object
        for (let i = 0; i < 6; i++) {

          if (bookList[i]) {

            //If image link exists, set it equal to the item, otherwise make it an empty string
            let imageURL = "";
            if (bookList[i].volumeInfo.imageLinks) {
              imageURL = bookList[i].volumeInfo.imageLinks.thumbnail;
            }

            let bookTitle = "No title";
            if (bookList[i].volumeInfo.title) {
              bookTitle = bookList[i].volumeInfo.title;
            }

            let bookAuthors = "Author unknown";
            if (bookList[i].volumeInfo.authors) {
              bookAuthors = bookList[i].volumeInfo.authors;
            }

            let bookDesc = "No description available";
            if (bookList[i].volumeInfo.description) {
              bookDesc = bookList[i].volumeInfo.description;
            }

            let objectEntry = {
              "index": i,
              "title": bookTitle,
              "author": bookAuthors,
              "synopsis": bookDesc,
              "image": imageURL,
              "url": bookList[i].volumeInfo.infoLink
            }

            newBookList.push(objectEntry);
          }
        }
        setSeedValues(newBookList);
        setBookSearch("");
      })
  }

  const handleBookSave = id => {

    let authorString = "";
    //if author is an array make it a string
    let authorValue = seedValues[id].author;
    if ((typeof authorValue) == "string") {

    } else {
      //Need to turn this to a string
      for (let i = 0; i < authorValue.length; i++) {
        authorString += authorValue[i];
      }
    }

    API.saveBook({
      author: authorString,
      image: seedValues[id].image,
      title: seedValues[id].title,
      index: id,
      synopsis: seedValues[id].synopsis,
      url: seedValues[id].url
    })
      .then(() => {
        //Why does this only work for the titles from Google Books searches and not from the seed?
        setSuccessMessage(seedValues[id].title);
        setOpen(true);
        setSeedValues(seeds);
      })
      .catch(err => console.log(err))
  }


  const handleReroute = url => {
    window.location.href = url;
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to the Google Books Search!
            </Typography>
            <FormControl component="form"
              onSubmit={handleSearchSubmit}>
              <InputLabel htmlFor="my-input">Enter book here</InputLabel>
              <Input
                id="my-input"
                value={bookSearch}
                onChange={handleInputChange}
                aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">Enter book title, author, or isbn</FormHelperText>
            </FormControl>
          </Container>
        </div>
        <Box component="span" m={1}>
          {seedValues.map((seed) => (
            <Box key={seed.index} component="span" m={1}>
              <hr></hr>
              <Grid container spacing={3}>
                <Grid item xs={9}>
                  <h1>{seed.title}</h1>
                  <h2>{seed.author}</h2>
                </Grid>
                <Grid item xs={3}>
                  <Button onClick={() => handleBookSave(seed.index)} variant="contained" color="primary" className={classes.margin}>
                    Save book
                  </Button>
                  <Button onClick={() => handleReroute(seed.url)} variant="contained" color="primary" className={classes.margin}>
                    View book
                  </Button>
                  <div className={classes.root}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success">
                        Successfully saved {successMessage}!
                    </Alert>
                    </Snackbar>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={seed.title}
                        height="140"
                        image={seed.image}
                        title="Book cover"
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={9}>
                  <h4>{seed.synopsis}</h4>
                </Grid>
              </Grid>
              <br></br><br></br><br></br><br></br>
            </Box>
          ))}
        </Box>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

