
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input as RsInput } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Inscription.css';

const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numeroDeTelephone, setNumeroDeTelephone] = useState('');

  const handleSaveuser = (event) => {
    event.preventDefault();
    let user = { nom, prenom, email, password, numeroDeTelephone };
    axios.post('http://localhost:8080/utilisateurs', user)
      .then(res => {
        setNom('');
        setPrenom('');
        setEmail('');
        setPassword('');
        setNumeroDeTelephone('');

        toast.success('Utilisateur enregistré avec succès', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch(error => {
        toast.error(`Erreur lors de l'enregistrement: ${error.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <div className="inscription-background">
      <Form className="inscription-form" onSubmit={handleSaveuser}>
        <FormGroup>
          <Label for="nom">Nom</Label>
          <RsInput type="text" name="nom" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="prenom">Prenom</Label>
          <RsInput type="text" name="prenom" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <RsInput type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Mot de passe</Label>
          <RsInput type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="telephone">Telephone</Label>
          <RsInput type="text" name="telephone" id="telephone" value={numeroDeTelephone} onChange={(e) => setNumeroDeTelephone(e.target.value)} />
        </FormGroup>
        <Button color="danger" className="mt-3" block type="submit">Inscription</Button>

        <p>Avez-vous déjà un compte ? <Link to="/login">Connectez-vous.</Link></p>
        <p>Cette page est protégée par Kyria reCAPTCHA pour garantir que vous n'êtes pas un robot.</p>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default Inscription;
