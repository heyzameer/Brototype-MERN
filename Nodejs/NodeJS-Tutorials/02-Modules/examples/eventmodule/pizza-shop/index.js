const PizzaShop = require("./pizza-shop");
const DrinkMachine = require("./drink-machine");

const pizzaShop = new PizzaShop();
const drinkMachine = new DrinkMachine();

pizzaShop.on("order",(size,topping)=>{
    console.log(`Order received for ${size} pizza with ${topping} topping`);
    drinkMachine.serveDrink(size);
});

pizzaShop.order("large","mushroom");
pizzaShop.displayOrderNumber();