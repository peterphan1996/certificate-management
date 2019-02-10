import { Pagination } from 'antd';
import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

interface Props {
  file: any;
}

interface IState {
  numPages: number | null;
  pageNumber: number;
}

class Pdf extends Component<Props, IState> {
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
        {numPages && (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Pdf;
