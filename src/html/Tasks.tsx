import * as elements from 'typed-html';
import {Task} from "../db/schema/task.ts";

export const TasksItem = ({ task }: { task: Task }) => {
    const { id, title, completed } = task;
    return (
        <div class='grid grid-cols-[70%_13%_13%] gap-4 w-[500px] max-w-[500px]'>
            <span class='text-lg'>{title}</span>
            <input
                type='checkbox'
                checked={completed}
                hx-post={`/tasks/toggle/${id}`}
                hx-swap='innerHTML'
                class='w-fit self-center'
            />
            <button
                hx-delete={`/tasks/${id}`}
                class='bg-red-600 text-white px-2 py-1 rounded text-xs w-fit h-fit self-center'
                hx-target='.root-tasks'
                hx-swap='innerHTML'
                // @ts-ignore
                _='on click toggle @disabled until htmx:afterSwap'
            >
                Delete
            </button>
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
            class='flex items-center justify-between gap-4 w-full'
            hx-post='/tasks'
            hx-swap='beforebegin'
            hx-target='.insert-task'
            // @ts-ignore
            _='on htmx:afterRequest target.reset() go to .insert-task'
        >
            <input
                type='text'
                name='title'
                class='border border-blue-300 px-4 py-2 rounded w-full ring-2 ring-transparent focus:ring-blue-300 focus:outline-none transition-all duration-200'
            />
        </form>
    );
};