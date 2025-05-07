function CustomTable({ headers, data }) {
  return (
    <>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function card() {

  return (
    <div className="flex justify-center items-start pt-6 min-h-screen bg-gray-100 font-poppins px-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Registro de Estudiantes</h1>
        <CustomTable
          headers={["Nombre", "Apellido", "Edad"]}
          data={[
            ["Juan", "Pérez", 20],
            ["María", "Gómez", 22],
            ["Pedro", "López", 19],
          ]}
        />
      </div>
    </div>
  );
}


f


