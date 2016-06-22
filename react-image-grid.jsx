import React from 'react';
import ReactDOM from 'react-dom';

export default class ImageGrid extends React.Component {

  constructor() {
    super();
    this.state = { containerWidth: 0 };
  }

  componentDidMount() {
    this.setState({
      containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth)
    });
  }

  componentDidUpdate() {
    if (ReactDOM.findDOMNode(this).clientWidth !== this.state.containerWidth) {
      this.setState({
        containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth)
      });
    }
  }

  componentWillUnmount() {

  }

  render() {

    var limit = 1;
    if (this.state.containerWidth >= 480) {
      limit = 2;
    } else if (this.state.containerWidth >= 1024) {
      limit = 3;
    }

    var containerWidth = this.state.containerWidth - (limit * 4);
    var maxHeight = containerWidth;

    var images = [];
    for (var i = 0; i < this.props.photos.length; i += limit) {
      for (var j = i; j < i + limit; j++) {
        if (j == this.props.photos.length) { break; }
        var src = this.props.photos[j].src;
        var width = this.props.photos[j].width;
        var height = this.props.photos[j].height;
        images.push(
          <div key={j} style={imageStyle}>
            <img src={src} style={{display:'block', border:0}} height={maxHeight/5} width={''} alt="" />
          </div>
        );
      }
    }

    return (
      this.renderImageGrid(images)
    );

  }

  renderImageGrid(images) {
    return (
      <div id="image-grid">
        {images}
      </div>
    );
  }

};

ImageGrid.displayName = 'ImageGrid';
ImageGrid.defaultProps = {}
ImageGrid.propTypes = {
  photos: function(props, propName, componentName) {
    shape = {
      src: React.PropTypes.string.isRequired,
      width: React.PropTypes.number.isRequired
    }
    properties = React.PropTypes.shape(shape)
    return React.PropTypes.arrayOf(properties).isRequired.apply(this,arguments);
  }
};

const imageStyle = {
  float: 'left',
  display: 'block',
  backgroundColor: '#ffffff',
  margin: '24px 0px 12px 24px',
  padding: 12,
  border: '2px solid #ddd',
  'border-radius': 8,
  'box-shadow': '4px 2px 16px 0px rgba(155,155,155,0.50)'
}
