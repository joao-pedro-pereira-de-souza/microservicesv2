"use client";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import './pdf.module.css';
import { NavigateFunction } from 'react-router-dom';


interface pdfUrlsInterface {
  id: string;
  url: string;
}
function PdfList({
  pdfUrls,
  navigate,
}: {
  pdfUrls: pdfUrlsInterface[];
  navigate: NavigateFunction;
}) {
  return (
    <div
      className="container"
      style={{
        overflowY: "scroll",
        height: "90%",
      }}
    >
      <div className="row">
        {pdfUrls.map((item, index) => (
          <div className="col-md-4 col-sm-6 col-12 mb-4" key={index}>
            <div
              className="card"
              style={{
                background: "transparent",
                border: "0px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="card-body">
                <div style={{ height: "300px", overflow: "hidden" }}>
                  <Document
                    file={item.url}
                    loading="Carregando pré-visualização..."
                    error="Erro ao carregar PDF"
                  >
                    <Page pageNumber={1} height={300} />
                  </Document>
                </div>

                <button
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary"
                  style={{ margin: "1rem 0px" }}
                  onClick={() => navigate(`/templates/${item.id}`)}
                >
                  Usar template
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PdfList;
