import React from 'react';
import axios from 'axios';
import { CardColumns, Card } from 'react-bootstrap';

export default class Home extends React.Component{
  constructor(){
    super()
    this.state ={
      pictures: []
    }
  }
  async componentDidMount(){
    const response = await axios.get('/api/');
    const allPictures = response.data;
    console.log(allPictures)
    this.setState({
      pictures: allPictures
    });
  }
  render(){
    console.log(this.state)
    return(
      <div>
        <CardColumns>
          <Card>
            <div>
              test
            </div>
          </Card>
        </CardColumns>
      </div>
    )
  }
}