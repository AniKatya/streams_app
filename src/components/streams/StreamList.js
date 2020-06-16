import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount = () => {
    this.props.fetchStreams();
  };

  renderAdmin = (stream) => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <button className="ui button primary">Edit</button>
          <button className="ui button negative">Delete</button>
        </div>
      );
    }
  };
  renderList = () => {
    return (
      <div>
        <div className="ui celled list">
          {this.props.streams.map((stream) => {
            return (
              <div className="item" key={stream.id}>
                {this.renderAdmin(stream)}

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

  renderCreate() {
    return this.props.isSignedIn ? (
      <div style={{ textAlign: "right" }}>
        {" "}
        <Link to="/streams/new" className="ui button primary">
          Create stream
        </Link>
      </div>
    ) : null;
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        {this.props.streams.length > 0 ? this.renderList() : null}
        {this.renderCreate()}
      </div>
    );
  }
}

const mapToStateProps = (state) => {
  return {
    streams: state.streams,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapToStateProps, { fetchStreams })(StreamList);
