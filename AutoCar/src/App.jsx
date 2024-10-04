import { useState, useEffect } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import './App.css';

// URL da API simulada com json-server
const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [price, setPrice] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // useEffect para buscar os produtos ao montar o componente
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(url);
      const data = await resp.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  // Função para adicionar ou editar produto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hoje=new Date();
    let anohoje=hoje.getFullYear();
    const product = { marca, modelo, ano, price: parseFloat(price) };
    let res;
    if (product.price <= 0) return alert("Ei tabacudo, o preço precisa ser maior que zero")
    if (product.ano < 1900 || product.ano > anohoje) return alert("O ano deve ser um número entre 1900 e o ano atual.")

    if (editMode) {
      res = await fetch(`${url}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product),
      });

      setEditMode(false);
      setEditId(null);
    } else {
      res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product),
      });
    }

    const data = await res.json();
    setProducts((prevProducts) => {
      if (editMode) {
        return prevProducts.map((p) => (p.id === data.id ? data : p));
      } else {
        return [...prevProducts, data];
      }
    });

    setMarca("");
    setModelo("");
    setAno("");
    setPrice("");
  };

  // Função para deletar um produto
  const handleDelete = async (id) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  // Função para iniciar a edição de um produto
  const handleEdit = (product) => {
    setMarca(product.marca);
    setModelo(product.modelo);
    setAno(product.ano);
    setPrice(product.price);
    setEditMode(true);
    setEditId(product.id);
  };

  return (
    <>
      <Header />
      <Body 
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        marca={marca}
        modelo={modelo}
        ano={ano}
        price={price}
        setMarca={setMarca}
        setModelo={setModelo}
        setAno={setAno}
        setPrice={setPrice}
        editMode={editMode}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </>
  )
  }
  export default App;