<template>
  <body class="pt-5">
    <header class="border-left-primary shadow pt-5">
      <div class="headerSection">
        <div class="logoAndName">
          <svg>
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="black"
              stroke-width="3"
              fill="black"
            ></circle>
          </svg>
          <h3>RespTrans FYMSA</h3>
        </div>
        <div class="text-end">
          <p>{{ dayjs().format('DD/MM/YYYY') }}</p>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col">
          <h5>Empleado</h5>
          <p>
            <b>{{
              `${props.employee?.name} ${props.employee?.paternal_surname} ${props.employee?.maternal_surname}`
            }}</b>
            <br />
            {{ props.employee?.email }}
            <br />
            {{ props.employee?.phone }}
            <br />
            <a href="mailto:clientname@clientwebsite.com">
              {{ props.employee?.workstation || 'Empleado' }}
            </a>
          </p>
        </div>
        <div class="col text-end">
          <h4>Sucursal</h4>
          <p class="mb-2">
            <b>{{ props.subsidiary?.name }}</b>
          </p>
          <h5>Generado por</h5>
          <p>
            <b>{{ props.user?.name }}</b>
          </p>
        </div>
      </div>
    </header>
    <footer></footer>
    <main class="border-left-success shadow ps-4">
      <table>
        <thead>
          <tr>
            <th>Articulo</th>
            <th style="max-width: 150px; overflow: hidden; margin-right: 12px">Serie</th>
            <th style="max-width: 150px; overflow: hidden; margin-right: 12px">Código</th>
            <th class="text-center">Fecha de registro</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in props.items" :key="item.id">
            <td>
              <b>{{ item.name }}</b>
              <br />
              {{ item.description }}
            </td>
            <td style="max-width: 150px; overflow: hidden; margin-right: 12px">
              <span class="me-1" v-for="item in item.items" :key="item.id">{{
                item.serial
              }}</span>
            </td>
            <td style="max-width: 150px; overflow: hidden; margin-right: 12px">
              <span class="me-1" v-for="item in item.items" :key="item.id">{{
                item.code
              }}</span>
            </td>
            <td class="text-center">{{ dayjs(item.created_at).format('DD/MM/YYYY') }}</td>
            <td>{{ item.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </main>
    <div class="html2pdf__page-break" />
    <main
      class="border-left-success shadow ps-4 mt-5 text-break pe-4 text-wrap"
    >
      <div class="text-end mt-5 mb-5">
        <span>Villahermosa Tab, {{ dayjs().format('DD/MM/YYYY h:mm A') }}</span>
      </div>
      <div class="text-center mb-5">
        <h5 class="fw-bold">CARTA RESPONSIVA</h5>
      </div>
      <div>
        <span
          >Por medio de la presente
          <span class="fw-bold text-uppercase">{{
            `${props.employee?.name} ${props.employee?.paternal_surname} ${props.employee?.maternal_surname}`
          }}</span>
          declara recibir como herramienta de trabajo:
        </span>
        <div class="mt-3">
          <ul>
            <li v-for="item in props.items" :key="item">
              <span>{{ item.name }} {{ item.description }}</span>
              <span v-for="item in item.items" :key="item.id"
                > <span class="fw-bold fst-italic"> COD:</span> {{ item.code }}, <span class="fw-bold">SN:</span> {{ item.serial }}. </span
              >
            </li>
          </ul>
        </div>
        <div style="text-align: justify" class="mb-2">
          Por lo cual firma de conformidad, comprometiéndose a mantenerlo en el
          estado en el que lo recibe, cuidando de dicho material como si el
          mismo fuera de su propiedad, en el entendido de que en caso de que el
          mismo sufra cualquier daño ocasionado por su dolo o negligencia se
          hará responsable de la reparación del mismo.
        </div>
        <div style="text-align: justify" class="mb-2">
          En caso de que, por causas inherentes al uso y desgaste normales del
          equipo, el mismo requiera cualquier reparación, el que suscribe
          notificará tal circunstancia a la empresa para que la misma le indique
          las condiciones en las que las reparaciones o trabajo de mantenimiento
          sobre el mismo habrán de realizarse.
        </div>
        <div style="text-align: justify" class="mb-2">
          El suscriptor de este documento reconoce que el equipo que se le
          entrega sólo podrá ser utilizado para cumplir con las tareas que le
          encomiende la empresa, dentro del horario de trabajo y las
          instalaciones asignadas; y que no podrá hacer uso del mismo para
          cuestiones de carácter personal. Asimismo, se compromete a emplear el
          equipo únicamente de acuerdo con las condiciones y especificaciones
          que para dichos efectos haga de su conocimiento la empresa,
          obligándose a no modificarlo ni en el hardware ni en el software, es
          decir no agregar ni suprimir ningún programa o información de los que
          se encuentren cargados originalmente sin el expreso consentimiento por
          escrito de la empresa.
        </div>
        <div style="text-align: justify" class="mb-2">
          El que suscribe reconoce que los derechos sobre el equipo objeto de la
          presente corresponden exclusivamente a
          <span class="fw-bold">Prefabricados de Palenque S.A. De C.V</span> en
          términos del contrato que tiene celebrado con el proveedor del mismo
          por lo que a la simple solicitud de la empresa se obliga a devolver el
          equipo que se le entrega a la firma del presente y, en todo caso, al
          terminar su relación laboral con la compañía dejará de utilizar el
          mismo haciendo entrega de él al personal que se le indique en el mismo
          estado en que lo haya recibido, salvo el deterioro debido al uso
          normal del equipo.
        </div>
        <div class="mt-5 pt-5 text-center">
          <div class="fw-bold">
            ________________________________________________________
          </div>
          <p class="fw-bold">
            {{
              `${props.employee?.name} ${props.employee?.paternal_surname} ${props.employee?.maternal_surname}`
            }}
          </p>
          <div class="fw-bold">Nombre y firma de conformidad.</div>
        </div>
      </div>
    </main>
  </body>
</template>

<script setup>
import { dayjs } from 'element-plus'
const props = defineProps({
  user: Object,
  employee: Object,
  subsidiary: Object,
  items: Array,
})
</script>

<style scoped>
/* 
      Import the desired font from Google fonts. 
      */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

/* 
      Define all colors used in this template 
      */
:root {
  --font-color: black;
  --highlight-color: #60d0e4;
  --header-bg-color: #b8e6f1;
  --footer-bg-color: #bfc0c3;
  --table-row-separator-color: #bfc0c3;
}

@page {
  /*
        This CSS highlights how page sizes, margins, and margin boxes are set.
        https://docraptor.com/documentation/article/1067959-size-dimensions-orientation
      
        Within the page margin boxes content from running elements is used instead of a 
        standard content string. The name which is passed in the element() function can
        be found in the CSS code below in a position property and is defined there by 
        the running() function.
        */
  size: US-Letter;
  margin: 8cm 0 3cm 0;

  @top-left {
    content: element(header);
  }

  @bottom-left {
    content: element(footer);
  }
}

/* 
      The body itself has no margin but a padding top & bottom 1cm and left & right 2cm.
      Additionally the default font family, size and color for the document is defined
      here.
      */
body {
  margin: 0;
  padding: 1cm 2cm;
  color: var(--font-color);
  font-family: 'Montserrat', sans-serif;
  font-size: 10pt;
}

/*
      The links in the document should not be highlighted by an different color and underline
      instead we use the color value inherit to get the current texts color.
      */
a {
  color: inherit;
  text-decoration: none;
}

/*
      For the dividers in the document we use an HR element with a margin top and bottom 
      of 1cm, no height and only a border top of one millimeter.
      */
hr {
  margin: 1cm 0;
  height: 0;
  border: 0;
  border-top: 1mm solid var(--highlight-color);
}

/*
      The page header in our document uses the HTML HEADER element, we define a height 
      of 8cm matching the margin top of the page (see @page rule) and a padding left
      and right of 2cm. We did not give the page itself a margin of 2cm to ensure that
      the background color goes to the edges of the document.
      
      As mentioned above in the comment for the @page the position property with the 
      value running(header) makes this HTML element float into the top left page margin
      box. This page margin box repeats on every page in case we would have a multi-page
      estimate.
      */
header {
  height: 8cm;
  padding: 0 2cm;
  position: running(header);
  background-color: var(--header-bg-color);
}

/*
      For the different sections in the header we use some flexbox and keep space between
      with the justify-content property.
      */
header .headerSection {
  display: flex;
  justify-content: space-between;
}

/*
      To move the first sections a little down and have more space between the top of 
      the document and the logo/company name we give the section a padding top of 5mm.
      */
header .headerSection:first-child {
  padding-top: 0.5cm;
}

/*
      Similar we keep some space at the bottom of the header with the padding-bottom
      property.
      */
header .headerSection:last-child {
  padding-bottom: 0.5cm;
}

/*
      Within the header sections we have defined two DIV elements, and the last one in
      each headerSection element should only take 35% of the headers width.
      */
header .headerSection div:last-child {
  width: 35%;
}

/*
      For the logo, where we use an SVG image and the company text we also use flexbox
      to align them correctly.
      */
header .logoAndName {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/*
      The SVG gets set to a fixed size and get 5mm margin right to keep some distance
      to the company name.
      */
header .logoAndName svg {
  width: 1.5cm;
  height: 1.5cm;
  margin-right: 0.5cm;
}

/*
      To ensure the top right section "ESTIMATE" starts on the same level as the Logo &
      Name we set a padding top of 1cm for this element.
      */
header .headerSection .estimateDetails {
  padding-top: 1cm;
}

/*
      In the second row of header sections, we find the "ISSUED TO" area where we also
      make use of flexbox to achive the desired layout.
      */
header .headerSection .issuedTo {
  display: flex;
  justify-content: space-between;
}

/*
      The H3 element "ISSUED TO" gets another 25mm margin to the right to keep some 
      space between this header and the client's address.
      Additionally this header text gets the hightlight color as font color.
      */
header .headerSection .issuedTo h3 {
  margin: 0 0.75cm 0 0;
  color: var(--highlight-color);
}

/*
      The paragraphs within the header sections DIV elements get a small 2px margin top
      to ensure its in line with the "ISSUED TO" header text.
      */
header .headerSection div p {
  margin-top: 2px;
}

/*
      All header elements and paragraphs within the HTML HEADER tag get a margin of 0.
      */
header h1,
header h2,
header h3,
header p {
  margin: 0;
}

/*
      Heading of level 2 and 3 ("ESTIMATE" and "ISSUED TO") need to be written in 
      uppercase, so we use the text-transform property for that.
      */
header h2,
header h3 {
  text-transform: uppercase;
}

/*
      The divider in the HEADER element gets a slightly different margin than the 
      standard dividers.
      */
header hr {
  margin: 1cm 0 0.5cm 0;
}

/*
      Our main content is all within the HTML MAIN element. In this template this are
      two tables. The one which lists all items and the table which shows us the 
      subtotal, tax and total amount.
      
      Both tables get the full width and collapse the border.
      */
main table {
  width: 100%;
  border-collapse: collapse;
}

/*
      We put the first tables headers in a THEAD element, this way they repeat on the
      next page if our table overflows to multiple pages.
      
      The text color gets set to the highlight color.
      */
main table thead th {
  height: 1cm;
  color: var(--highlight-color);
}

/*
      For the last three columns we set a fixed width of 2.5cm, so if we would change
      the documents size only the first column with the item name and description grows.
      */
main table thead th:nth-of-type(2),
main table thead th:nth-of-type(3),
main table thead th:last-of-type {
  width: 2.5cm;
}

/*
      The items itself are all with the TBODY element, each cell gets a padding top
      and bottom of 2mm and a border bottom of .5mm as a row separator.
      */
main table tbody td {
  padding: 2mm 0;
  border-bottom: 0.5mm solid var(--table-row-separator-color);
}

/*
      The cells in the last column (in this template the column containing the total)
      get a text align right so the text is at the end of the table.
      */
main table thead th:last-of-type,
main table tbody td:last-of-type {
  text-align: right;
}

/*
      By default text within TH elements is aligned in the center, we do not want that
      so we overwrite it with an left alignment.
      */
main table th {
  text-align: left;
}

/*
      The summary table, so the table containing the subtotal, tax and total amount 
      gets a width of 40% + 2cm. The plus 2cm is added because our body has a 2cm padding
      but we want our highlight color for the total row to go to the edge of the document.
      
      To move the table to the right side we simply set a margin-left of 60%.
      */
main table.summary {
  width: calc(40% + 2cm);
  margin-left: 60%;
  margin-top: 0.5cm;
}

/*
      The row containing the total amount gets its background color set to the highlight 
      color and the font weight to bold.
      */
main table.summary tr.total {
  font-weight: bold;
  background-color: var(--highlight-color);
}

/*
      The TH elements of the summary table are not on top but the cells on the left side
      these get a padding left of 1cm to give the highlight color some space.
      */
main table.summary th {
  padding: 4mm 0 4mm 1cm;
  border-bottom: 0;
}

/*
      As only the highlight background color should go to the edge of the document
      but the text should still have the 2cm distance, we set the padding right to 
      2cm.
      */
main table.summary td {
  padding: 4mm 2cm 4mm 0;
  border-bottom: 0;
}

/*
      The content below the tables is placed in a ASIDE element next to the MAIN element.
      To ensure this element is always at the bottom of the page, just above the page 
      footer, we use the Prince custom property "-prince-float" with the value bottom.
      
      See Page Floats on https://www.princexml.com/howcome/2021/guides/float/.
      */
aside {
  -prince-float: bottom;
  float: bottom;
  padding: 0 2cm 0.5cm 2cm;
}

/*
      The content itself is shown in 2 columns.
      */
aside p {
  margin: 0;
  column-count: 2;
}

/*
      The page footer in our document uses the HTML FOOTER element, we define a height 
      of 3cm matching the margin bottom of the page (see @page rule) and a padding left
      and right of 2cm. We did not give the page itself a margin of 2cm to ensure that
      the background color goes to the edges of the document.
      
      As mentioned above in the comment for the @page the position property with the 
      value running(footer) makes this HTML element float into the bottom left page margin
      box. This page margin box repeats on every page in case we would have a multi-page
      estimate.
      
      The content inside the footer is aligned with the help of line-height 3cm and a 
      flexbox for the child elements.
      */
footer {
  height: 3cm;
  line-height: 3cm;
  padding: 0 2cm;
  position: running(footer);
  background-color: var(--footer-bg-color);
  font-size: 8pt;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

/*
      The first link in the footer, which points to the company website is highlighted 
      in bold.
      */
footer a:first-child {
  font-weight: bold;
}
</style>
