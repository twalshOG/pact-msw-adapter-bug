'use client'

//import './App.css';
import API from './api';
import { useEffect, useState } from 'react';
import {IAnimal} from './interfaces';


function useGetAllAnimals() {
  const [animal, setAnimal] = useState<IAnimal[]>([]);
  useEffect(() => {
    const fetchData = async () => {
        const animal: IAnimal[] = (await API.getAllAnimals())?.data;
        setAnimal(animal);
    };
    fetchData();
  }, []);  // Add empty dependency array
  return [animal];
};

function AnimalTable() {
  const [animal] = useGetAllAnimals();
  return (
    <><h2>Animals</h2><table className="animalTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Is awesome</th>
        </tr>
      </thead>
      <tbody>
        {animal.map((p) => (
          <tr data-testid={"tableAnimal_" + p.id.toString()} key={p.id}>
            <td>{p.name}</td>
            <td>{p.awesome?.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table></>
  );
}

export default AnimalTable;
