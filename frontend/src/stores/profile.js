import { defineStore } from "pinia";
import { pizzaPrice } from "@/common/helpers/pizza-price";
import { useDataStore } from "@/stores/data";
import resources from "@/services/resources";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [
      {
        id: 1,
        name: "Главный офис",
        street: "Спб, ул. Невский проспект",
        building: "1",
        flat: "101",
        comment: "Оставить заказ у охраны",
      },
    ],
    orders: [],
  }),
  getters: {
    ordersExtended: (state) => {
      const data = useDataStore();

      return state.orders.map((order) => {
        const orderPizzas = order.orderPizzas?.map((pizza) => {
          return {
            name: pizza.name,
            quantity: pizza.quantity,
            dough: data.doughs.find((i) => i.id === pizza.doughId),
            size: data.sizes.find((i) => i.id === pizza.sizeId),
            sauce: data.sauces.find((i) => i.id === pizza.sauceId),
            ingredients: pizza.ingredients.map((ingredient) => {
              return {
                ...data.ingredients.find(
                  (i) => i.id === ingredient.ingredientId
                ),
                quantity: ingredient.quantity,
              };
            }),
            price: pizzaPrice(pizza),
          };
        });

        const orderMisc =
          order.orderMisc?.map((misc) => {
            return {
              ...data.misc.find((item) => item.id === misc.miscId),
              quantity: misc.quantity,
            };
          }) ?? [];

        const pizzaPrices =
          orderPizzas
            ?.map((item) => item.quantity * item.price)
            .reduce((acc, val) => acc + val, 0) ?? 0;

        const miscPrices =
          orderMisc
            ?.map((item) => item.quantity * item.price)
            .reduce((acc, val) => acc + val, 0) ?? 0;

        return {
          ...order,
          orderPizzas,
          orderMisc,
          total: pizzaPrices + miscPrices,
        };
      });
    },
  },
  actions: {
    setAddresses(addresses) {
      this.addresses = addresses;
    },
    setOrders(orders) {
      this.orders = orders;
    },
    async loadOrders() {
      const res = await resources.order.getOrders();
      if (res.__state === "success") {
        this.setOrders(res.data);
      }
    },
    async removeOrder(orderId) {
      const res = await resources.order.removeOrder(orderId);
      if (res.__state === "success") {
        this.orders = this.orders.filter((i) => i.id !== orderId);
      }
    },

    async addAddress(address) {
      const newAddress = {
        id: Date.now(),
        ...address,
      };
      this.addresses.push(newAddress);
    },
    async removeAddress(addressId) {
      this.addresses = this.addresses.filter((i) => i.id !== addressId);
    },
    async updateAddress(address) {
      const res = await resources.address.updateAddress(address);
      if (res.__state === "success") {
        this.addresses = this.addresses.map((i) =>
          i.id === address.id ? address : i
        );
      }
    },
  },
});
