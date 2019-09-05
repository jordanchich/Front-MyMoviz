import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './App.css';

class Movies extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {liked: false };
  }

  handleClick() {
  console.log("click détécté");
  
  this.setState({
      liked : !this.state.liked
    });
  }

  render() {
    var color ;
    if (this.state.liked) {
      color = {
        color: "#fc6861", position: 'absolute',
        right: '7%',
        fontSize: '30px',
        top: '3%', cursor: 'pointer', };
    } else {
    color = {
      position: 'absolute',
      right: '7%',
      top: '3%',
      color: '#fff',
      fontSize: '30px',
      cursor: 'pointer',
      }
    }

    return (

      <Col xs="12" md="4" sm="6" lg="4">
        <Card className="Card">
          <CardImg src={`..${this.props.movieImg}`} alt="Card image cap"/>
          <FontAwesomeIcon style={color} icon={faHeart} onClick={this.handleClick}/>
          <CardBody>
            <CardTitle className="title">{this.props.movieName}</CardTitle>
            <CardText>{this.props.movieDesc}</CardText>
          </CardBody>
        </Card>
      </Col>

    );
  }
}

export default Movies;
