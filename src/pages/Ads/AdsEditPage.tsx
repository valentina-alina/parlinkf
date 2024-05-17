import React, { useEffect, useState } from "react";
import { Button, Select, Card, FileInput, Label, FloatingLabel, Textarea } from "flowbite-react";
import fakerAdsList from './fakerAdsList'; // Assurez-vous que le chemin est correct
import fakerCategories from './fakerCategories';
import { useParams } from "react-router-dom";

  export default function AdEditPage( ) {

  const { adId } = useParams();


  const [formData, setFormData] = useState({
    categorie: '',
    titre: '',
    description: '',
    startdate: '',
    starttime: '',
    enddate: '',
    endtime: '',
    attendees: '',
    city: '',
    country: '',
    adress: '',
    imageUrl: ''
  });

 const adToEdit = fakerAdsList.find(ad => ad.id === parseInt(adId));
 console.log(adId);
 console.log(adToEdit);
  useEffect(() => {

   
   
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      };
  
      const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      };
  

    if (adToEdit) {
      setFormData({
        categorie: adToEdit.categorie,
        titre: adToEdit.titre,
        description: adToEdit.description,
        startdate: formatDate(adToEdit.startdate),
        starttime: formatTime(adToEdit.starttime),
        enddate: formatDate(adToEdit.enddate),
        endtime: formatTime(adToEdit.endtime),
        attendees: adToEdit.attendees,
        city: adToEdit.city,
        country: adToEdit.country, // Supposons que le pays soit la France
        adress: adToEdit.address,
        imageUrl: adToEdit.imageUrl
      });
    }
  }, [adId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        value={formData[name]}
        onChange={handleInputChange}
      />
    );
  };

  return (
    <>
    <div className="flex justify-center">
      <Card className="w-full md:max-w-md md:mx-auto hover:bg-transparent">
        <h5 className="text-2xl font-bold tracking-tight text-blue-800 dark:text-white">
          Modifier une annonce
        </h5>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Select name='categorie' id="role" required value={formData.categorie} onChange={handleInputChange}>
    
            {fakerCategories.map(category => (
              <option key={category.id} value={category.label}>
                {category.label}
              </option>
            ))}
          </Select>
      
   
          {renderTextInput('titre', 'Titre', 'text', true)}
        
        

        
          <div className="relative">
            <Textarea value={formData.description}
    onChange={handleInputChange} id="description" aria-describedby="outlined_success_help" className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500" placeholder="" data-testid="floating-label" name="description" required rows={4} />
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

          <Button type="submit">Mettre à jour l'annonce</Button>
        </form>
      </Card>
    </div>
    </>
  );
};
