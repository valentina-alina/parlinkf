/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { User } from '../../services/interfaces/User';

import { Button, FloatingLabel, Card } from "flowbite-react";
// GET subject from bdd 

import {registerClient} from '../../services/api/user'; 
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

interface PropUserPage {
  handleSubmitUser: (author:any) => void;
}

export default function ForgotPswdPage(props: PropUserPage) {
  const handleSubmitUser = props.handleSubmitUser;
  console.log('handleSubmitUser', handleSubmitUser)

  const validationSchema = Yup.object({
    nom: Yup.string().required('Le nom est requis'),
    prenom: Yup.string().required('Le prénom est requis'),
    email: Yup.string().email('Format d\'email invalide').required('L\'email est requis'),
    role: Yup.string().required('Le rôle est requis'),
  });

  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
      role: 'admin',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const userFormData = {
              firstName: values.nom,
          lastName: values.prenom,
          role: "admin",
          email: values.email,
          };

      console.log("formdata",userFormData);
      try {
        const response = await registerClient(userFormData);

        if (response.data) {
    //TODO : une fois le mailing mis en place, enlever la redirection sur pa gae changer mot de passe
          // alert('Nouveau utilisateur ajouté avec succès');

          Swal.fire({
            title: 'Form Submitted',
            html: `
              <p>Votre compte a été crée.Pour changer le mot de passe copier le code et le renseigner dans formulaire suivant</p>
              <p>Code activation : ${JSON.stringify(response.data.user.password)}</p>
              <a href="/forgot-password-page" class="ms-2 text-sm text-blue-400 dark:text-blue-300 hover:underline">Changer mot de passe</a>
            `,
            icon: 'success',
            confirmButtonText: 'Close'
          });
    // TODO----------------------------------------------------------------
        } else {
          alert('Erreur lors de l\'ajout de l\'utilisateur');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'ajout de l\'utilisateur');
      }
    },
  });

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-full md:max-w-md md:mx-auto hover:bg-transparent">
          <h5 className="text-2xl font-bold tracking-tight text-blue-800 dark:text-white">
            Creer compte client
          </h5>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full mx-auto">
            <div className="col-grid-2">
            
              <FloatingLabel variant="outlined" label="Nom" sizing="sm" id="nom" name="nom" onChange={formik.handleChange} value={formik.values.nom} />
              {formik.touched.nom && formik.errors.nom ? (<div>{formik.errors.nom}</div>) : null}
              <FloatingLabel variant="outlined" label="Prenom" sizing="sm" id="prenom" name="prenom" onChange={formik.handleChange} value={formik.values.prenom} />
              {formik.touched.prenom && formik.errors.prenom ? (<div>{formik.errors.prenom}</div>) : null}
              <FloatingLabel variant="outlined" label="&#9993; name@email.com" sizing="sm" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
              {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}
      
            </div>
            <Button type="submit">Submit</Button>
          </form>
          <div className="text-left">
            <Link to="/login" className="ms-2 text-sm text-blue-400 dark:text-blue-300 hover:underline">Se conecter</Link>
          </div>
        </Card>
      </div>
    </>
  );
}
