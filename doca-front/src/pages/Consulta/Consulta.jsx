import React, { useState } from 'react'
import "./consultaRapida.css"

export const Consulta = () => {


  const [search, setSearch] = useState("")
  const searcher = (e) => {
    setSearch(e.target.value)
  }
  // const results = !search ? doctores : doctores.filter((dato)=> dato.sintoma.toLowerCase().includes(search.toLocaleLowerCase()))





  return (
    <div>


      <main className='cDoctor'>
        <h1>ConsultaRapida</h1>
        <section className="consultaDoctor">
          <h2>Consulta Rapida al especialista</h2>
          <li>Escribe que sintomas tienes o donde sientas dolor.</li>
          <li>Nosotros te indicaremos quienes son los especialistas que tenemos disponibles para ti.</li>
          <li>Resolveremos tus dudas muy rápido y de manera gratis </li>
          <li>Duda Solucionada!</li>

        </section>

        <div>
          <label   > <h2>   Seleccione que sintomas   tienes o donde sientes dolores </h2></label>
          <input value={search} onChange={searcher} type="text" placeholder='Buscar' className='form-control' />
          <table className='table table-striped table-hover mt-5 shadow-lg'>
            <thead>
              <tr className='bg-curso text-white'>
                <th>Nombre</th>
                <th>Especialidad</th>
              </tr>
            </thead>
            <tbody>
              {/* { results.map(   (doctor) => */}
              {/* ( */}
              <tr
              //  key={doctor.id}
              >
                <td>
                  {/* {doctor.nombre} */}
                </td>
                <td>
                  {/* {doctor.especialidad} */}
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>


      </main>


    </div>
  )
}