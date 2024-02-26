import { useState, useEffect } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  // const [isFetching, setIsFetching] = useState(false);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function getMeals() {
      // setIsFetching(true);
      // try {
        const response = await fetch('http://localhost:3000/meals', { method: 'GET' });
        if (!response.ok) {
          console.log('no response');
        }
        const mealsData = await response.json(); 
        setMeals(mealsData);
        // setIsFetching(false);
      // } catch (e) {
      //   setError({ message: error.message } || 'cant fetch meals');
      //   // setIsFetching(false);
      // }
    }
    getMeals();
  }, []);

  return (
    <>
      <ul id="meals">
        {meals.map((meal) => (
          <MealItem key={meal.id}  meal={meal} />
        ))}
      </ul>
    </>
  )
}

// app.get('/meals', async (req, res) => {
//   const meals = await fs.readFile('./data/available-meals.json', 'utf8');
//   res.json(JSON.parse(meals));
// });