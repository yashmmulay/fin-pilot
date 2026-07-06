import GoalCard from "./GoalCard";

function GoalList({
    goals,
    onDelete,
}) {

    return (

        <div className="grid gap-6 lg:grid-cols-2">

            {goals.map((goal) => (

                <GoalCard
                    key={goal.id}
                    goal={goal}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );

}

export default GoalList;