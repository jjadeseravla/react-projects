import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";


const requestConfig = {};

export default function Meals() {

  const {
    data: meals,
    isLoading,
    err
  } = useHttp('http://localhost:3000/meals', requestConfig, [])

  // if (!data) {
  //   <p>is getting meals</p>
  // }
  if (isLoading) {
    return <p className="center">fetching meals...</p>;
  }

  if (err) {
    return <Error title="failed to fetch meals" message={err} />;
  }

  if (!meals) {
    return null; // or any fallback component or message
  }

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

