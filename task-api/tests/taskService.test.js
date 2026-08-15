const app=require("../src/app.js");
const taskService=require("../src/services/taskService.js")
describe("Testing the  task service",()=>{
       beforeEach(() => {
        taskService._reset();
    });
    test("checking weather the task is adding into the list",()=>{
        const t1=taskService.create({title:"Buy Cell Phone"})
            expect(t1.title).toBe("Buy Cell Phone")
            });
    test("checking weather the feilds are getting updated or not",()=>{
            const t1=taskService.create({title:"Buy Laptop"})
           const t2= taskService.update(t1.id,{description:"Laptop is at cheap Price"})
           expect(t2.description).toBe("Laptop is at cheap Price")
    });
    test("checking weather the tasks are marked completely or not",()=>{
        const t1=taskService.create({title:"Buy Pc"})
         const t2= taskService.completeTask(t1.id)
         expect(t2.status).toBe('done');
         expect(t2.priority).toBe('medium');

    })
    test("getting the elements by status or not",()=>{
         const t1=taskService.create({title:"Buy Bike"})
         const task= taskService.getByStatus('todo')
         expect(task).toContainEqual(t1)

    })
    test("checking weather test is returned by id",()=>{
        const t1=taskService.create({title:"sell Bike"})
        const t2=taskService.findById(t1.id);
        expect(t2.title).toBe(t1.title);
    })
    test("checking weather test is removing succesfully",()=>{
       const t1=taskService.create({title:"sell Laptop"})
       taskService.remove(t1.id);
       const t2=taskService.findById(t1.id);
       expect(t2).toBeUndefined();
    })
    test("checking weather it is performing correct Pagination",()=>{
          const t1=taskService.create({title:"buy Farm"})
          const t2=taskService.create({title:"buy Laptop"})
          const t3=taskService.create({title:"buy PC"})
          const t4=taskService.create({title:"buy house"})
          const tasksList=taskService.getPaginated(1,10);
          expect(tasksList).toHaveLength(4)
    })
    test("checking weather stats are calculated correctly", () => {
    taskService.create({ title: "Task A", status: "todo" });
    taskService.create({ title: "Task B", status: "todo" });
    taskService.create({ title: "Task C", status: "done" });

    const stats = taskService.getStats();

    expect(stats.todo).toBe(2);
    expect(stats.done).toBe(1);
    expect(stats.in_progress).toBe(0);
});

}); 