import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '../../components/email-template'
import { Resend } from 'resend';

const resend = new Resend('re_71UstQsY_Hp3wgEpkYoSEdvarhTQ91h8X');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);
  //console.log(res);
  
  
  try {
    const data = await resend.emails.send({
      from: 'No-Reply <onboarding@resend.dev>',
      to: ['franciscobenegas@gmail.com'],
      subject: 'Prueba Correo',
      react: EmailTemplate({ firstName: 'Pura Raza S.A.' }),
    });
    console.log(data);
    
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
