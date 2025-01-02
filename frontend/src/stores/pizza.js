// import { defineStore } from "pinia";
// import { useDataStore } from "@/stores/data";

// export const usePizzaStore = defineStore("pizza", {
//     state: () => ({
//         pizzas: [], // Array to hold multiple pizzas
//         currentPizza: {
//             id: null,
//             pizzaName: "",
//             selectedSize: "",
//             selectedSauce: "",
//             selectedDough: "",
//             ingredientCounts: [],
//             totalPrice: 0,
//             count: 1,
//         },
//         pizzaName: "",
//         selectedSize: "",
//         selectedSauce: "",
//         selectedDough: "",
//         ingredientCounts: [],
//         totalPrice: 0,
//     }),
//     getters: {
//         price: (state) => { //возвращает цену
//             return state.totalPrice;
//         },
//     },
//     // для изменений
//     actions: {
//         // Add a new pizza to the collection
//         addPizza() {
//             const newPizza = {
//                 id: Date.now(),
//                 ...this.currentPizza, // Copy current pizza details
//             };
//             this.pizzas.push(newPizza);
//             // Reset current pizza for a new creation
//             this.resetCurrentPizza();
//         },
//         // Update the details of an existing pizza
//         updatePizza(pizzaId, updatedDetails) {
//             const index = this.pizzas.findIndex((pizza) => pizza.id === pizzaId);
//             if (index !== -1) {
//                 this.pizzas[index] = {
//                     ...this.pizzas[index],
//                     ...updatedDetails, // Merge updated details
//                 };
//             }
//         },
//         updateCountOfPizza(pizzaId) {
//             const pizza = this.pizzas.find((pizza) => pizza.id === pizzaId);
//             if (pizza) {
//                 pizza.count += 1; // Increment the count
//             }
//         },
//         // Select a pizza to modify
//         selectPizza(pizzaId) {
//             const selected = this.pizzas.find((pizza) => pizza.id === pizzaId);
//             if (selected) {
//                 this.currentPizza = { ...selected }; // Copy the selected pizza details
//             }
//         },
//         // Reset the current pizza state
//         resetCurrentPizza() {
//             this.currentPizza = {
//                 id: null,
//                 pizzaName: "",
//                 selectedSize: "",
//                 selectedSauce: "",
//                 selectedDough: "",
//                 ingredientCounts: [],
//                 totalPrice: 0,
//                 count: 0,
//             };
//         },
//         incrementIngredientQuantity(ingredientId) {
//             const ingredientIdx = this.ingredients.findIndex(
//                 (item) => item.ingredientId === ingredientId
//             );

//             if (ingredientIdx === -1) {
//                 this.addIngredient(ingredientId);
//                 return;
//             }

//             this.ingredients[ingredientIdx].quantity++;
//         },
//         setIngredientQuantity(ingredientId, count) {
//             const ingredientIdx = this.ingredients.findIndex(
//                 (item) => item.ingredientId === ingredientId
//             );

//             if (ingredientIdx === -1 && count > 0) {
//                 this.addIngredient(ingredientId);
//                 return;
//             } else if (ingredientIdx === -1) {
//                 return;
//             }

//             if (count === 0) {
//                 this.ingredients.splice(ingredientIdx, 1);
//                 return;
//             }

//             this.ingredients[ingredientIdx].quantity = count;
//         },
//         // Actions to modify current pizza details
//         setPizzaName(newName) {
//             this.currentPizza.pizzaName = newName;
//         },
//         setPizzaSize(newSize) {
//             this.currentPizza.selectedSize = newSize;
//         },
//         setPizzaDough(newDough) {
//             this.currentPizza.selectedDough = newDough;
//         },
//         setPizzaSauce(newSauce) {
//             this.currentPizza.selectedSauce = newSauce;
//         },
//         setTotalPrice(newPrice) {
//             this.currentPizza.totalPrice = newPrice;
//         },
//         setIngredientCounts(counts) {
//             this.currentPizza.ingredientCounts = counts;
//         },
//     },
// });
//создать геттеры, вычисляющие стоимость пиццы или общую сумму заказа в корзине.
import { defineStore } from "pinia";
import { ingredientsQuantity } from "@/common/helpers/ingredients-quantity";
import { pizzaPrice } from "@/common/helpers/pizza-price";
import { useDataStore } from "@/stores/data";

export const usePizzaStore = defineStore("pizza", {
    state: () => ({
        index: null,
        name: "",
        sauceId: 0,
        doughId: 0,
        sizeId: 0,
        ingredients: [],
    }),
    getters: {
        sauce: (state) => {
            const data = useDataStore();
            return data.sauces.find((i) => i.id === state.sauceId) ?? data.sauces[0];
        },
        dough: (state) => {
            const data = useDataStore();
            return data.doughs.find((i) => i.id === state.doughId) ?? data.doughs[0];
        },
        size: (state) => {
            const data = useDataStore();
            return data.sizes.find((i) => i.id === state.sizeId) ?? data.sizes[0];
        },
        ingredientsExtended: (state) => {
            const data = useDataStore();
            const pizzaIngredientIds = state.ingredients.map((i) => i.ingredientId);
            return data.ingredients
                .filter((i) => pizzaIngredientIds.includes(i.id))
                .map((i, idx) => {
                    return {
                        ...i,
                        quantity: state.ingredients[idx]?.quantity ?? 0,
                    };
                });
        },
        price: (state) => {
            return pizzaPrice(state);
        },
        ingredientQuantities: (state) => {
            return ingredientsQuantity(state);
        },
    },
    actions: {
        setIndex(index) {
            this.index = index;
        },
        setName(name) {
            this.name = name;
        },
        setSauce(sauceId) {
            this.sauceId = sauceId;
        },
        setDough(doughId) {
            this.doughId = doughId;
        },
        setSize(sizeId) {
            this.sizeId = sizeId;
        },
        setIngredients(ingredients) {
            this.ingredients = ingredients;
        },
        addIngredient(ingredientId) {
            this.ingredients.push({
                ingredientId,
                quantity: 1,
            });
        },
        incrementIngredientQuantity(ingredientId) {
            const ingredientIdx = this.ingredients.findIndex(
                (item) => item.ingredientId === ingredientId
            );

            if (ingredientIdx === -1) {
                this.addIngredient(ingredientId);
                return;
            }

            this.ingredients[ingredientIdx].quantity++;
        },
        setIngredientQuantity(ingredientId, count) {
            const ingredientIdx = this.ingredients.findIndex(
                (item) => item.ingredientId === ingredientId
            );

            if (ingredientIdx === -1 && count > 0) {
                this.addIngredient(ingredientId);
                return;
            } else if (ingredientIdx === -1) {
                return;
            }

            if (count === 0) {
                this.ingredients.splice(ingredientIdx, 1);
                return;
            }

            this.ingredients[ingredientIdx].quantity = count;
        },
        loadPizza(pizza) {
            this.index = pizza.index;
            this.name = pizza.name;
            this.sauceId = pizza.sauceId;
            this.doughId = pizza.doughId;
            this.sizeId = pizza.sizeId;
            this.ingredients = pizza.ingredients;
        },
    },
});
