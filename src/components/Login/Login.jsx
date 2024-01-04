// Login.js
import { useState } from 'react';
import { Button, Form, FormGroup, Label, Input as RsInput } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const { data: users } = await axios.get('http://localhost:8080/utilisateurs');

    
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      
      localStorage.setItem('user', JSON.stringify(user));
      

   
      navigate('/accueil');
    } else {
      
      alert('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-background">
      <Form className="login-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email or phone number</Label>
          <RsInput type="email" name="email" id="email" placeholder="kyriamatondo@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <RsInput type="password" name="password" id="password" placeholder="**********" value={password} onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <Button color="danger" className="mt-3" block type="submit">Connexion</Button>
        <p className="text right">Besoin d'aide ?</p>
        <p>Nouveau sur KLOC ? <Link to="/inscription">S'inscrire maintenant.</Link> </p>
        <p>Cette page est protegee par Kyria reCAPATCHA pour garantir que vous n'etes pas un robot.</p>
      </Form>
    </div>
  );
}

export default Login;