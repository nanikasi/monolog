import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import {
  Button,
  Container,
  Heading,
  Modal,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@yamada-ui/react";

import { Form, json, redirect } from "@remix-run/react";
import { authenticator } from "~/service/auth.server";

import { getEnv } from "~/service/contextEnv";
import googleLogo from "../image/google-logo.png";
import logo from "../image/logo.png";

export const meta: MetaFunction = () => {
  return [
    { title: "みんなひとりごと" },
    {
      name: "description",
      content: "Welcome to monolog",
    },
  ];
};

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = getEnv(context);
  const user = await authenticator(env).isAuthenticated(request);

  if (user) {
    return redirect(`/${user.id}`);
  }

  return json({});
}

export default function Index() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex w-full h-screen flex-col items-center justify-center">
      <img src={logo} alt="ロゴ" className="h-48 w-48 mb-8" />
      <h1 className="text-2xl my-4">みんなひとりごと</h1>
      <div className="text-gray-400 mx-10 mb-8 text-center">
        みんなひとりごとへようこそ。ここは独り言をつぶやく自由な場所です。
      </div>
      <Button onClick={onOpen}>　はじめる　</Button>

      <Modal isOpen={isOpen} onClose={onClose} animation="bottom">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

        <ModalFooter>
          <Container centerContent>
            <Heading size="md">みんなひとりごと</Heading>
            <Form action="/api/auth/signin" method="post">
              <Button variant="outline" type="submit">
                <img src={googleLogo} alt="google icon" className="h-5 w-5" />
                Googleアカウントで続ける
              </Button>
            </Form>
          </Container>
        </ModalFooter>
      </Modal>
    </div>
  );
}
