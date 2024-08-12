import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Monolog" },
    {
      name: "description",
      content: "Welcome to monolog",
    },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const response = await fetch(context.cloudflare.env.SERVER_URL);
  const data = await response.text();
  return data;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">{data}</h1>{" "}
    </div>
  );
}
