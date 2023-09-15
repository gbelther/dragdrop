import { DragEvent, useState } from "react";
import styles from "./styles.module.scss";

const tasksMocked = [
  {
    name: "Cartão 1",
    category: "TODO",
  },
  {
    name: "Cartão 2",
    category: "DOING",
  },
  {
    name: "Cartão 3",
    category: "DONE",
  },
];

export default function Home() {
  const [tasks, setTasks] =
    useState<{ name: string; category: string }[]>(tasksMocked);
  const [categories, setCategories] = useState(["TODO", "DOING", "DONE"]);

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    task: { name: string; category: string }
  ) => {
    // console.log("onDragStart: ", event);
    event.dataTransfer.setData("name", task.name);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    // console.log("onDragOver: ", event);
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLElement>, to: string) => {
    const name = event.dataTransfer.getData("name");
    console.log({ name });
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.name === name) {
          return {
            ...task,
            category: to,
          };
        }
        return task;
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {categories.map((category) => (
          <section
            key={category}
            className={styles.dropzone}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, category)}
          >
            <h2>{category}</h2>
            {tasks
              .filter((task) => task.category === category)
              .map((task) => (
                <div
                  key={task.name}
                  className={styles.card}
                  draggable
                  onDragStart={(event) => handleDragStart(event, task)}
                >
                  <p>{task.name}</p>
                </div>
              ))}
          </section>
        ))}
      </div>
    </div>
  );
}
