import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import logo from './logo.png';
import {
  Container,
  Row,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  PopoverHeader,
  PopoverBody,
  Popover,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Col
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this
      .toggle
      .bind(this);
    this.handleClick = this
      .handleClick
      .bind(this);
    this.handleClickLikeOn = this
      .handleClickLikeOn
      .bind(this);
    this.handleClickLikeOff = this
      .handleClickLikeOff
      .bind(this);
    this.state = {
      popoverOpen: false,
      viewOnlyLike: false,
      moviesCount: 0,
      moviesNameList: [],
      movies: [],
      moviesLiked: [],
      status : 'Vide'
    };
  }

  componentWillMount() {
    this.setState({status: 'Chargement des films en cours ...'});
  };
  componentDidMount() {
    fetch('http://localhost:3000/movies').then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      this.setState({ movies: data.movies});
    }).catch(err => {
      console.log(err);
    });

  };

  handleClickLikeOn() {
    console.log("Clique detecté");
    this.setState({viewOnlyLike: true});
  }

  handleClickLikeOff() {
    console.log("Clique detecté");
    this.setState({viewOnlyLike: false});
  }
  //
  handleClick(isLike, name) {
    var moviesNameListCopie = [...this.state.moviesNameList];
    if (isLike) {
      moviesNameListCopie.push(name);
      this.setState({
        moviesCount: this.state.moviesCount + 1,
        moviesNameList: moviesNameListCopie
      });
    } else {
      var index = moviesNameListCopie.indexOf(name)
      moviesNameListCopie.splice(index, 1);
      this.setState({
        moviesCount: this.state.moviesCount - 1,
        moviesNameList: moviesNameListCopie
      });
    }
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  render() {


    var moviesList = this.state.movies.map((movie, i) => {

        return <Movies
          key={i}
          movieId={movie.id}
          movieName={movie.title}
          movieDesc={movie.overview}
          movieImg={movie.poster_path}
          displayOnlyLike={this.state.viewOnlyLike}
          handleClickParent={this.handleClick}/>;
      });


    var moviesLast = this.state.moviesNameList.slice(-3);

    if (this.state.moviesCount === 0) {
      moviesLast = "aucun film sélectionné";
    } else if (this.state.moviesCount > 3) {
      moviesLast = moviesLast.join(', ') + '...';
    } else {
      moviesLast = moviesLast.join(' - ') + '.';
    }

    return (
      <div>
        <Container>
          <Navbar className="dark" dark expand="md">
            <NavbarBrand href="/"><img src={logo} alt="logo"/></NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem >
                <NavLink href="#" onClick={this.handleClickLikeOff}>
                  Last releases
                </NavLink>
              </NavItem>
              <NavItem >
                <NavLink href="#" onClick={this.handleClickLikeOn}>
                  My Movies
                </NavLink>
              </NavItem>
              <div>
                <Button id="Popover1" type="button" color="warning">
                  {this.state.moviesCount}
                  films
                </Button>
                <Popover
                  placement="bottom"
                  isOpen={this.state.popoverOpen}
                  target="Popover1"
                  toggle={this.toggle}>
                  <PopoverHeader>Derniers films ajoutés</PopoverHeader>
                  <PopoverBody>
                    {moviesLast}
                  </PopoverBody>
                </Popover>
              </div>
            </Nav>
          </Navbar>
          <Row>
            {moviesList}
          </Row>
        </Container>
      </div>
    );
  }
}

class Movies extends Component {
  constructor() {
    super();
    this.handleClick = this
      .handleClick
      .bind(this);
    this.state = {
      liked: false
    };
  }

  handleClick() {
    var isLike = !this.state.like;
    this.setState({like: isLike});
    if (isLike) {
      fetch('http://localhost:3000/mymovies', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `title=${this.props.movieName}&overview=${this.props.movieDesc}&poster_path=${this.props.movieImg}&idMovieDB=${this.props.movieId}`
      }).catch((err) => {
      });
    } else {
      fetch(`http://localhost:3000/mymovies/${this.props.movieId}`, {method: 'DELETE'}).catch((err) => {
        console.error(err);
      });
    };
    this.props.handleClickParent(isLike, this.props.movieName);
  }

  render() {
    var color;
    if (this.state.liked) {
      color = {
        color: "#fc6861",
        position: 'absolute',
        right: '7%',
        fontSize: '30px',
        top: '3%',
        cursor: 'pointer'
      };
    } else {
      color = {
        position: 'absolute',
        right: '7%',
        top: '3%',
        color: '#fff',
        fontSize: '30px',
        cursor: 'pointer'
      }
    }

    var isDisplay = {
      display: 'block'
    }

    if (!this.state.liked && this.props.displayOnlyLike) {
      isDisplay.display = 'none';
    }

    return (

      <Col xs="12" md="4" sm="6" lg="4" style={isDisplay}>
        <Card className="Card">
          <CardImg src={`https://image.tmdb.org/t/p/w500${this.props.movieImg}`} alt="Card image cap"/>
          <FontAwesomeIcon style={color} icon={faHeart} onClick={this.handleClick}/>
          <CardBody>
            <CardTitle className="title">{this.props.movieName.substr(0, 20) + ' ...'}</CardTitle>
            <CardText>{this.props.movieDesc.substr(0, 80) + ' ...'}</CardText>
          </CardBody>
        </Card>
      </Col>

    );
  }
}
export default App;
