"use client";
import {useState, useEffect} from 'react'
import styles from "./index.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "react-bootstrap";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useNavigate } from "react-router-dom";
import { Api } from '../../../services/api';

import { Storage } from '../../../services/storage';
const PdfList = dynamic(() => import("../../components/pdfList/pdf.list"), {
  ssr: false,
});

export default  function Home() {

  const [templateList, setTemplateList] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = Api.instance();
        const storage = new Storage();

        const data = await api.template.list();

        console.log({list:data})
        setTemplateList(data);
        storage.template.set(JSON.stringify(data));
      } catch (error) {
        console.error("Erro ao buscar os templates:", error);
      }
    };

    fetchData();
  }, [])

  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container_left} />

        <div className={styles.menu}>
          <div className={styles.menu_left}>
            <Dropdown>
              <DropdownToggle
                variant="primary"
                id="dropdown-basic"
                style={{ background: "var(--background)", border: "0px" }}
              >
                Ferramentas
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem href="#">Regular link</DropdownItem>
                <DropdownItem href="#" active>
                  templates pdf
                </DropdownItem>
                <DropdownItem href="#">Another link</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className={styles.menu_right}>
            <a href="#">
              <Image
                aria-hidden
                src="/github.svg"
                alt="Globe icon"
                width={55}
                height={55}
              ></Image>
            </a>

            <a href="#" className={styles.option_question}>
              <p>?</p>
            </a>
          </div>
        </div>
        <div className={styles.container_details}>
          <div>
            <h1>Auto Templates</h1>
            <p>Crie documentos através de templates</p>
          </div>
          <Image
            aria-hidden
            src="/pdf-file-format.png"
            alt="Globe icon"
            width={300}
            height={300}
            style={{ marginLeft: "1rem" }}
          />
        </div>
      </main>
      <div className={styles.container_example}>

        <h1 style={{textAlign: 'center', zIndex: 2, marginBottom: '10px', position: 'relative'}}>Preview</h1>
        <Image
          className={styles.image_preview}
          aria-hidden
          src="/preview-template.png"
          alt="Preview template"
          width={1500}
          height={800}
        />
      </div>

      <div className={styles.container_templates}>
        <h1>Templates </h1>
        {Object.keys(templateList).length ? (
          <PdfList pdfUrls={(templateList as any).items} navigate={navigate} />
        ) : (
          <p>Teste</p>
        )}
      </div>

      <footer className={styles.footer}></footer>
    </div>
  );
}
