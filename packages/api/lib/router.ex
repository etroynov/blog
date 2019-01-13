defmodule Api.Router do
  use Plug.Router

  plug(:match);
  plug(:dispatch);

  get "/" do
    books = Mongo.find(:mongo, "book", %{}, limit: 20, pool: DBConnection.Poolboy)

    books
    |> Enum.to_list
    |> IO.inspect

    send_resp(conn, 200, "Welcome")
  end

  match(_, do: send_resp(conn, 404, "Oops!"))
end