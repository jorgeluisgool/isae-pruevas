import React, { useEffect, useState } from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const EjemploDragDrop = () => {
  const arreglo1 = [
    {
      "campo": "FOLIO",
      "tipocampo": "ALFANUMERICO",
      "agrupacion": "DATOS DEL REGISTRO",
      "restriccion": "[N/A]",
      "longitud": 10
    },
    {
      "campo": "FECHA DE INSTALACION",
      "tipocampo": "CALENDARIO",
      "agrupacion": "PRUEBA TOTAL PLAY",
      "restriccion": "[N/A]",
      "longitud": 10
    },
    {
      "campo": "ID SITIO",
      "tipocampo": "ALFANUMERICO",
      "agrupacion": "PRUEBA TOTAL PLAY",
      "restriccion": "[N/A]",
      "longitud": 20
    },
    {
      "campo": "DEPENDENCIA",
      "tipocampo": "ALFANUMERICO",
      "agrupacion": "PRUEBA TOTAL PLAY",
      "restriccion": "[N/A]",
      "longitud": 20
    },
    {
      "campo": "FIRMA",
      "tipocampo": "FIRMA",
      "agrupacion": "FIRMAS",
      "restriccion": "[N/A]",
      "longitud": 10
    }
  ];
  
  const arreglo2 = arreglo1.reduce((acumulador, objeto) => {
    const grupo = acumulador.find((elem) => elem.agrupacion === objeto.agrupacion);
    if (grupo) {
      grupo.campos.push(objeto);
    } else {
      acumulador.push({
        agrupacion: objeto.agrupacion,
        campos: [objeto]
      });
    }
    return acumulador;
  }, []);
  
  console.log(arreglo2);

  
  return (
    <div></div>
  )
}

export default EjemploDragDrop