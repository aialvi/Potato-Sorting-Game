import { createStore } from "vuex";
import { faker } from '@faker-js/faker';


export default createStore({
    state: {
        users: [],
        isTimerRunning: false,
        time: '00:00:00',
    },
    mutations: {
        setUsers(state, numberOfUsers) {
            const potatoes = [];
            while (potatoes.length < numberOfUsers) {
                const randomPotatoQuantity = Math.floor(Math.random() * 100) + 1;
                if (potatoes.indexOf(randomPotatoQuantity) === -1) {
                    potatoes.push(randomPotatoQuantity);
                }
            }

            const users = [];
            for (let i = 0; i < potatoes.length; i++) {
                users.push({
                    id: i + 1,
                    name: faker.name.findName(),
                    email: faker.internet.email(),
                    potatoQuantity: potatoes[i],
                });
            }

            state.users = users
        },
        setIsTimerRunning(state, isTimerRunning) {
            state.isTimerRunning = isTimerRunning
        },
        setTime(state, time) {
            state.time = time
        }
    }
});