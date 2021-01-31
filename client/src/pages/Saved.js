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
}));



export default function Album() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);


  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = () => {
    API.getBooks()
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => console.log(err))
  }

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
              <Grid container spacing={3}>
                <Grid item xs={9}>
                  <h1>{book.title}</h1>
                  <h2>{book.author}</h2>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="secondary">
                    Delete book
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

