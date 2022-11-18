export const data = [
  {
    id: "1",
    Task: "id=1",
  },
  {
    id: "2",
    Task: "id=2",
  },
  {
    id: "3",
    Task: "id=3",
  },
  {
    id: "4",
    Task: "id=4",
  },
  {
    id: "5",
    Task: "id=5",
  },
];

export const columnsFromBackend = {
  "To-do": {
    title: "To-do",
    items: [data[0], data[1]],
  },
  "In Progress": {
    title: "In Progress",
    items: [data[2], data[3], data[4]],
  },
};
