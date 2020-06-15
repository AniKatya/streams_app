import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount = () => {
    this.props.fetchStreams();
  };
  renderList = () => {
    return (
      <div>
        <h2>Streams</h2>

        <div className="ui celled list">
          {this.props.streams.map((stream) => {
            return (
              <div className="item" key={stream.id}>
                <i className="large middle aligned icon camera"></i>
                <div className="content">
                  {stream.title}
                  <div className="description"> {stream.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return this.props.streams.length > 0 ? this.renderList() : null;
  }
}

const mapToStateProps = (state) => {
  return { streams: state.streams };
};
export default connect(mapToStateProps, { fetchStreams })(StreamList);
