import { Container, Menu, Button } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
 
    <Menu inverted attached style={{ padding: "1.5rem" }}>
      <Container>
        <Menu.Item onClick={() => router.push("/")}>
        <svg className="w-8 h-8 mr-2 fill-current" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>It asset Monitoring
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Button onClick={() => router.push("/tasks/new")} primary>
              Add New Asset
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>

  );
};
