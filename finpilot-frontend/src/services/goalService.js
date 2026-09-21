import api from "./api";

/*
|--------------------------------------------------------------------------
| Get All Goals
|--------------------------------------------------------------------------
*/

export async function getGoals() {

    const response = await api.get("/api/goals");

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Goal By Id
|--------------------------------------------------------------------------
*/

export async function getGoalById(goalId) {

    const response = await api.get(
        `/api/goals/${goalId}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Create Goal
|--------------------------------------------------------------------------
*/

export async function createGoal(goal) {

    const response = await api.post(
        "/api/goals",
        goal
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Delete Goal
|--------------------------------------------------------------------------
*/

export async function deleteGoal(goalId) {

    await api.delete(
        `/api/goals/${goalId}`
    );

}