import React from "react";
import { Button, TextInput, Select, Card, FileInput, Label, FloatingLabel,Textarea  } from "flowbite-react";

export default function AdCreatePage() {

   const extractFormData = (formData) => {
    const formDatasSubmitedObject = {};
    for (let [key, value] of formData.entries()) {
      formDatasSubmitedObject[key] = value;
    }
    formDatasSubmitedObject.files = formData.get('files').name;
    return formDatasSubmitedObject;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDatasSubmitedObject = extractFormData(formData);

   

    const tsContent = `export const formData = ${JSON.stringify(formDatasSubmitedObject, null, 2)};`;
    const file = new Blob([tsContent], { type: 'application/typescript' });
    const formDataToSend = new FormData(e.target);
    formDataToSend.append('file', file, 'formData.ts');

    try {
      const response = await fetch('https://webhook.site/95b101ba-5fd5-43bf-8806-f634756c2e3d', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    alert(`Formulaire soumis`);
    // e.target.reset();
  };

 

  const renderTextInput = (name, label, type = 'text', required = false) => {
    return (
      <FloatingLabel
        variant="outlined"
        label={label}
        id={name}
        name={name}
        type={type}
        required={required}
        
      />
    );
  };

  return (
    <>
 
    <div className="flex justify-center">
      <Card className="w-full md:max-w-md md:mx-auto hover:bg-transparent">
        <h5 className="text-2xl font-bold tracking-tight text-blue-800 dark:text-white">
          Ajouter une annonce
        </h5>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Select name='categorie' id="role" required>
            <option className="text-base font-medium text-blue-700">Categorie</option>
            <option>Cours</option>
            <option>Sortie</option>
            <option>Covoiturage</option>
          </Select>

          {renderTextInput('titre', 'Titre', 'text', true)}
        
          <div className="relative">
            <Textarea  id="description" aria-describedby="outlined_success_help" className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500" placeholder="" data-testid="floating-label" name="description" required rows={4} />
              <label form="description" className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 transition-transform duration-300 peer-placeholder-shown:top-1/4 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500">Description</label></div>
       
       
          <div className="grid grid-cols-3 gap-4">
            <span className="col-span-2" >   {renderTextInput('startdate', 'Début', 'date')}</span>
       
          {renderTextInput('starttime', 'heure', 'time')}
          
          </div>

          <div className=" grid grid-cols-3 gap-4">
          <span className="col-span-2" >{renderTextInput('enddate', 'Fin', 'date')}</span>
       
          {renderTextInput('endtime', 'heure', 'time')}
          
          </div>
          
          {renderTextInput('attendees', 'Nombre de places', 'number')}
          {renderTextInput('city', 'Ville')}
          {renderTextInput('country', 'Pays')}
          {renderTextInput('adress', 'Adresse')}

          <Label htmlFor="files" value="Ajouter une image" />
          <FileInput name="files" id="files" />

          <Button type="submit">Ajouter l'annonce</Button>
        </form>
      </Card>
    </div>
    </>
  );
};
