/* eslint-disable @typescript-eslint/no-explicit-any */
//? la page de creation des comptes
import { useState/* , useEffect */ } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { /* Button, Card, FloatingLabel, Tabs,  */Accordion, /* List,  */Avatar } from 'flowbite-react';
// import { MdAddToPhotos } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import profileFaker from './profileFaker';
import UserCreatePage from './UserCreatePage';
// import { User } from '../../services/interfaces/User';
// import ControlButtonNumber from '../../services/utils/ControlButtonNumber';
import { IoPersonAdd } from "react-icons/io5";
import { Tooltip } from "flowbite-react";

const users = profileFaker;

const UserManagement = ({ handleSubmitUser }:any) => {
  const [childCounterFromControlButton, setChildCounterFromControlButton] = useState(0);
  console.log('childCounterFromControlButton', childCounterFromControlButton)
  console.log('setChildCounterFromControlButton', setChildCounterFromControlButton)

  const validationSchema = Yup.object({
    nom: Yup.string().required('Le prénom est requis'),
    prenom: Yup.string().required('Le nom est requis'),
    email: Yup.string().email('Format d\'email invalide').required('L\'email est requis'),
  });

  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      alert("Nouveau utilisateur ajouté");
    },
  });
  console.log('formik', formik)
const color ="text-red-800";
console.log('color', color)
  return (
    <> 
  <h5 className="text-2xl font-bold tracking-tight text-blue-800 dark:text-white my-3">
    Gestion des utilisateurs 
  </h5>

    <div className=' flex flex-col gap-4 w-full md:w-1/2 lg:w-1/2 mx-auto'>
      <Accordion  collapseAll className='w-full '>
        <Accordion.Panel className=''>
          <Accordion.Title className='hover:bg-vlue-700 text-left bg-blue-700 text-white'>
          <span className=" relative flex gap-2 p-1 text-xl  font-bold tracking-tight  text-white dark:text-white">
              <span ><IoPersonAdd /> </span> <span >Ajouter un utilisateur </span>
          </span>
              {/* <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-700 relative flex gap-2 p-1 mt-2'>
                                <span className="relative text-white m-1">Ajouter un utilisateur </span> <span>
                                    <IoPersonAdd  className="relative text-white h-5 w-5" />
                                </span>
                            </span> */}
          </Accordion.Title>
          <Accordion.Content>
            <UserCreatePage handleSubmitUser={handleSubmitUser} />
          </Accordion.Content>
        </Accordion.Panel>
        <div>
          { 
users.map
((user) => (            
            <Accordion.Panel key={
user.id
} className=''>
              <Accordion.Title className=" hover:bg-violet-100">
                <div className=" lg:w-[500px]  grid grid-cols-3 gap-4 ">
                  <span className='flex gap-5 col-span-2' ><Avatar className='w-auto' img={user.file} alt={`${user.firstname} ${user.lastname}`} rounded size="sm" />
                  <p className="truncate text-left text-sm font-medium text-gray-900 dark:text-white">{`${user.firstname} ${user.lastname}`}</p>
                  </span>
                  <Link to={`/delete-user/${
user.id
}`} className={`flex justify-end  ${(user.delete === '1')?"text-red-800"😦user.delete === '2')?"text-green-800":"text-gray-400"}`}>

                  <Tooltip content={`${(user.delete === '1')?"demande"😦user.delete === '2')?"non-conforme":"suppresion"}`} style="light">
                    <AiTwotoneDelete />
                    </Tooltip>
                  
                  </Link>
                </div>
              </Accordion.Title>
              <Accordion.Content >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">{
user.email
}</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {
user.phone
}
                </div>
                <ul className="truncate text-sm text-gray-500 dark:text-gray-400">
                  Enfants :
                  <li>Léa classe : CM1</li>
                  <li>Leo classe : CP</li>
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </div>
      </Accordion>
    </div>
    
    </>
  );
};

export default UserManagement;

// import React, { useState } from 'react'
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// import { User } from '../../services/interfaces/User';
// import ChildForm from '../../components/Child/ChildForm';
// import ControlButtonNumber from '../../services/utils/ControlButtonNumber';

// import { Button, Card, } from "flowbite-react";
// import { FloatingLabel } from "flowbite-react";
// import { Tabs } from "flowbite-react";
// import { MdAddToPhotos } from "react-icons/md";
// import { InputCounter } from 'flowbite';
// import { Accordion } from "flowbite-react";
// import type { InputCounterOptions, InputCounterInterface } from 'flowbite';
// import type { InstanceOptions } from 'flowbite';

// import { List, Avatar } from "flowbite-react";
// import { AiTwotoneDelete } from "react-icons/ai";

// // set the target element of the input field
// const $targetEl: HTMLInputElement = document.getElementById('counter-input-example') as HTMLInputElement;

// // optionally set the increment and decrement elements
// const $incrementEl: HTMLElement = document.getElementById('increment-button');

// const $decrementEl: HTMLElement = document.getElementById('decrement-button');

// import profileFaker from './profileFaker'
// import UserCreatePage from './UserCreatePage';
// import { Link } from 'react-router-dom';

// const users = profileFaker;

// // optional options with default values and callback functions
// const options: InputCounterOptions = {
//   minValue: 0,
//   maxValue: null, // infinite
//   onIncrement: () => {
//     console.log('input field value has been incremented');
//   },
//   onDecrement: () => {
//     console.log('input field value has been decremented');
//   }
// };

// // instance options object
// const instanceOptions: InstanceOptions = {
//   id: 'counter-input-example',
//   override: true
// };

// /*
//  * $targetEl: required
//  * $incrementEl: optional
//  * $decrementEl: optional
//  * options: optional
//  * instanceOptions: optional
//  */
// const counterInput: InputCounterInterface = new InputCounter(
//   $targetEl,
//   $incrementEl,
//   $decrementEl,
//   options,
//   instanceOptions
// );

// interface PropUserPage {
//   handleSubmitUser: (author: User) => void;
// }

// export default function UserManagement(props: PropUserPage) {

//   const handleSubmitUser = props.handleSubmitUser;

//   const [childCounterFromControlButton, setChildCounterFromControlButton] = useState<number>(0);

//   // Fonction pour mettre à jour childCounter
//   const handleUpdateChildCounter = (childCounter: any) => {
//     setChildCounterFromControlButton(childCounter);
//   };

//   // Utiliser Yup pour définir le schéma de validation
//   const validationSchema = Yup.object({
//     nom: Yup.string().required('Le prénom est requis'),
//     prenom: Yup.string().required('Le nom est requis'),
//     email: Yup.string().email('Format d\'email invalide').required('L\'email est requis'),
//   });

//   // useFormik retourne un objet avec diverses propriétés et méthodes pour gérer le formulaire
//   const formik = useFormik({
//     initialValues: {
//       nom: '',
//       prenom: '',
//       email: '',
//     },
//     validationSchema: validationSchema, // Utiliser le schéma de validation Yup

//     onSubmit: values => {
//       // handleSubmitUser(
//       //   {
//       //     ...values
//       //   }
//       // )
//       // Gérer la logique de soumission du formulaire ici
//       console.log(values);
//       alert("Nouveau user ajoutée")
//     },
//   });



//   return (
//     <>
//       <div className='flex flex-col gap-3 md:flex-row'>
//         {/* <Link to="/user-create">
//                             <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-700 relative flex gap-2 p-1 mt-2'>
//                                 <span className="relative text-white m-1">ajout utilisateur</span> <span>
//                                     <MdAddToPhotos className="relative text-white h-5 w-5" />
//                                 </span>
//                             </span>
//                         </Link> */}


    
//         <Accordion collapseAll className=' w-full'>
//           <Accordion.Panel className='w-full'>
//             <Accordion.Title className='hover:bg-violet-100'>
//               {/* <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-700 relative flex gap-2 p-1 mt-2'>
//                                 <span className="relative text-white m-1">ajout utilisateur</span> <span>
//                                     <MdAddToPhotos className="relative text-white h-5 w-5" />
//                                 </span>
//                             </span> */}
//               <h5 className="text-xl font-bold tracking-tight text-blue-800 dark:text-white">
//                 Ajouter un utilisateur
//               </h5>

//             </Accordion.Title>
//             <Accordion.Content>
//               <UserCreatePage handleSubmitUser={function (_author: User): void {
//                 throw new Error('Function not implemented.');
//               }} />
//             </Accordion.Content>

//           </Accordion.Panel>
//           {
users.map
((event) => (
//             <Accordion.Panel className='w-full'>
//               <Accordion.Title className='hover:bg-violet-100'>     <div className="flex items-center space-x-4 rtl😒pace-x-reverse">
//                 <Avatar img={event.file} alt="Neil image" rounded size="sm" />
//                 <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{event.firstname + ' ' + event.lastname}</p>
//                 <Link to={`/delete-user/${
event.id
}`} className="link text-red-800 text-bodyTest">
//                   <AiTwotoneDelete />
//                 </Link>

//               </div></Accordion.Title>
//               <Accordion.Content>
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-sm text-gray-500 dark:text-gray-400">{
event.email
}</p>

//                 </div>
//                 <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{
event.phone
}</div>
//                 <ul className="truncate text-sm text-gray-500 dark:text-gray-400">Enfants :
//                   <li>Léa classe : CM1</li>
//                   <li>Leo classe : CP</li></ul>
//               </Accordion.Content>

//             </Accordion.Panel>
//           ))}
//         </Accordion>
//       </div>
//     </>
//   );
// } 