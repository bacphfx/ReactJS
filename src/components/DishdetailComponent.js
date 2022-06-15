import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardImgOverlay,
  CardText,
  CardBody,
} from "reactstrap";

const RenderDish = function (dish) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardBody>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardImgOverlay>
        </CardBody>
      </Card>
    </div>
  );
};

const RenderComments = function (dish) {
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comment</h4>
    </div>
  );
};

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <RenderDish dish={this.props.dishes} />
          <RenderComments />
        </div>
      </div>
    );
  }
}

export default DishDetail;
