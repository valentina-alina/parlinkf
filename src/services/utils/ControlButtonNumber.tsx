
import { InputCounter } from 'flowbite';
import type { InputCounterOptions, InputCounterInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import {useState } from 'react';


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

// // increment the value of the input field
// counterInput.increment();

// // decrement the value of the input field
// counterInput.decrement();


export default function ControlButtonNumber(props: any) {

const [childCounter, setChildCounter] = useState<number>(0);
   

 // Fonction pour envoyer le childCounter au parent
 const sendMessageToParent = () => {

    // Utiliser la fonction handleChildCounter du parent pour envoyer le message
    props.handleChildCounter(childCounter);
    console.log(childCounter);
    // Mettre à jour le message local (si nécessaire)
    
  };


  

    return (
        <>

            <div className="relative flex items-center max-w-[8rem]">
                <button onClick={() => { setChildCounter(childCounter <= 0 ? 0 : childCounter - 1);sendMessageToParent();}} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                    </svg>
                </button>

                <input value={childCounter} type="text" id="quantity-input" data-input-counter data-input-counter-min='0' aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />

                <button onClick={() => {setChildCounter(childCounter + 1);  sendMessageToParent();}} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" >
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>

        </>
    )
}


