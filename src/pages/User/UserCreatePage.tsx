// la page de creation des comptes
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { User } from '../../services/interfaces/User';
import ChildForm from '../../components/Child/ChildForm';
import ControlButtonNumber from '../../components/Utils/ControlButtonNumber';

import { Button, Card, } from "flowbite-react";
import { FloatingLabel } from "flowbite-react";
import { Tabs } from "flowbite-react";

import { InputCounter } from 'flowbite';
import type { InputCounterOptions, InputCounterInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';



// set the target element of the input field
const $targetEl: HTMLInputElement = document.getElementById('counter-input-example') as HTMLInputElement;

// optionally set the increment and decrement elements
const $incrementEl: HTMLElement = document.getElementById('increment-button');

const $decrementEl: HTMLElement = document.getElementById('decrement-button');

// optional options with default values and callback functions
const options: InputCounterOptions = {
  minValue: 0,
  maxValue: null, // infinite
  onIncrement: () => {
    console.log('input field value has been incremented');
  },
  onDecrement: () => {
    console.log('input field value has been decremented');
  }
};

// instance options object
const instanceOptions: InstanceOptions = {
  id: 'counter-input-example',
  override: true
};

/*
 * $targetEl: required
 * $incrementEl: optional
 * $decrementEl: optional
 * options: optional
 * instanceOptions: optional
 */
const counterInput: InputCounterInterface = new InputCounter(
  $targetEl,
  $incrementEl,
  $decrementEl,
  options,
  instanceOptions
);

interface PropUserPage {
  handleSubmitUser: (author: User) => void;
}

export default function UserCreatePage(props: PropUserPage) {

  const handleSubmitUser=props.handleSubmitUser;

  const [childCounterFromControlButton, setChildCounterFromControlButton] = useState<number>(0);

  // Fonction pour mettre à jour childCounter
  const handleUpdateChildCounter = (childCounter: any) => {
    setChildCounterFromControlButton(childCounter);
  };

  // Utiliser Yup pour définir le schéma de validation
  const validationSchema = Yup.object({
    nom: Yup.string().required('Le prénom est requis'),
    prenom: Yup.string().required('Le nom est requis'),
    email: Yup.string().email('Format d\'email invalide').required('L\'email est requis'),
  });

  // useFormik retourne un objet avec diverses propriétés et méthodes pour gérer le formulaire
  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
    },
    validationSchema: validationSchema, // Utiliser le schéma de validation Yup
  
    onSubmit: values => {
      // handleSubmitUser(
      //   {
      //     ...values
      //   }
      // )
      // Gérer la logique de soumission du formulaire ici
      console.log(values);
      alert("Nouveau user ajoutée") 
    },
  });



  return (
    <>

      <Card href="#" className="max-w-sm hover:bg-transparent">
        <h5 className="text-2xl font-bold tracking-tight text-blue-800 dark:text-white">
          Ajouter un utilisateur
        </h5>
        <form onSubmit={formik.handleSubmit} className="flex max-w-md flex-col gap-4">
          <div className="max-w-md">

            <Tabs aria-label="Tabs with underline" style="underline" >
              <Tabs.Item active title="Parent" className="bg-red-500 border-red-500" ></Tabs.Item>
              <Tabs.Item title="Intervenant" ></Tabs.Item>
              <Tabs.Item title="Admin" ></Tabs.Item>
            </Tabs>

            <FloatingLabel variant="outlined" label="Nom" sizing="sm"
              id="nom"
              name="nom"
              onChange={formik.handleChange}
              value={formik.values.nom}
            />
            {formik.touched.nom && formik.errors.nom ? (
              <div>{formik.errors.nom}</div>
            ) : null}

            <FloatingLabel variant="outlined" label="Prenom" sizing="sm"
              id="prenom"
              name="prenom"
              onChange={formik.handleChange}
              value={formik.values.prenom} />
            {formik.touched.prenom && formik.errors.prenom ? (
              <div>{formik.errors.prenom}</div>
            ) : null}

            <FloatingLabel variant="outlined" label="&#9993; name@email.com" sizing="sm"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email} />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            <h5 className="text-left tracking-tight text-blue-600 dark:text-white"> Nombre d'enfants</h5>
            <ControlButtonNumber handleChildCounter={handleUpdateChildCounter} />

          </div>
          {/* Repeter le formulaire ChildForm autant des fois que nb des enfants */}
          <div>
            <p>Child counter: {childCounterFromControlButton}</p>
            {Array.from({ length: childCounterFromControlButton }, (_, index) => (
              <ChildForm />
            ))}
          </div>



          <Button type="submit" className='bg-blue-700' >Register new account</Button>
        </form>

      </Card>


    </>
  );
}