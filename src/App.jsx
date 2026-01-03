import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


      <h1> Cars List</h1>

      <select id="brandFilter">
        <option value="all">All Brands</option>
      </select>

      <div class="cars" id="carsContainer"></div>

    </>
    
  )
  
}
const apiUrl = "https://dummyjson.com/products/category/vehicle";

let allCars = [];

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    allCars = data.products;
    showCars(allCars);
    loadBrands(allCars);
  });

function showCars(cars) {
  const container = document.getElementById("carsContainer");
  container.innerHTML = "";

  cars.forEach(car => {
    container.innerHTML += `
          <div class="card">
            <img src="${car.thumbnail}" alt="${car.title}">
            <h3>${car.title}</h3>
            <p><b>Brand:</b> ${car.brand}</p>
            <p class="price">$${car.price}</p>
            <p>⭐ Rating: ${car.rating}</p>
          </div>
        `;
  });
}

function loadBrands(cars) {
  const brands = [...new Set(cars.map(car => car.brand))];
  const select = document.getElementById("brandFilter");

  brands.forEach(brand => {
    select.innerHTML += `<option value="${brand}">${brand}</option>`;
  });
}

document.getElementById("brandFilter").addEventListener("change", function () {
  const value = this.value;

  if (value === "all") {
    showCars(allCars);
  } else {
    const filtered = allCars.filter(car => car.brand === value);
    showCars(filtered);
  }
});



export default App
