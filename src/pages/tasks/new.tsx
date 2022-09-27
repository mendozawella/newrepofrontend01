import { Layout } from "src/components/Layout";
import { Card, Form, Grid, Button, Icon, Confirm } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from "src/interfaces/Tasks";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const inititalState = {
  itemnumber: "",
  assetname: "",
  description: "",
  price: "",
  quantity: "",
  borrowersname: "",
};

const NewPage = (): JSX.Element => {
  const [task, setTask] = useState<Task>(inititalState);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();

  const createTask = async (task: Task) =>
    await fetch("https://apicorswmendoza.azurewebsites.net/itassets/", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const updateTask = async (id: string, task: Task) =>
    await fetch("https://apicorswmendoza.azurewebsites.net/itassets/" + id, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (typeof router.query.id === "string") {
        updateTask(router.query.id, task);
      } else {
        createTask(task);
      }
      setTask(inititalState);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) =>
    setTask({ ...task, [name]: value });

  const loadTask = async (id: string) => {
    const res = await fetch("https://apicorswmendoza.azurewebsites.net/itassets/" + id);
    const task = await res.json();
    setTask({ 
               itemnumber: task.itemnumber,
               assetname: task.assetname,
               description: task.description,
               price: task.price,
               quantity: task.quantity,
               borrowersname: task.borrowersname });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("https://apicorswmendoza.azurewebsites.net/itassets/" + id, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadTask(router.query.id);
  }, [router.query]);

  return (
    <Layout>
      <Grid
        centered
        columns={3}
        verticalAlign="middle"
        style={{ height: "70%" }}
      >
        <Grid.Column>
          <Card>
            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label htmlFor="itemnumber">Item Number</label>
                  <input
                    type="text"
                    placeholder="Write item number"
                    name="itemnumber"
                    onChange={handleChange}
                    value={task.itemnumber}
                    autoFocus
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="assetname">Asset name</label>
                  <textarea
                    name="assetname"
                    id="assetname"
                    rows={2}
                    placeholder="Write a assetname"
                    onChange={handleChange}
                    value={task.assetname}
                  ></textarea>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="assetdetails">Description</label>
                  <textarea
                    name="description"
                    id="adescription"
                    rows={3}
                    placeholder="Write a description"
                    onChange={handleChange}
                    value={task.description}
                  ></textarea>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="price">Price</label>
                  <textarea
                    name="price"
                    id="price"
                    rows={4}
                    placeholder="Write a price"
                    onChange={handleChange}
                    value={task.price}
                  ></textarea>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="quantity">Quantity</label>
                  <textarea
                    name="quantity"
                    id="quantity"
                    rows={5}
                    placeholder="Write a quantity"
                    onChange={handleChange}
                    value={task.quantity}
                  ></textarea>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="borrowersname">Borrower's Name</label>
                  <textarea
                    name="borrowersname"
                    id="borrowersname"
                    rows={6}
                    placeholder="Write a borrowersname"
                    onChange={handleChange}
                    value={task.borrowersname}
                  ></textarea>
                </Form.Field>
                {router.query.id ? (
                  <Button color="teal" loading={loading}>
                    <Icon name="save" />
                    Update
                  </Button>
                ) : (
                  <Button primary loading={loading}>
                    <Icon name="save" />
                    Save
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>

          {router.query.id && (
            <Button inverted color="red" onClick={() => setOpenConfirm(true)}>
              <Icon name="trash" />
              Delete
            </Button>
          )}
        </Grid.Column>
      </Grid>

      <Confirm
        header="Delete a Task"
        content={`Are you sure you want to delete task ${router.query.id}`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          typeof router.query.id === "string" && handleDelete(router.query.id)
        }
      />
    </Layout>
  );
};

export default NewPage;
