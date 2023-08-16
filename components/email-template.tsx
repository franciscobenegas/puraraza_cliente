import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate = ({
  firstName,
}) => (
  <div>
    <h1>Bienvenido, {firstName}!</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, et non. Necessitatibus obcaecati similique est impedit iusto perspiciatis tempore recusandae?</p>
    <button>
        <a href='https://purarazapp.com/'> Ir a la web </a>
    </button>
  </div>

);


