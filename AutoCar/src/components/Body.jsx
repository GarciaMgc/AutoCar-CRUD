import React from 'react';

function Body({ 
  products, handleEdit, handleDelete, marca, modelo, ano, price, setMarca, setPrice, setModelo, setAno, editMode, handleSubmit 
}) {
  return (
    <main className="body">
      {/* Container dos cards */}
      <div className="container">

        {/* Card para a lista de produtos */}

        <div className="products-card">
          <h2>Lista de Carrinhos</h2>
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <div className="product-details">
                  <h3>{product.marca}</h3>
                  <h3>{product.modelo}</h3>
                  <h3>{product.ano}</h3>
                  <p>R$ {product.price}</p>
                </div>
                <div className="product-actions">
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button onClick={() => {
                    let msg=prompt("Quer excluir mesmo bocó?").toUpperCase()
                    if(msg==="SIM")handleDelete(product.id)
                  }}>Deletar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Card para o formulário */}
        
        <div className='form-card'>
          <h2>{editMode ? "Editar Carrinho" : "Adicionar Carrinho"}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Marca:
              <input
                type="text"
                value={marca}
                name='marca'
                onChange={(e) => setMarca(e.target.value)}
                required
                minLength="2"
              />
            </label>
            <label>
              Modelo:
              <input
                type="text"
                value={modelo}
                name='modelo'
                onChange={(e) => setModelo(e.target.value)}
                required
                minLength="2"
              />
            </label>
            <label>
              Ano:
              <input
                type="number"
                value={ano}
                name='ano'
                onChange={(e) => setAno(e.target.value)}
                required
                minLength="3"
              />
            </label>
            <label>
              Preço:
              <input
                type="number"
                value={price}
                name='price'
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <input type="submit" value={editMode ? "Atualizar" : "Adicionar"} />
          </form>
        </div>
      </div>
    </main>
  );
}

export default Body;
