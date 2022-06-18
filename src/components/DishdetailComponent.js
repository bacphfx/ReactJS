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
  if (dish != null) {
    return (
      <div>
        <Card>
          <CardBody>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const RenderComments = function (dish) {
  if (dish != null) {
    console.log(dish);
    const dishComment = dish.comments.map((x) => {
      return (
        <div key={x.id} className="mt-3">
          <div>{x.comment}</div>
          <div>
            -- {x.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(x.date)))}
          </div>
        </div>
      );
    });
    return (
      <div>
        <h4>Comment</h4>
        <div>{dishComment}</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {RenderDish(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {RenderComments(this.props.dish)}
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
