import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { Pagination } from 'antd';

class Pdf extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document file={this.props.file} onLoadSuccess={this.onDocumentLoad}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <Pagination
          defaultCurrent={pageNumber}
          total={numPages * 10}
          onChange={page => {
            this.setState({
              pageNumber: page,
            });
          }}
        />
      </div>
    );
  }
}

export default Pdf;
