import * as elements from 'typed-html';
import {Task} from "../db/schema/task.ts";

export const TasksItem = ({ task }: { task: Task }) => {
    const { id, title, completed } = task;
    return (
        <div class='grid grid-cols-[6%_94%] w-[500px] max-w-[500px]'>
            <input
                type='checkbox'
                checked={completed}
                hx-post={`/tasks/toggle/${id}`}
                hx-swap='innerHTML'
                class='checkbox'
            />
            <span class='text-lg'>{title}</span>
        </div>
    );
};

export const TasksList = ({ tasks }: { tasks: Task[] }) => {
    return (
        <div class='space-y-2 flex flex-col gap-2'>
            <div class='h-[400px] w-full overflow-y-auto space-y-2 tasks'>
                {tasks.map((task, index) => (
                    <TasksItem task={task} />
                ))}
                <div class='insert-task'></div>
            </div>
            <CreateTasksForm />
        </div>
    );
};

export const CreateTasksForm = () => {

    return (
        <form
            class='form-control'
            hx-post='/tasks'
            hx-swap='beforebegin'
            hx-target='.insert-task'
            // @ts-ignore
            _='on htmx:afterRequest target.reset() go to .insert-task'
        >
            <input
                type='text'
                name='title'
                class='input input-bordered w-full transition-all duration-200'
            />
        </form>
    );
};