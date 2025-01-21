"use client";

import styles from "./template.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Storage } from "../../../services/storage";
import { ProgressBar, InputGroup, FormControl, Button } from "react-bootstrap";
import {  pdfjs } from "react-pdf";
import { useComponentListVariable } from "../../components/listVariables/list.variables";
import { TemplateService } from './services';
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Home() {
  const { id } = useParams();
  const storage = new Storage();

  const data = storage.template.get();
  const find = data.items.find((item) => item.id === id);
  const [progressValue, setProgressValue] = useState(0);
  const [pdfOutput, setPdfOutput] = useState<File | null>(null);

  const {
    items,
    variableInput,
    setVariableInput,
    valueInput,
    setValueInput,
    addItem,
    handleRemoveItem,
    variables,
    isTemplateUsed,
    setIsTemplateUsed
  } = useComponentListVariable();

    const templateService = new TemplateService(
      {
        urlPdf: find!.url,
        basePdf: find!.base,
        variables,
        setIsTemplateUsed,
        setPdfOutput,
        setProgressValue,
        pdfOutput
      }
    );


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.container_view_pdf}>
          <iframe
            src={find?.url}
            width="600"
            height="780"
            style={{ border: "none" }}
          ></iframe>
        </div>

        <div className={styles.container_variables}>
          <div style={{ background: "var(--foreground)" }}>
            <div className={styles.container_list_variables}>
              {items.map((item, index) => (
                <div key={index} className="input-group mb-3">
                  <FormControl value={item} readOnly />
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>

            <div className={styles.container_input_add}>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  className={styles.button_input_add}
                  onClick={addItem}
                >
                  Adicionar variável
                </InputGroup.Text>
                <FormControl
                  placeholder="variável"
                  value={variableInput}
                  onChange={(e) => setVariableInput(e.target.value)}
                />
                <FormControl
                  placeholder="valor"
                  value={valueInput}
                  onChange={(e) => setValueInput(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>
        </div>

        <div className={styles.container_result}>
          <div className={styles.container_result_items}>
            <Button
              className={styles.button_create_pdf}
              variant="outline-success"
              onClick={() => templateService.handleUseTemplate()}
            >
              Criar pdf
            </Button>
            <div className={styles.container_progressbar}>
              {isTemplateUsed ? (
                <ProgressBar now={progressValue} label={`${progressValue}%`} />
              ) : (
                <p style={{ textAlign: "center" }}>
                  Nenhum evento sendo executado...
                </p>
              )}
            </div>
            {pdfOutput ? (
              <div className={styles.container_pdf_output}>
                <iframe
                  src={URL.createObjectURL(pdfOutput)}
                  width="600"
                  height="780"
                  style={{ border: "none" }}
                ></iframe>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
