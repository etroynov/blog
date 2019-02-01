defmodule Api.Router do
  use Plug.Router

  plug(:match)
  plug(:dispatch)

  get "/" do
    data = Mongo.find(:mongo, "organizations", %{}, limit: 5, pool: DBConnection.Poolboy)
      |> Enum.to_list
      |> Poison.encode!

    send_resp(conn, 200, data)
  end

  match(_, do: send_resp(conn, 404, "Oops!"))
end
