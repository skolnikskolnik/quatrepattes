import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
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



export default function Album() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  //Loads up the saved book at the start of the page
  const loadBooks = () => {
    API.getBooks()
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => console.log(err))
  }

  //When delete button is pressed, the book is deleted from the db
  const deleteBook = id => {

    displaySuccess(id);

    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err))

    setOpen(true);
  }

  const displaySuccess = (id) => {
    console.log(id);

    for(let i=0; i< books.length; i++){
      if(books[i]._id == id){
        setSuccessMessage(books[i].title);
      }
    }

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
            <h1>Look at your saved books</h1>
          </Container>
        </div>
        <Box component="span" m={1}>
          {books.map((book) => (
            <Box key={book._id} component="span" m={1}>
              <hr></hr>
              <div className={classes.root}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success">
                    Successfully deleted {successMessage}!
                  </Alert>
                </Snackbar>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={9}>
                  <h1>{book.title}</h1>
                  <h2>{book.author}</h2>
                </Grid>
                <Grid item xs={3}>
                  <Button onClick={() => deleteBook(book._id)} variant="contained" color="secondary" className={classes.margin}>
                    Delete book
                  </Button>
                  <Button onClick={() => handleReroute(book.url)} variant="contained" color="primary" className={classes.margin}>
                    View book
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={book.title}
                        height="140"
                        image={book.image}
                        title="Book cover"
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={9}>
                  <h4>{book.synopsis}</h4>
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

