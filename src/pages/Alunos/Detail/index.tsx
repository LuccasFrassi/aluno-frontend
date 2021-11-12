/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import './index.css';
import api from '../../../services/api';
import moment from 'moment';


interface IAluno {
  id: number;
  nome: string;
  nascimento: Date;
  idade: number;
  ra: number;
  endereço: string;
  matriculado: boolean;
  updated_at: Date;
}

const Detail: React.FC = () => {

  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const [aluno, setAluno] = useState<IAluno>()

  function back() {
    history.goBack()
  }

  async function findAluno() {
    const response = await api.get<IAluno>(`/alunos/${id}`)
    console.log(response)
    setAluno(response.data)
  }

  useEffect(() => {
    findAluno()
  }, [findAluno, id])

  return (
    <div className="container">
      <br />
      <div className="aluno-header">
        <h1>Detalhes do Aluno</h1>
        <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
      </div>
      <br />

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{aluno?.nome}</Card.Title>

          <Card.Text>
            <strong>Nascimento: </strong>  {aluno?.nascimento}
            <br />
            <strong>Idade </strong>{aluno?.idade}
            <br />
            <strong>R.A: </strong>  {aluno?.ra}
            <br />
            <strong>Endereço: </strong>  {aluno?.endereço}
            <br />
            <strong>Situação: </strong>  {aluno?.matriculado ? "Finalizado" : "Pendente"}
            <br />
            <strong>Data de Atualização: </strong>
            {moment(aluno?.updated_at).format('DD/MM/YYYY')}
          </Card.Text>
        </Card.Body>
      </Card>


    </div>
  );
}

export default Detail;