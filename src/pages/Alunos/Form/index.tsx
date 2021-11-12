/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css';
import { useHistory, useParams } from 'react-router-dom';


interface IAluno {

  nome: string;
  nascimento: string;
  idade: string;
  ra: string;
  endereço: string;
  matriculado: boolean;
  updated_at: Date;
}

const Alunos: React.FC = () => {

  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  const [model, setModel] = useState<IAluno>({
    nome: '',
    nascimento: '',
    idade: '',
    ra: '',
    endereço: '',
    matriculado: Boolean(),
    updated_at: new Date()
  })


  useEffect(() => {
    console.log(id)
    if (id != undefined) {
      findAluno(id)
    }
  }, [id])

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id != undefined) {
      const response = await api.put(`/alunos/${id}`, model)
    }
    else {
      const response = await api.post('/alunos', model)
    }
    back()
  }

  function back() {
    history.goBack()
  }


  async function findAluno(id: string) {
    const response = await api.get(`alunos/${id}`)
    console.log(response)
    setModel({
      nome: response.data.nome,
      nascimento: response.data.nascimento,
      idade: response.data.idade,
      ra: response.data.ra,
      endereço: response.data.endereço,
      matriculado: response.data.matriculado,
      updated_at: response.data.updated_at
    })
  }




  return (

    <div className="container">
      <br />
      <div className="aluno-header">
        <h1>Novo Aluno</h1>
        <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="textarea"
              name="nome"
              value={model.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>nascimento</Form.Label>
            <Form.Control
              as="textarea"
              name="nascimento"
              value={model.nascimento}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>idade</Form.Label>
            <Form.Control
              as="textarea"
              name="idade"
              value={model.idade}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
          </Form.Group>


          <Form.Group>
            <Form.Label>RA</Form.Label>
            <Form.Control
              as="textarea"
              name="ra"
              value={model.ra}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
          </Form.Group>


          <Form.Group>
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              as="textarea"
              name="endereço"
              value={model.endereço}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
          </Form.Group>


          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Alunos;