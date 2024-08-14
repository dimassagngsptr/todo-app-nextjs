import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { title, completed } = req.body;
    const { id } = req.query; 

    try {
      const foundTask = await prisma.task.findFirst({
        where: { id: parseInt(id) },
      });
      if (!foundTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      const dataToUpdate = {};

      if (title !== undefined) {
        dataToUpdate.title = title;
      }

      if (completed !== undefined) {
        dataToUpdate.completed = completed;
      }

      if (Object.keys(dataToUpdate).length > 0) {
        const updatedTask = await prisma.task.update({
          where: { id: parseInt(id) },
          data: dataToUpdate,
        });
        res.status(200).json(updatedTask);
      } else {
        res.status(400).json({ error: "No data provided to update" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.task.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
