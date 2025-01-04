import { defineStore } from "pinia";
import { pizzaPrice } from "@/common/helpers/pizza-price";
import { useDataStore } from "@/stores/data";

export const useCartStore = defineStore("cart", {
  state: () => ({
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    phone: "",
    pizzas: [],
    misc: [],
    orders: [],
  }),
  getters: {
    pizzasExtended: (state) => {
      const data = useDataStore();
      return state.pizzas.map((pizza) => {
        const pizzaIngredientIds = pizza.ingredients.map((i) => i.ingredientId);
        return {
          name: pizza.name,
          quantity: pizza.quantity,
          dough: data.doughs.find((i) => i.id === pizza.doughId),
          size: data.sizes.find((i) => i.id === pizza.sizeId),
          sauce: data.sauces.find((i) => i.id === pizza.sauceId),
          ingredients: data.ingredients.filter((i) =>
            pizzaIngredientIds.includes(i.id)
          ),
          price: pizzaPrice(pizza),
          address: pizza.address || { street: "", building: "", flat: "" },
        };
      });
    },
    miscExtended: (state) => {
      const data = useDataStore();
      return data.misc.map((misc) => {
        const miscItem = state.misc.find((i) => i.miscId === misc.id);
        return {
          ...misc,
          quantity: miscItem?.quantity ?? 0, // Берём количество из state.misc, если есть
        };
      });
    },
    total: (state) => {
      const pizzaPrices = state.pizzasExtended
        .map((item) => item.quantity * item.price)
        .reduce((acc, val) => acc + val, 0);
      const miscPrices = state.miscExtended
        .map((item) => item.quantity * item.price)
        .reduce((acc, val) => acc + val, 0);
      return pizzaPrices + miscPrices;
    },
  },
  actions: {
    savePizza(pizza) {
      const { index, ...pizzaData } = pizza;

      if (index !== null) {
        this.pizzas[index] = {
          quantity: this.pizzas[index].quantity,
          ...pizzaData,
          address: { ...this.address },
        };
      } else {
        this.pizzas.push({
          quantity: 1,
          ...pizzaData,
          address: { ...this.address },
        });
      }
    },
    saveOrder() {
      if (this.pizzas.length === 0 && this.misc.length === 0) {
        console.error("No items to save in order.");
        return;
      }

      const data = useDataStore();

      // Map pizzas to include extended details
      const extendedPizzas = this.pizzas.map((pizza) => {
        const pizzaIngredientIds = pizza.ingredients.map((i) => i.ingredientId);
        return {
          name: pizza.name,
          quantity: pizza.quantity,
          dough: data.doughs.find((i) => i.id === pizza.doughId),
          size: data.sizes.find((i) => i.id === pizza.sizeId),
          sauce: data.sauces.find((i) => i.id === pizza.sauceId),
          ingredients: data.ingredients.filter((i) =>
            pizzaIngredientIds.includes(i.id)
          ),
          price: pizzaPrice(pizza),
          address: pizza.address || { street: "", building: "", flat: "" },
        };
      });

      // Map misc items to include extended details
      const extendedMisc = data.misc
        .map((misc) => {
          const miscItem = this.misc.find((i) => i.miscId === misc.id);
          return {
            ...misc,
            quantity: miscItem?.quantity || 0, // Default to 0 if not in the cart
          };
        })
        .filter((misc) => misc.quantity > 0); // Only include misc items with a quantity > 0

      this.orders.push({
        pizzas: extendedPizzas,
        misc: extendedMisc,
        address: { ...this.address },
        phone: this.phone,
        total: this.total,
        date: new Date().toISOString(), // Save the date of the order
      });

      console.log("Order saved:", this.orders[this.orders.length - 1]);

      // Clear the cart
      this.pizzas = [];
      this.misc = [];
    },
    setPizzaQuantity(index, count) {
      if (this.pizzas[index]) {
        this.pizzas[index].quantity = count;
      }
    },
    setMiscQuantity(miscId, count) {
      console.log("Before update:", JSON.stringify(this.misc));
      const miscIdx = this.misc.findIndex((item) => item.miscId === miscId);
      if (miscIdx === -1 && count > 0) {
        this.misc = [...this.misc, { miscId, quantity: count }];
        console.log("After adding new misc:", JSON.stringify(this.misc));
        return;
      }
      if (miscIdx === -1) {
        console.log("Misc item not found, and count is 0. No changes.");
        return;
      }
      if (count === 0) {
        this.misc = this.misc.filter((item) => item.miscId !== miscId);
        console.log("After deletion:", JSON.stringify(this.misc));
        return;
      }
      const updatedMisc = [...this.misc];
      updatedMisc[miscIdx] = {
        ...updatedMisc[miscIdx],
        quantity: count,
      };
      this.misc = updatedMisc;

      console.log("After update:", JSON.stringify(this.misc));
    },
    setPhone(phone) {
      this.phone = phone;
    },
    setAddress(address) {
      this.address = address;
      console.log("Address set:", this.address);
    },
    // setAddress(address) {
    //     const { street, building, flat, comment } = address;
    //     this.address = { street, building, flat, comment };
    // },
    setStreet(street) {
      this.address.street = street;
    },
    setBuilding(building) {
      this.address.building = building;
    },
    setFlat(flat) {
      this.address.flat = flat;
    },
    setComment(comment) {
      this.address.comment = comment;
    },
    saveNewAddress() {
      if (!this.address.street || !this.address.building) {
        console.error("Street and building are required.");
        return;
      }
      console.log("Address saved:", this.address);
    },
  },
});
