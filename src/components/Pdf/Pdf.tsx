import { Pagination } from 'antd';
import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

interface Props {
  file: any;
}

class Pdf extends Component<Props> {
  state = {
    numPages: 0,
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
